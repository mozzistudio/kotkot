import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createPayment } from '@/lib/payments';
import { generateOrderId } from '@/lib/utils';
import { getCountry } from '@/lib/countries';

// ─── Environment ─────────────────────────────────────────────────────────────
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

/**
 * POST /api/payments/create
 *
 * Smart payment link creation. Automatically selects the correct payment
 * provider based on the broker's country:
 *   - Panama (PA): Yappy
 *   - All other countries: Stripe Checkout
 *
 * Input:
 *   - quoteResultId: string (required) — the quote_results UUID
 *   - brokerId: string (optional) — used for webhook context; falls back to auth user
 *   - clientPhone: string (optional) — for Yappy phone pre-fill
 *
 * Flow:
 * 1. Verify authentication
 * 2. Load quote result and broker details
 * 3. Determine payment provider by country
 * 4. Create payment via the appropriate provider
 * 5. Save payment record to DB
 * 6. Return payment URL
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteResultId, clientPhone } = body;

    if (!quoteResultId) {
      return NextResponse.json(
        { error: 'quoteResultId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Verify authenticated user
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

    // 2. Load the quote result
    const { data: quoteResult } = await supabase
      .from('quote_results')
      .select('*, quotes(broker_id, conversation_id, insurance_type)')
      .eq('id', quoteResultId)
      .single();

    if (!quoteResult) {
      return NextResponse.json({ error: 'Quote result not found' }, { status: 404 });
    }

    // Verify the quote belongs to this broker
    const quoteParent = quoteResult.quotes as { broker_id: string; conversation_id: string | null; insurance_type: string } | null;
    if (quoteParent?.broker_id !== broker.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 3. Determine payment details
    const country = getCountry(broker.country_code);
    const orderId = generateOrderId();
    const amount = quoteResult.price as number;
    const currency = (quoteResult.currency as string) || country?.currency || 'USD';
    const insurerName = quoteResult.insurer_name as string;
    const insuranceType = quoteParent?.insurance_type ?? 'insurance';

    const description = `Seguro ${insuranceType} - ${insurerName} (${orderId})`;

    // 4. Build callback URLs
    const isYappy = broker.country_code === 'PA' && broker.yappy_merchant_id;
    const successUrl = isYappy
      ? `${APP_URL}/api/payments/yappy-callback?orderId=${orderId}&status=success`
      : `${APP_URL}/api/payments/stripe-callback?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = isYappy
      ? `${APP_URL}/api/payments/yappy-callback?orderId=${orderId}&status=fail`
      : `${APP_URL}/payment/cancelled?orderId=${orderId}`;

    // 5. Create payment via the appropriate provider
    const paymentResult = await createPayment({
      brokerId: broker.id,
      countryCode: broker.country_code,
      amount,
      currency,
      description,
      orderId,
      yappyMerchantId: broker.yappy_merchant_id ?? undefined,
      yappySecretToken: broker.yappy_secret_token ?? undefined,
      clientPhone: clientPhone ?? undefined,
      stripeConnectAccountId: broker.stripe_connect_account_id ?? undefined,
      successUrl,
      cancelUrl,
    });

    // 6. Save payment record to DB
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        broker_id: broker.id,
        quote_result_id: quoteResultId,
        order_id: orderId,
        provider: paymentResult.provider,
        amount,
        currency,
        status: 'pending',
        payment_url: paymentResult.paymentUrl,
        description,
        client_phone: clientPhone ?? null,
        conversation_id: quoteParent?.conversation_id ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (paymentError) {
      console.error('[Payment Create] DB insert error:', paymentError);
      // Payment was created with the provider but DB save failed — log but still return URL
    }

    // 7. Update conversation status to waiting_payment
    if (quoteParent?.conversation_id) {
      await supabase
        .from('conversations')
        .update({ status: 'waiting_payment' })
        .eq('id', quoteParent.conversation_id);
    }

    return NextResponse.json({
      paymentUrl: paymentResult.paymentUrl,
      orderId,
      provider: paymentResult.provider,
      paymentId: payment?.id ?? null,
    });
  } catch (error) {
    console.error('[Payment Create] Error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
