import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyYappyWebhook } from '@/lib/yappy';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

// ─── Environment ─────────────────────────────────────────────────────────────
const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

/**
 * POST /api/webhooks/yappy
 *
 * Yappy payment webhook handler (Panama only).
 * Yappy sends a POST callback when a payment is completed or fails.
 *
 * Flow:
 * 1. Verify webhook authenticity
 * 2. Update payment status in DB
 * 3. If success: update quote status, notify broker, send WhatsApp confirmation
 * 4. If fail: send WhatsApp error message with retry link
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderId = body.orderId as string | undefined;
    const status = body.status as string | undefined;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Look up the payment record to get broker info for verification
    const { data: payment } = await supabase
      .from('payments')
      .select('*, brokers(yappy_secret_token, country_code)')
      .eq('order_id', orderId)
      .single();

    if (!payment) {
      console.warn(`[Yappy Webhook] Payment not found for orderId: ${orderId}`);
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // 2. Verify webhook authenticity using broker's Yappy secret token
    const broker = payment.brokers as { yappy_secret_token: string | null; country_code: string } | null;
    const secretToken = broker?.yappy_secret_token ?? '';

    const isValid = await verifyYappyWebhook(body, secretToken);
    if (!isValid) {
      console.warn(`[Yappy Webhook] Verification failed for orderId: ${orderId}`);
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    // 3. Determine payment outcome
    const isSuccess = status === 'completed' || status === 'success' || status === 'E';

    // 4. Update payment record
    await supabase
      .from('payments')
      .update({
        status: isSuccess ? 'completed' : 'failed',
        provider_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId);

    // 5. Load related conversation for WhatsApp messaging
    const { data: quoteResult } = await supabase
      .from('quote_results')
      .select('quote_id, insurer_name, price, currency')
      .eq('id', payment.quote_result_id)
      .single();

    const { data: quote } = quoteResult
      ? await supabase
          .from('quotes')
          .select('conversation_id')
          .eq('id', quoteResult.quote_id)
          .single()
      : { data: null };

    const { data: conversation } = quote?.conversation_id
      ? await supabase
          .from('conversations')
          .select('client_phone, whatsapp_number_id, broker_id')
          .eq('id', quote.conversation_id)
          .single()
      : { data: null };

    if (isSuccess) {
      // ── Payment succeeded ───────────────────────────────────────────
      console.log(`[Yappy Webhook] Payment completed for orderId: ${orderId}`);

      // Update quote status
      if (quoteResult) {
        await supabase
          .from('quote_results')
          .update({ status: 'paid' })
          .eq('id', payment.quote_result_id);
      }

      // Update conversation status
      if (quote?.conversation_id) {
        await supabase
          .from('conversations')
          .update({ status: 'closed' })
          .eq('id', quote.conversation_id);
      }

      // Send WhatsApp confirmation to client
      if (conversation?.client_phone && conversation.whatsapp_number_id) {
        const confirmationMsg = quoteResult
          ? `Pago confirmado! Tu seguro con ${quoteResult.insurer_name} por ${quoteResult.currency}${quoteResult.price}/mes ha sido procesado exitosamente. Tu corredor se comunicara contigo pronto con los detalles de tu poliza.`
          : `Pago confirmado! Tu corredor se comunicara contigo pronto con los detalles.`;

        try {
          await sendWhatsAppMessage({
            phoneNumberId: conversation.whatsapp_number_id,
            accessToken: WA_ACCESS_TOKEN,
            to: conversation.client_phone,
            type: 'text',
            body: confirmationMsg,
          });
        } catch (waError) {
          console.error('[Yappy Webhook] Failed to send WhatsApp confirmation:', waError);
        }
      }
    } else {
      // ── Payment failed ──────────────────────────────────────────────
      console.warn(`[Yappy Webhook] Payment failed for orderId: ${orderId}, status: ${status}`);

      // Send WhatsApp error message with retry link
      if (conversation?.client_phone && conversation.whatsapp_number_id) {
        const retryUrl = `${APP_URL}/payment/retry?orderId=${orderId}`;
        const errorMsg = `Lo sentimos, tu pago no se pudo procesar. Puedes intentar nuevamente aqui: ${retryUrl}\n\nSi necesitas ayuda, escribe "agente" para hablar con un humano.`;

        try {
          await sendWhatsAppMessage({
            phoneNumberId: conversation.whatsapp_number_id,
            accessToken: WA_ACCESS_TOKEN,
            to: conversation.client_phone,
            type: 'text',
            body: errorMsg,
          });
        } catch (waError) {
          console.error('[Yappy Webhook] Failed to send WhatsApp error message:', waError);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[Yappy Webhook] Fatal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
