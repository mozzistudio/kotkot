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
  // Aseguradoras - Disponible
  {
    name: 'ASSA',
    slug: 'assa',
    type: 'Aseguradora',
    description: 'Seguros de auto, salud, vida, hogar y empresarial',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'MAPFRE',
    slug: 'mapfre',
    type: 'Aseguradora',
    description: 'Seguros generales y de vida en toda Latinoamérica',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'SURA',
    slug: 'sura',
    type: 'Aseguradora',
    description: 'Seguros, ARL y soluciones financieras',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Allianz',
    slug: 'allianz',
    type: 'Aseguradora',
    description: 'Seguros globales con presencia en LATAM',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Liberty',
    slug: 'liberty',
    type: 'Aseguradora',
    description: 'Seguros de auto y hogar',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Qualitas',
    slug: 'qualitas',
    type: 'Aseguradora',
    description: 'Especialistas en seguro de auto',
    status: 'Disponible',
    icon: <Building2 className="h-8 w-8" />,
  },
  // Aseguradoras - Próximamente
  {
    name: 'GNP',
    slug: 'gnp',
    type: 'Aseguradora',
    description: 'Seguros de vida, auto, salud y empresariales',
    status: 'Próximamente',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Rímac',
    slug: 'rimac',
    type: 'Aseguradora',
    description: 'Líder en seguros en Perú',
    status: 'Próximamente',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Bolívar',
    slug: 'bolivar',
    type: 'Aseguradora',
    description: 'Seguros y capitalización en Colombia',
    status: 'Próximamente',
    icon: <Building2 className="h-8 w-8" />,
  },
  {
    name: 'Pacífico',
    slug: 'pacifico',
    type: 'Aseguradora',
    description: 'Seguros de salud y vida en Perú',
    status: 'Próximamente',
    icon: <Building2 className="h-8 w-8" />,
  },
  // Bancos - Disponible
  {
    name: 'BAC',
    slug: 'bac',
    type: 'Banco',
    description: 'Préstamos personales, hipotecarios y de auto',
    status: 'Disponible',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Banco General',
    slug: 'banco-general',
    type: 'Banco',
    description: 'El banco más grande de Panamá',
    status: 'Disponible',
    icon: <Landmark className="h-8 w-8" />,
  },
  // Bancos - Próximamente
  {
    name: 'Banistmo',
    slug: 'banistmo',
    type: 'Banco',
    description: 'Préstamos y productos financieros',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Banco Nacional',
    slug: 'banco-nacional',
    type: 'Banco',
    description: 'Banca estatal de Panamá',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Scotiabank',
    slug: 'scotiabank',
    type: 'Banco',
    description: 'Banca internacional en LATAM',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Multibank',
    slug: 'multibank',
    type: 'Banco',
    description: 'Préstamos y leasing en Panamá',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Global Bank',
    slug: 'global-bank',
    type: 'Banco',
    description: 'Banca comercial y personal',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Caja de Ahorros',
    slug: 'caja-de-ahorros',
    type: 'Banco',
    description: 'Banca social panameña',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  {
    name: 'Credicorp Bank',
    slug: 'credicorp-bank',
    type: 'Banco',
    description: 'Banca privada y comercial',
    status: 'Próximamente',
    icon: <Landmark className="h-8 w-8" />,
  },
  // Pagos - Disponible
  {
    name: 'Yappy',
    slug: 'yappy',
    type: 'Pagos',
    description: 'Pagos instantáneos en Panamá',
    status: 'Disponible',
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    type: 'Pagos',
    description: 'Pagos internacionales con tarjeta',
    status: 'Disponible',
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    name: 'WhatsApp Business',
    slug: 'whatsapp',
    type: 'Pagos',
    description: 'API oficial de Meta para mensajería',
    status: 'Disponible',
    icon: <MessageSquare className="h-8 w-8" />,
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
        subtitle="Tu bot IA se integra directamente con las plataformas que ya usas. Cotización en tiempo real, emisión de pólizas y cobro automático."
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
            {filteredIntegrations.map((integration, index) => {
              const isComingSoon = integration.status === 'Próximamente';

              const cardContent = (
                <div
                  className={`relative h-full rounded-[var(--radius-card)] border-2 bg-white p-6 transition-all duration-200 ${
                    isComingSoon
                      ? 'cursor-not-allowed border-[var(--border-default)] opacity-60'
                      : 'group border-[var(--border-default)] hover:border-[var(--accent)] hover:shadow-lg'
                  }`}
                >
                  {/* Status Badge in Top Right */}
                  <div className="absolute right-4 top-4">
                    {integration.status === 'Disponible' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--success-fg)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Disponible
                      </span>
                    )}
                    {integration.status === 'Próximamente' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-panel)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                        Próximamente
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                    {integration.icon}
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                    {integration.name}
                  </h3>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${
                        integration.type === 'Aseguradora'
                          ? 'bg-emerald-50 text-emerald-700'
                          : integration.type === 'Banco'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {integration.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {integration.description}
                  </p>

                  {/* Link */}
                  {!isComingSoon && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)] transition-all group-hover:gap-3">
                      Ver detalles
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );

              return (
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
                  {isComingSoon ? (
                    cardContent
                  ) : (
                    <Link href={`/integraciones/${integration.slug}`}>
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="¿No ves tu aseguradora o banco?"
        subtitle="Trabajamos con tu equipo para conectar cualquier aseguradora o banco en tu mercado"
        ctaText="Contáctanos"
        ctaHref="/contacto"
      />
    </>
  );
}
