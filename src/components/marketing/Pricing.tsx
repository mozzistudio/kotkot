'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaStyle: 'outline' | 'filled';
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$149',
    period: '/mes',
    features: [
      '1 número de WhatsApp',
      'Hasta 500 conversaciones/mes',
      '3 aseguradoras',
      'Dashboard básico',
      'Soporte por email',
    ],
    cta: 'Comenzar',
    ctaStyle: 'outline',
  },
  {
    name: 'Pro',
    price: '$299',
    period: '/mes',
    popular: true,
    features: [
      '3 números de WhatsApp',
      'Conversaciones ilimitadas',
      'Aseguradoras ilimitadas',
      'Dashboard avanzado + analytics',
      'CRM completo',
      'API access',
      'Soporte prioritario',
    ],
    cta: 'Comenzar',
    ctaStyle: 'filled',
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    features: [
      'Números ilimitados',
      'Conversaciones ilimitadas',
      'Integraciones custom',
      'White-label',
      'SLA garantizado',
      'Account manager dedicado',
      'Onboarding personalizado',
    ],
    cta: 'Contactar Ventas',
    ctaStyle: 'outline',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Pricing() {
  return (
    <section id="precios" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Planes diseñados para{' '}
            <span className="text-[var(--text-primary)]">corredores de seguros</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Sin comisiones ocultas. Cancela cuando quieras.
          </p>
        </motion.div>

        {/* --- Cards --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-[var(--radius-card)] border bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-[var(--dark-blue)] md:-my-4 md:py-10 md:scale-[1.03]'
                  : 'border-[var(--border-default)] hover:border-[var(--dark-blue)]'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-[var(--radius-button)] bg-[var(--action-dark-bg)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base font-medium text-[var(--text-secondary)]">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-[var(--border-default)]" />

              {/* Feature list */}
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--text-primary)]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[0.9375rem] leading-snug text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA button — only popular plan gets primary (filled) CTA */}
              {plan.ctaStyle === 'filled' ? (
                <a
                  href="/signup"
                  className="w-full rounded-[var(--radius-button)] bg-[var(--action-dark-bg)] px-6 py-3 text-center font-heading text-[0.9375rem] font-semibold text-[var(--action-dark-fg)] transition-all duration-200 hover:bg-[var(--action-dark-hover)]"
                >
                  {plan.cta}
                </a>
              ) : (
                <a
                  href={plan.name === 'Enterprise' ? '/contacto' : '/signup'}
                  className="inline-flex w-full items-center justify-center rounded-[var(--radius-button)] border border-[var(--dark-blue)] bg-white px-6 py-3 font-heading text-[0.9375rem] font-semibold text-[var(--dark-blue)] transition-all duration-200 hover:bg-[var(--dark-blue-surface)]"
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* --- Footnotes --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-2 text-center text-sm text-[var(--text-secondary)]"
        >
          <p>+$100/mes por número de WhatsApp adicional</p>
          <p>
            Tarifas de mensajes de Meta se cobran por separado, al costo
          </p>
        </motion.div>
      </div>
    </section>
  );
}
