import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 14900, // $149
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    features: [
      '1 número de WhatsApp',
      'Hasta 500 conversaciones/mes',
      '3 aseguradoras',
      'Dashboard básico',
      'Soporte por email',
    ],
  },
  pro: {
    name: 'Pro',
    price: 29900, // $299
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      '3 números de WhatsApp',
      'Conversaciones ilimitadas',
      'Aseguradoras ilimitadas',
      'Dashboard avanzado + analytics',
      'CRM completo',
      'API access',
      'Soporte prioritario',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: null, // custom
    priceId: null,
    features: [
      'Números ilimitados',
      'Conversaciones ilimitadas',
      'Integraciones custom',
      'White-label',
      'SLA garantizado',
      'Account manager dedicado',
      'Onboarding personalizado',
    ],
  },
} as const;
