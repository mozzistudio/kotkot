import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Webhook verification (Meta Platform requirement)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// POST - Receive incoming messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Meta sends test messages during setup
    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Process each entry in the webhook payload
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'messages') continue;

        const value = change.value;

        // Process incoming messages
        for (const message of value.messages || []) {
          const phoneNumberId = value.metadata.phone_number_id;
          const fromPhone = message.from;
          const messageId = message.id;
          const timestamp = new Date(parseInt(message.timestamp) * 1000);

          // Find the WhatsApp account
          const { data: account } = await supabase
            .from('whatsapp_accounts')
            .select('id')
            .eq('phone_number_id', phoneNumberId)
            .single();

          if (!account) {
            console.error('WhatsApp account not found:', phoneNumberId);
            continue;
          }

          // Extract message body based on type
          let messageBody = '';
          let messageType = message.type;

          switch (message.type) {
            case 'text':
              messageBody = message.text?.body || '';
              break;
            case 'image':
              messageBody = message.image?.caption || '[Image]';
              break;
            case 'video':
              messageBody = message.video?.caption || '[Video]';
              break;
            case 'audio':
              messageBody = '[Audio]';
              break;
            case 'document':
              messageBody = message.document?.filename || '[Document]';
              break;
            case 'location':
              messageBody = '[Location]';
              break;
            case 'contacts':
              messageBody = '[Contact]';
              break;
            default:
              messageBody = `[${message.type}]`;
          }

          // Store the message
          const { error } = await supabase.from('whatsapp_messages').insert({
            whatsapp_account_id: account.id,
            message_id: messageId,
            from_phone: fromPhone,
            to_phone: value.metadata.display_phone_number,
            message_type: messageType,
            message_body: messageBody,
            direction: 'inbound',
            timestamp,
            metadata: message,
          });

          if (error) {
            console.error('Error storing message:', error);
          } else {
            console.log('Message stored:', messageId);
          }
        }

        // Process message status updates
        for (const status of value.statuses || []) {
          await supabase
            .from('whatsapp_messages')
            .update({ status: status.status })
            .eq('message_id', status.id);
        }
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
