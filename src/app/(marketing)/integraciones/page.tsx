'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { Building2, Landmark, CreditCard, MessageSquare, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type IntegrationType = 'Todas' | 'Aseguradoras' | 'Bancos' | 'Pagos';

interface Integration {
  name: string;
  slug: string;
  type: 'Aseguradora' | 'Banco' | 'Pagos';
  description: string;
  status: 'Disponible' | 'Próximamente';
  icon: React.ReactNode;
}

const integrations: Integration[] = [
  {
    name: 'ASSA',
    slug: 'assa',
    type: 'Aseguradora',
    description: 'Cotiza y vende seguros de auto, salud y vida en tiempo real',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'MAPFRE',
    slug: 'mapfre',
    type: 'Aseguradora',
    description: 'Acceso completo a pólizas de MAPFRE para tu mercado',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Seguros SURA',
    slug: 'sura',
    type: 'Aseguradora',
    description: 'Integración directa con el catálogo completo de SURA',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'BAC',
    slug: 'bac',
    type: 'Banco',
    description: 'Vende préstamos personales y tarjetas de crédito BAC',
    status: 'Disponible',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Banco General',
    slug: 'banco-general',
    type: 'Banco',
    description: 'Cotización automática de préstamos hipotecarios y personales',
    status: 'Disponible',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'WhatsApp Business',
    slug: 'whatsapp',
    type: 'Pagos',
    description: 'API oficial de WhatsApp para comunicación con clientes',
    status: 'Disponible',
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    name: 'Yappy',
    slug: 'yappy',
    type: 'Pagos',
    description: 'Cobros instantáneos con Yappy en Panamá',
    status: 'Disponible',
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    type: 'Pagos',
    description: 'Acepta tarjetas de crédito y débito internacionalmente',
    status: 'Disponible',
    icon: <CreditCard className="h-8 w-8" />,
  },
];

export default function IntegracionesPage() {
  const [activeFilter, setActiveFilter] = useState<IntegrationType>('Todas');

  const filteredIntegrations = integrations.filter(
    (integration) => activeFilter === 'Todas' || integration.type === activeFilter
  );

  return (
    <>
      <PageHero
        badge="Integraciones"
        title="Conecta con 25+ Aseguradoras y Bancos en Minutos"
        subtitle="Integra tu bot con las principales aseguradoras, bancos y pasarelas de pago en Latinoamérica. Sin código, sin complicaciones."
        ctaText="Ver Demo"
        ctaHref="/demo"
      />

      {/* Filter Bar */}
      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3">
            {(['Todas', 'Aseguradoras', 'Bancos', 'Pagos'] as IntegrationType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-[var(--dark-blue)] text-white shadow-lg'
                    : 'border border-[var(--border-default)] bg-white text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Cards Grid */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
              >
                <Link href={`/integraciones/${integration.slug}`}>
                  <div className="group relative h-full rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg">
                    {/* Icon */}
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                      {integration.icon}
                    </div>

                    {/* Name */}
                    <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                      {integration.name}
                    </h3>

                    {/* Type Badge */}
                    <div className="mb-3 inline-flex items-center gap-2">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${
                          integration.type === 'Aseguradora'
                            ? 'bg-blue-50 text-blue-700'
                            : integration.type === 'Banco'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {integration.type}
                      </span>
                      {integration.status === 'Disponible' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--success-fg)]">
                          <Check className="h-3.5 w-3.5" />
                          Disponible
                        </span>
                      )}
                      {integration.status === 'Próximamente' && (
                        <span className="text-xs font-medium text-[var(--text-muted)]">
                          Próximamente
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {integration.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)] transition-all group-hover:gap-3">
                      Ver detalles
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="¿Necesitas una integración específica?"
        subtitle="Trabajamos con tu equipo para conectar cualquier aseguradora o banco en tu mercado"
        ctaText="Contactar Ventas"
        ctaHref="/demo"
      />
    </>
  );
}
