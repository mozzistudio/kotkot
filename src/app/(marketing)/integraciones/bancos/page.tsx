'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { motion } from 'framer-motion';
import {
  Landmark,
  ArrowRight,
  CreditCard,
  Home as HomeIcon,
  Car,
  Briefcase,
  RefreshCw,
  FileText,
  Zap,
  UserCheck,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface Integration {
  name: string;
  slug: string;
  description: string;
  status: 'Disponible' | 'Próximamente';
}

const bancos: Integration[] = [
  {
    name: 'BAC',
    slug: 'bac',
    description: 'Préstamos personales, hipotecarios y de auto',
    status: 'Disponible',
  },
  {
    name: 'Banco General',
    slug: 'banco-general',
    description: 'El banco más grande de Panamá',
    status: 'Disponible',
  },
  {
    name: 'Banistmo',
    slug: 'banistmo',
    description: 'Préstamos y productos financieros',
    status: 'Próximamente',
  },
  {
    name: 'Banco Nacional',
    slug: 'banco-nacional',
    description: 'Banca estatal de Panamá',
    status: 'Próximamente',
  },
  {
    name: 'Scotiabank',
    slug: 'scotiabank',
    description: 'Banca internacional en LATAM',
    status: 'Próximamente',
  },
  {
    name: 'Multibank',
    slug: 'multibank',
    description: 'Préstamos y leasing en Panamá',
    status: 'Próximamente',
  },
  {
    name: 'Global Bank',
    slug: 'global-bank',
    description: 'Banca comercial y personal',
    status: 'Próximamente',
  },
  {
    name: 'Caja de Ahorros',
    slug: 'caja-de-ahorros',
    description: 'Banca social panameña',
    status: 'Próximamente',
  },
  {
    name: 'Credicorp Bank',
    slug: 'credicorp-bank',
    description: 'Banca privada y comercial',
    status: 'Próximamente',
  },
];

const productos = [
  { icon: CreditCard, label: 'Préstamo Personal' },
  { icon: HomeIcon, label: 'Hipotecario' },
  { icon: Car, label: 'Auto' },
  { icon: Briefcase, label: 'Empresarial' },
  { icon: RefreshCw, label: 'Consolidación de Deudas' },
  { icon: FileText, label: 'Leasing' },
];

const ventajas = [
  {
    icon: Zap,
    title: 'Compara tasas al instante',
    description: 'Tu bot muestra opciones de múltiples bancos en segundos',
  },
  {
    icon: UserCheck,
    title: 'Pre-calificación automática',
    description: 'El cliente sabe si califica antes de ir al banco',
  },
  {
    icon: DollarSign,
    title: 'Doble comisión',
    description: 'Vende seguros + préstamos al mismo cliente',
  },
];

const steps = [
  {
    title: 'Conecta credenciales',
    description: 'Ingresa tus API keys o credenciales de cada banco en el dashboard de kotkot.',
  },
  {
    title: 'Configura productos',
    description: 'Selecciona qué tipos de préstamos quieres que tu bot ofrezca automáticamente.',
  },
  {
    title: 'Tu bot cotiza automáticamente',
    description: 'Tu agente IA compara tasas y pre-califica clientes en tiempo real por WhatsApp.',
  },
];

export default function BancosPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Integraciones', href: '/integraciones' },
          { label: 'Bancos', href: '' },
        ]}
      />

      <PageHero
        badge="Bancos"
        title="15+ Bancos y Financieras Conectados"
        subtitle="Tu agente IA pre-califica, compara tasas y ofrece préstamos de múltiples bancos en una sola conversación de WhatsApp."
      />

      {/* Integration Cards Grid */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bancos.map((banco, index) => {
              const isComingSoon = banco.status === 'Próximamente';

              const cardContent = (
                <div
                  className={`relative h-full rounded-[var(--radius-card)] border-2 bg-white p-6 transition-all duration-200 ${
                    isComingSoon
                      ? 'cursor-not-allowed border-[var(--border-default)] opacity-60'
                      : 'group border-[var(--border-default)] hover:border-[var(--accent)] hover:shadow-lg'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute right-4 top-4">
                    {banco.status === 'Disponible' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--success-fg)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Disponible
                      </span>
                    )}
                    {banco.status === 'Próximamente' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-panel)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                        Próximamente
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                    <Landmark className="h-8 w-8" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                    {banco.name}
                  </h3>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      Banco
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {banco.description}
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
                  key={banco.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                >
                  {isComingSoon ? (
                    cardContent
                  ) : (
                    <Link href={`/integraciones/${banco.slug}`}>
                      {cardContent}
                    </Link>
                  )}
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

      {/* Products Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              Productos de crédito disponibles
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
              {productos.map((producto, index) => (
                <motion.div
                  key={producto.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.05,
                  }}
                  className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 text-center transition-all hover:border-[var(--border-strong)] hover:shadow-md"
                >
                  <producto.icon className="h-8 w-8 text-[var(--dark-blue)]" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {producto.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ventajas Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              Ventajas para el broker
            </h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {ventajas.map((ventaja, index) => (
                <motion.div
                  key={ventaja.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1,
                  }}
                  className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                    <ventaja.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-[var(--text-primary)]">
                    {ventaja.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {ventaja.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Activa préstamos en tu bot"
        subtitle="Empieza a ofrecer préstamos de múltiples bancos por WhatsApp hoy mismo"
        ctaText="Solicitar Demo"
        ctaHref="/demo"
      />
    </>
  );
}
