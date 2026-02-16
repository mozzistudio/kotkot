import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { accountId, to, message } = await request.json();

    if (!accountId || !to || !message) {
      return NextResponse.json(
        { error: 'Account ID, recipient phone number, and message are required' },
        { status: 400 }
      );
    }

    // Get user from cookies
    const cookieStore = await cookies();
    const supabaseAccessToken = cookieStore.get('sb-access-token')?.value;

    if (!supabaseAccessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client with service key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get user from access token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(supabaseAccessToken);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get WhatsApp account details
    const { data: account, error: accountError } = await supabase
      .from('whatsapp_accounts')
      .select('*')
      .eq('id', accountId)
      .eq('broker_id', user.id)
      .eq('status', 'active')
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { error: 'WhatsApp account not found or inactive' },
        { status: 404 }
      );
    }

    // Send message via WhatsApp Business API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v21.0/${account.phone_number_id}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${account.access_token}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''), // Remove non-digits
          type: 'text',
          text: {
            body: message,
          },
        }),
      }
    );

    if (!whatsappResponse.ok) {
      const error = await whatsappResponse.json();
      console.error('WhatsApp API error:', error);
      return NextResponse.json(
        { error: 'Failed to send message', details: error },
        { status: 400 }
      );
    }

    const responseData = await whatsappResponse.json();
    const messageId = responseData.messages?.[0]?.id;

    // Store the sent message
    if (messageId) {
      await supabase.from('whatsapp_messages').insert({
        whatsapp_account_id: account.id,
        message_id: messageId,
        from_phone: account.phone_number,
        to_phone: to,
        message_type: 'text',
        message_body: message,
        direction: 'outbound',
        status: 'sent',
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      messageId,
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
