import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ─── Environment ─────────────────────────────────────────────────────────────
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

/**
 * GET /api/payments/yappy-callback
 *
 * Handles the Yappy redirect after payment. Yappy redirects the user back
 * to either the successUrl or failUrl we provided when creating the payment.
 * This endpoint checks the orderId, looks up the payment, and redirects the
 * user to the appropriate success or failure page.
 *
 * Note: The actual payment confirmation comes via the Yappy webhook
 * (POST /api/webhooks/yappy). This GET handler is just for the user redirect.
 *
 * Query parameters:
 *   - orderId: string (required)
 *   - status: 'success' | 'fail' (optional — from our callback URL)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');

  if (!orderId) {
    return NextResponse.redirect(`${APP_URL}/payment/error?reason=missing_order_id`);
  }

  try {
    const supabase = await createClient();

    // Look up the payment record
    const { data: payment } = await supabase
      .from('payments')
      .select('id, status, broker_id, order_id')
      .eq('order_id', orderId)
      .single();

    if (!payment) {
      return NextResponse.redirect(`${APP_URL}/payment/error?reason=payment_not_found&orderId=${orderId}`);
    }

    // Determine where to redirect based on status parameter or payment DB status
    const isSuccess = status === 'success' || payment.status === 'completed';

    if (isSuccess) {
      return NextResponse.redirect(
        `${APP_URL}/payment/success?orderId=${orderId}&provider=yappy`
      );
    } else {
      return NextResponse.redirect(
        `${APP_URL}/payment/failed?orderId=${orderId}&provider=yappy`
      );
    }
  } catch (error) {
    console.error('[Yappy Callback] Error:', error);
    return NextResponse.redirect(`${APP_URL}/payment/error?reason=server_error`);
  }
}
