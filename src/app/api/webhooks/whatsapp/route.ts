import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { generateBotResponse } from '@/lib/claude';

// ─── Environment ─────────────────────────────────────────────────────────────
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;

// ─── Types ───────────────────────────────────────────────────────────────────
interface WhatsAppWebhookEntry {
  id: string;
  changes: {
    value: {
      messaging_product: string;
      metadata: { display_phone_number: string; phone_number_id: string };
      contacts?: { profile: { name: string }; wa_id: string }[];
      messages?: {
        from: string;
        id: string;
        timestamp: string;
        type: string;
        text?: { body: string };
        interactive?: { type: string; button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } };
      }[];
      statuses?: {
        id: string;
        status: 'delivered' | 'read' | 'sent' | 'failed';
        timestamp: string;
        recipient_id: string;
      }[];
    };
    field: string;
  }[];
}

// ─── GET: Webhook Verification ───────────────────────────────────────────────
/**
 * Meta requires a verification endpoint for webhook setup.
 * It sends hub.mode, hub.verify_token, and hub.challenge as query params.
 * We verify the token matches our secret and return the challenge.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] Verification successful');
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[WhatsApp Webhook] Verification failed - token mismatch');
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ─── POST: Incoming Messages & Status Updates ────────────────────────────────
/**
 * Handles incoming WhatsApp messages and status updates from Meta.
 *
 * IMPORTANT: Meta requires a fast 200 response. If we take too long,
 * Meta will retry the webhook, causing duplicate processing. We return
 * 200 immediately and process asynchronously where possible.
 *
 * Flow:
 * 1. Parse the webhook payload
 * 2. Extract message text, sender phone, phoneNumberId
 * 3. Look up broker by phone_number_id (from whatsapp_numbers table)
 * 4. Look up or create conversation
 * 5. Save incoming message to DB
 * 6. Call Claude bot engine to generate response
 * 7. Send response back via WhatsApp API
 * 8. Save bot message to DB
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Meta sends an object with entry array
    const entries: WhatsAppWebhookEntry[] = body.object === 'whatsapp_business_account'
      ? body.entry ?? []
      : [];

    if (entries.length === 0) {
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    const supabase = await createClient();

    for (const entry of entries) {
      for (const change of entry.changes) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const phoneNumberId = value.metadata.phone_number_id;

        // ── Handle status updates (delivered, read, etc.) ──────────────
        if (value.statuses && value.statuses.length > 0) {
          for (const status of value.statuses) {
            await handleStatusUpdate(supabase, status);
          }
          continue;
        }

        // ── Handle incoming messages ───────────────────────────────────
        if (!value.messages || value.messages.length === 0) continue;

        for (const message of value.messages) {
          // Extract text from message (plain text or interactive reply)
          const messageText = extractMessageText(message);
          if (!messageText) continue;

          const senderPhone = message.from;
          const senderName = value.contacts?.[0]?.profile?.name ?? null;

          try {
            // 1. Look up broker by whatsapp phone_number_id
            const { data: waNumber } = await supabase
              .from('whatsapp_numbers')
              .select('broker_id, phone_number_id')
              .eq('phone_number_id', phoneNumberId)
              .single();

            if (!waNumber) {
              console.warn(`[WhatsApp Webhook] No broker found for phone_number_id: ${phoneNumberId}`);
              continue;
            }

            const brokerId = waNumber.broker_id;

            // 2. Look up broker details for personality and context
            const { data: broker } = await supabase
              .from('brokers')
              .select('*')
              .eq('id', brokerId)
              .single();

            if (!broker || !broker.is_active) {
              console.warn(`[WhatsApp Webhook] Broker ${brokerId} not found or inactive`);
              continue;
            }

            // 3. Find or create conversation
            const conversation = await findOrCreateConversation(
              supabase,
              brokerId,
              phoneNumberId,
              senderPhone,
              senderName
            );

            // 4. Save incoming message
            await supabase.from('messages').insert({
              conversation_id: conversation.id,
              role: 'user',
              content: messageText,
              message_type: 'text',
              wa_message_id: message.id,
              metadata: { from: senderPhone, timestamp: message.timestamp },
            });

            // Update conversation last_message_at
            await supabase
              .from('conversations')
              .update({ last_message_at: new Date().toISOString() })
              .eq('id', conversation.id);

            // 5. Check if conversation is in human_takeover mode
            if (conversation.status === 'human_takeover') {
              // Don't auto-reply; a human agent handles this
              continue;
            }

            // 6. Load conversation history for context
            const { data: history } = await supabase
              .from('messages')
              .select('role, content')
              .eq('conversation_id', conversation.id)
              .order('created_at', { ascending: true })
              .limit(20);

            const conversationHistory = (history ?? [])
              .filter((m) => m.role === 'user' || m.role === 'bot')
              .map((m) => ({
                role: (m.role === 'bot' ? 'assistant' : 'user') as 'user' | 'assistant',
                content: m.content,
              }));

            // 7. Load broker's bot personality (from bot_settings or defaults)
            const personality = await loadBotPersonality(supabase, brokerId);

            // 8. Load available insurers for context
            const { data: insurerConnections } = await supabase
              .from('insurer_connections')
              .select('insurers(name)')
              .eq('broker_id', brokerId)
              .eq('is_active', true);

            const availableInsurers = (insurerConnections ?? [])
              .map((c: Record<string, unknown>) => {
                const insurer = c.insurers as { name: string } | null;
                return insurer?.name ?? '';
              })
              .filter(Boolean);

            // 9. Generate bot response via Claude
            const botResponseText = await generateBotResponse(
              personality,
              conversationHistory,
              messageText,
              {
                availableInsurers,
                brokerCountry: broker.country_code,
              }
            );

            // 10. Send response via WhatsApp
            await sendWhatsAppMessage({
              phoneNumberId,
              accessToken: WA_ACCESS_TOKEN,
              to: senderPhone,
              type: 'text',
              body: botResponseText,
            });

            // 11. Save bot message to DB
            await supabase.from('messages').insert({
              conversation_id: conversation.id,
              role: 'bot',
              content: botResponseText,
              message_type: 'text',
              metadata: { generated_by: 'claude' },
            });
          } catch (messageError) {
            // Log but don't fail the entire webhook — Meta needs 200
            console.error(`[WhatsApp Webhook] Error processing message from ${senderPhone}:`, messageError);
          }
        }
      }
    }

    // Always return 200 quickly for Meta
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('[WhatsApp Webhook] Fatal error:', error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract the text content from various WhatsApp message types.
 */
function extractMessageText(message: {
  type: string;
  text?: { body: string };
  interactive?: { type: string; button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } };
}): string | null {
  if (message.type === 'text' && message.text?.body) {
    return message.text.body;
  }
  if (message.type === 'interactive') {
    if (message.interactive?.button_reply) {
      return message.interactive.button_reply.title;
    }
    if (message.interactive?.list_reply) {
      return message.interactive.list_reply.title;
    }
  }
  // Unsupported message type (image, voice, etc.)
  return null;
}

/**
 * Find an existing active conversation or create a new one.
 */
async function findOrCreateConversation(
  supabase: Awaited<ReturnType<typeof createClient>>,
  brokerId: string,
  phoneNumberId: string,
  clientPhone: string,
  clientName: string | null
) {
  // Look for an existing active conversation with this client
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('broker_id', brokerId)
    .eq('client_phone', clientPhone)
    .in('status', ['active', 'waiting_payment', 'human_takeover'])
    .order('last_message_at', { ascending: false })
    .limit(1)
    .single();

  if (existing) {
    // Update client name if we have it now and didn't before
    if (clientName && !existing.client_name) {
      await supabase
        .from('conversations')
        .update({ client_name: clientName })
        .eq('id', existing.id);
    }
    return existing;
  }

  // Create new conversation
  const { data: newConv, error } = await supabase
    .from('conversations')
    .insert({
      broker_id: brokerId,
      whatsapp_number_id: phoneNumberId,
      client_phone: clientPhone,
      client_name: clientName,
      status: 'active',
      started_at: new Date().toISOString(),
      last_message_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !newConv) {
    throw new Error(`Failed to create conversation: ${error?.message}`);
  }

  return newConv;
}

/**
 * Load the broker's bot personality settings. Falls back to defaults.
 */
async function loadBotPersonality(
  supabase: Awaited<ReturnType<typeof createClient>>,
  brokerId: string
) {
  const { data: settings } = await supabase
    .from('bot_settings')
    .select('*')
    .eq('broker_id', brokerId)
    .single();

  // Default personality if broker hasn't configured one
  return {
    name: settings?.bot_name ?? 'CotiFacil Bot',
    tone: settings?.tone ?? 'amigable y profesional',
    formality: settings?.formality ?? 50,
    pronoun: settings?.pronoun ?? 'usted',
    emojiLevel: settings?.emoji_level ?? 'minimal',
    language: settings?.language ?? 'es',
    welcomeMessage: settings?.welcome_message ?? 'Hola! Soy tu asistente de seguros. ¿En qué puedo ayudarte?',
    systemPromptOverride: settings?.system_prompt_override ?? undefined,
    restrictedTopics: settings?.restricted_topics ?? [],
  };
}

/**
 * Handle message status updates (delivered, read, etc.).
 */
async function handleStatusUpdate(
  supabase: Awaited<ReturnType<typeof createClient>>,
  status: { id: string; status: string; timestamp: string; recipient_id: string }
) {
  try {
    // Update the message status in our DB
    await supabase
      .from('messages')
      .update({
        metadata: { wa_status: status.status, wa_status_at: status.timestamp },
      })
      .eq('wa_message_id', status.id);
  } catch (error) {
    console.error(`[WhatsApp Webhook] Error updating status for ${status.id}:`, error);
  }
}
