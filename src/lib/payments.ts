import { createYappyPayment } from './yappy';
import { stripe } from './stripe';

interface CreatePaymentParams {
  brokerId: string;
  countryCode: string;
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  // Yappy-specific (Panama)
  yappyMerchantId?: string;
  yappySecretToken?: string;
  clientPhone?: string;
  // Stripe-specific (all other countries)
  stripeConnectAccountId?: string;
  successUrl: string;
  cancelUrl: string;
}

interface PaymentResult {
  provider: 'yappy' | 'stripe';
  paymentUrl: string;
  orderId: string;
}

export async function createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
  if (params.countryCode === 'PA' && params.yappyMerchantId && params.yappySecretToken) {
    const yappyResult = await createYappyPayment({
      merchantId: params.yappyMerchantId,
      secretToken: params.yappySecretToken,
      orderId: params.orderId,
      amount: params.amount,
      description: params.description,
      successUrl: params.successUrl,
      failUrl: params.cancelUrl,
      tel: params.clientPhone,
    });

    return {
      provider: 'yappy',
      paymentUrl: yappyResult.url,
      orderId: yappyResult.orderId,
    };
  }

  // Stripe Checkout for all other countries
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: params.currency.toLowerCase(),
        product_data: { name: params.description },
        unit_amount: Math.round(params.amount * 100),
      },
      quantity: 1,
    }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { orderId: params.orderId, brokerId: params.brokerId },
  }, params.stripeConnectAccountId ? {
    stripeAccount: params.stripeConnectAccountId,
  } : undefined);

  return {
    provider: 'stripe',
    paymentUrl: session.url!,
    orderId: params.orderId,
  };
}
