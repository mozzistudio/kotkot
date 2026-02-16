'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { motion } from 'framer-motion';
import {
  CreditCard,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Link as LinkIcon,
  Bell,
  DollarSign
} from '@/components/shared/icon-map';
import Link from 'next/link';

interface Integration {
  name: string;
  slug: string;
  description: string;
  status: 'Disponible' | 'Próximamente';
  icon: any;
}

const plataformasPagos: Integration[] = [
  {
    name: 'Yappy',
    slug: 'yappy',
    description: 'Pagos instantáneos en Panamá',
    status: 'Disponible',
    icon: CreditCard,
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    description: 'Pagos internacionales con tarjeta',
    status: 'Disponible',
    icon: CreditCard,
  },
  {
    name: 'WhatsApp Business',
    slug: 'whatsapp',
    description: 'API oficial de Meta para mensajería',
    status: 'Disponible',
    icon: MessageSquare,
  },
];

const flujoSteps = [
  {
    icon: CheckCircle,
    label: 'Cliente acepta cotización',
  },
  {
    icon: LinkIcon,
    label: 'Bot genera link de pago',
  },
  {
    icon: CreditCard,
    label: 'Cliente paga en 1 clic',
  },
  {
    icon: Bell,
    label: 'Confirmación automática',
  },
  {
    icon: DollarSign,
    label: 'Comisión registrada',
  },
];

const plataformasDetalle = [
  {
    name: 'Yappy',
    description: 'Pagos instantáneos en Panamá. El método favorito de tus clientes.',
    slug: 'yappy',
    available: true,
  },
  {
    name: 'Stripe',
    description: 'Tarjeta de crédito y débito internacional. Multi-moneda.',
    slug: 'stripe',
    available: true,
  },
  {
    name: 'ACH / Transferencia bancaria',
    description: 'Próximamente',
    slug: '',
    available: false,
  },
];

const steps = [
  {
    title: 'Conecta tu cuenta',
    description: 'Vincula tus cuentas de Yappy, Stripe u otras plataformas de pago al dashboard.',
  },
  {
    title: 'Configura las reglas',
    description: 'Define cuándo y cómo tu bot debe generar los links de pago automáticamente.',
  },
  {
    title: 'Cobra automáticamente',
    description: 'Tu bot envía el link de pago después de cada cotización. El cliente paga y tú cobras al instante.',
  },
];

export default function PagosPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Integraciones', href: '/integraciones' },
          { label: 'Pagos', href: '' },
        ]}
      />

      <PageHero
        badge="Pagos"
        title="Cobra Automáticamente con Cada Venta"
        subtitle="Tu bot genera links de pago al instante después de cada cotización. El cliente paga, tú cobras. Sin perseguir a nadie."
      />

      {/* Integration Cards Grid */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plataformasPagos.map((plataforma, index) => {
              const cardContent = (
                <div className="group relative h-full rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg">
                  {/* Status Badge */}
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--success-fg)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                      Disponible
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                    <plataforma.icon className="h-8 w-8" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                    {plataforma.name}
                  </h3>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="inline-block rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                      Pagos
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {plataforma.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)] transition-all group-hover:gap-3">
                    Ver detalles
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={plataforma.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                >
                  <Link href={`/integraciones/${plataforma.slug}`}>
                    {cardContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              ¿Cómo funciona la integración?
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-heading text-xl font-bold text-[var(--text-primary)]">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flujo de Cobro Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              Flujo de cobro automático
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              {flujoSteps.map((step, index) => (
                <div key={step.label} className="contents">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.1,
                    }}
                    className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 text-center transition-all hover:border-[var(--border-strong)] hover:shadow-md"
                    style={{ minWidth: '160px' }}
                  >
                    <step.icon className="h-10 w-10 text-[var(--dark-blue)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {step.label}
                    </span>
                  </motion.div>
                  {index < flujoSteps.length - 1 && (
                    <ArrowRight className="hidden h-6 w-6 text-[var(--text-muted)] lg:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plataformas Soportadas Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              Plataformas soportadas
            </h2>

            <div className="space-y-6">
              {plataformasDetalle.map((plataforma, index) => (
                <motion.div
                  key={plataforma.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1,
                  }}
                  className={`rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 ${
                    !plataforma.available && 'opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                        {plataforma.name}
                      </h3>
                      <p className="text-[var(--text-secondary)]">
                        {plataforma.description}
                      </p>
                    </div>
                    {plataforma.available && (
                      <Link
                        href={`/integraciones/${plataforma.slug}`}
                        className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)] hover:gap-3 transition-all whitespace-nowrap"
                      >
                        Ver más
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {!plataforma.available && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-panel)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)] whitespace-nowrap">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                        Próximamente
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Automatiza tus cobros"
        subtitle="Genera links de pago automáticamente después de cada cotización"
        ctaText="Solicitar Demo"
        ctaHref="/demo"
      />
    </>
  );
}
