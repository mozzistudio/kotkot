import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

// ─── Environment ─────────────────────────────────────────────────────────────
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

/**
 * GET /api/payments/stripe-callback
 *
 * Handles the Stripe Checkout redirect after payment. Stripe redirects the
 * user to the success_url we provided when creating the Checkout session.
 * The URL contains the session_id as a query parameter.
 *
 * This endpoint retrieves the session from Stripe, updates the payment status
 * in our DB, and redirects the user to the appropriate page.
 *
 * Note: The authoritative payment confirmation comes via the Stripe webhook
 * (POST /api/webhooks/stripe). This GET handler provides a better UX by
 * checking the session status immediately on redirect.
 *
 * Query parameters:
 *   - session_id: string (required) — the Stripe Checkout session ID
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.redirect(`${APP_URL}/payment/error?reason=missing_session_id`);
  }

  try {
    // Retrieve the Checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.warn(`[Stripe Callback] No orderId in session metadata for ${sessionId}`);
      return NextResponse.redirect(`${APP_URL}/payment/error?reason=missing_order_metadata`);
    }

    const supabase = await createClient();

    // Check payment status from Stripe session
    const isSuccess = session.payment_status === 'paid';

    if (isSuccess) {
      // Optimistically update the payment status in our DB
      // (The webhook will also update it, but this provides faster feedback)
      await supabase
        .from('payments')
        .update({
          status: 'completed',
          provider_status: session.payment_status,
          provider_session_id: sessionId,
          updated_at: new Date().toISOString(),
        })
        .eq('order_id', orderId);

      return NextResponse.redirect(
        `${APP_URL}/payment/success?orderId=${orderId}&provider=stripe&session_id=${sessionId}`
      );
    } else {
      // Payment not completed — could be cancelled or pending
      const reason = session.payment_status === 'unpaid' ? 'cancelled' : 'pending';

      await supabase
        .from('payments')
        .update({
          status: reason === 'cancelled' ? 'cancelled' : 'pending',
          provider_status: session.payment_status,
          provider_session_id: sessionId,
          updated_at: new Date().toISOString(),
        })
        .eq('order_id', orderId);

      return NextResponse.redirect(
        `${APP_URL}/payment/failed?orderId=${orderId}&provider=stripe&reason=${reason}`
      );
    }
  } catch (error) {
    console.error('[Stripe Callback] Error:', error);
    return NextResponse.redirect(`${APP_URL}/payment/error?reason=server_error`);
  }
}
