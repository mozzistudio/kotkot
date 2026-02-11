import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateBotResponse } from '@/lib/claude';

/**
 * POST /api/bot/process
 *
 * Main bot engine endpoint. Processes a message through the AI bot within
 * the context of an existing conversation.
 *
 * Input:
 *   - conversationId: string (required)
 *   - message: string (required)
 *
 * Flow:
 * 1. Load conversation and verify broker ownership
 * 2. Load conversation history (last 20 messages)
 * 3. Load broker's bot personality settings
 * 4. Load available insurers for broker's country
 * 5. Detect intent (greeting, quote request, data collection, selection, objection)
 * 6. If enough data collected, trigger quote
 * 7. If quote selected, generate payment link
 * 8. Call Claude API with full context
 * 9. Save both user and bot messages
 * 10. Return bot response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, message } = body;

    if (!conversationId || !message) {
      return NextResponse.json(
        { error: 'conversationId and message are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Verify the authenticated user owns this conversation
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: broker } = await supabase
      .from('brokers')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (!broker) {
      return NextResponse.json({ error: 'Broker not found' }, { status: 404 });
    }

    // 2. Load conversation and verify it belongs to the broker
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('broker_id', broker.id)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // 3. Load conversation history (last 20 messages for context window)
    const { data: history } = await supabase
      .from('messages')
      .select('role, content, message_type, metadata, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    const conversationHistory = (history ?? [])
      .filter((m) => m.role === 'user' || m.role === 'bot')
      .map((m) => ({
        role: (m.role === 'bot' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.content,
      }));

    // 4. Load broker's bot personality
    const personality = await loadBotPersonality(supabase, broker.id);

    // 5. Load available insurers for context
    const { data: insurerConnections } = await supabase
      .from('insurer_connections')
      .select('insurers(name, slug, supported_products)')
      .eq('broker_id', broker.id)
      .eq('is_active', true);

    const availableInsurers = (insurerConnections ?? [])
      .map((c: Record<string, unknown>) => {
        const insurer = c.insurers as { name: string } | null;
        return insurer?.name ?? '';
      })
      .filter(Boolean);

    // 6. Detect intent from the message to enrich context
    const intent = detectIntent(message, conversationHistory);

    // 7. Build additional context based on intent
    let quoteData: Record<string, unknown> | undefined;

    if (intent === 'quote_ready') {
      // If we detect enough data has been collected, fetch any existing quotes
      const { data: existingQuotes } = await supabase
        .from('quotes')
        .select('*, quote_results(*)')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existingQuotes && existingQuotes.length > 0) {
        quoteData = {
          hasQuotes: true,
          quoteId: existingQuotes[0].id,
          results: existingQuotes[0].quote_results,
        };
      }
    }

    // 8. Generate bot response via Claude
    const botResponseText = await generateBotResponse(
      personality,
      conversationHistory,
      message,
      {
        availableInsurers,
        quoteData,
        brokerCountry: broker.country_code,
      }
    );

    // 9. Save user message to DB
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: message,
      message_type: 'text',
      metadata: { source: 'dashboard', intent },
    });

    // 10. Save bot response to DB
    const { data: botMessage } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role: 'bot',
        content: botResponseText,
        message_type: 'text',
        metadata: { generated_by: 'claude', intent },
      })
      .select()
      .single();

    // 11. Update conversation timestamp
    await supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        insurance_type: conversation.insurance_type ?? detectInsuranceType(message),
      })
      .eq('id', conversationId);

    return NextResponse.json({
      response: botResponseText,
      messageId: botMessage?.id,
      intent,
      conversationId,
    });
  } catch (error) {
    console.error('[Bot Process] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

  return {
    name: settings?.bot_name ?? 'CotiFacil Bot',
    tone: settings?.tone ?? 'amigable y profesional',
    formality: settings?.formality ?? 50,
    pronoun: settings?.pronoun ?? 'usted',
    emojiLevel: settings?.emoji_level ?? 'minimal',
    language: settings?.language ?? 'es',
    welcomeMessage: settings?.welcome_message ?? 'Hola! Soy tu asistente de seguros. ¿En que puedo ayudarte?',
    systemPromptOverride: settings?.system_prompt_override ?? undefined,
    restrictedTopics: settings?.restricted_topics ?? [],
  };
}

/**
 * Simple intent detection based on message content and conversation state.
 * In production, this could be enhanced with a classification model.
 */
function detectIntent(
  message: string,
  history: { role: string; content: string }[]
): string {
  const lower = message.toLowerCase();

  // Greeting detection
  if (history.length === 0 || /^(hola|hey|buenos?\s*(dias|tardes|noches)|hi|hello)/i.test(lower)) {
    return 'greeting';
  }

  // Quote request detection
  if (/cotiz|seguro|póliza|precio|cuánto|cuanto|quote|insurance/i.test(lower)) {
    return 'quote_request';
  }

  // Selection / decision
  if (/eleg|seleccion|opci[oó]n\s*\d|quiero\s*(la|el)|me\s*quedo|choose|select/i.test(lower)) {
    return 'selection';
  }

  // Objection handling
  if (/caro|expensive|mejor\s*precio|descuento|no\s*s[eé]|dud|pensar/i.test(lower)) {
    return 'objection';
  }

  // Human transfer request
  if (/agente|humano|persona|real|human|agent|hablar\s*con\s*alguien/i.test(lower)) {
    return 'human_transfer';
  }

  // Payment related
  if (/pag|pay|link|yappy|tarjeta|card/i.test(lower)) {
    return 'payment';
  }

  // Default: data collection (bot is gathering info)
  return 'data_collection';
}

/**
 * Try to detect the insurance type from a message.
 */
function detectInsuranceType(message: string): string | null {
  const lower = message.toLowerCase();

  if (/auto|carro|vehic|car|vehicle/i.test(lower)) return 'auto';
  if (/salud|health|medic/i.test(lower)) return 'health';
  if (/hogar|casa|home|house|vivienda/i.test(lower)) return 'home';
  if (/viaje|travel|trip/i.test(lower)) return 'travel';
  if (/negocio|empresa|business|comerci/i.test(lower)) return 'business';

  return null;
}
