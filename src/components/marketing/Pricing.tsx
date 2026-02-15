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
      'Seguros o Préstamos (elige 1 vertical)',
      '3 instituciones conectadas',
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
      'Seguros + Préstamos incluidos',
      'Instituciones ilimitadas',
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
      'Multi-producto ilimitado',
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
    <section id="precios" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl leading-[1.1]">
            Planes diseñados para{' '}
            <span className="text-[var(--text-link)]">brokers financieros</span>
          </h2>
          <p className="mt-6 text-xl text-[var(--text-secondary)] font-medium">
            Vende seguros y préstamos con la misma plataforma. Sin comisiones ocultas
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
              className={`relative flex flex-col rounded-[var(--radius-card)] border-2 bg-[var(--surface-primary)] p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'border-[var(--accent)] md:-my-4 md:py-10 md:scale-[1.05] shadow-[0_8px_32px_rgba(202,255,4,0.25)]'
                  : 'border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-[var(--radius-button)] bg-[var(--accent)] border-2 border-[var(--accent)] px-5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[var(--text-primary)] shadow-[0_4px_12px_rgba(202,255,4,0.3)]">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-heading text-2xl font-extrabold text-[var(--text-primary)]">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`font-heading font-extrabold tracking-tight text-[var(--text-primary)] ${
                  plan.name === 'Enterprise' ? 'text-3xl sm:text-4xl' : 'text-5xl'
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-lg font-semibold text-[var(--text-secondary)]">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="my-6 border-t-2 border-[var(--border)]" />

              {/* Feature list */}
              <ul className="mb-8 flex flex-1 flex-col gap-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-link)]"
                      strokeWidth={3}
                    />
                    <span className="text-base leading-relaxed text-[var(--text-secondary)] font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              {plan.ctaStyle === 'filled' ? (
                <a
                  href="/signup"
                  className="w-full rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-center font-heading text-base font-bold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--accent-hover)] hover:scale-[1.02]"
                >
                  {plan.cta}
                </a>
              ) : (
                <a
                  href={plan.name === 'Enterprise' ? '/contacto' : '/signup'}
                  className="inline-flex w-full items-center justify-center rounded-[var(--radius-button)] border-2 border-[var(--border)] bg-[var(--surface-primary)] px-6 py-4 font-heading text-base font-bold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--surface-hover)] hover:border-[var(--accent)]"
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
          className="mt-10 mb-20 flex flex-col items-center gap-3 text-center"
        >
          <a
            href="/recursos/calculadora-roi"
            className="inline-flex items-center gap-2 text-base font-semibold text-[var(--dark-blue)] underline underline-offset-4 decoration-2 hover:opacity-70 transition-opacity"
          >
            ¿No estás seguro? Calcula tu ROI
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
            <p className="font-semibold text-[var(--text-primary)]">
              El módulo de préstamos está incluido sin costo adicional en planes Pro y Enterprise
            </p>
            <p>+$100/mes por número de WhatsApp adicional</p>
            <p>Tarifas de mensajes de Meta se cobran por separado, al costo</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
