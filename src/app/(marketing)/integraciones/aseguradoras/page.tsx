'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { motion } from 'framer-motion';
import {
  Building2,
  ArrowRight,
  Car,
  Heart,
  Shield,
  Home,
  Briefcase,
  Plane,
  AlertCircle,
  Users,
  Check
} from '@/components/shared/icon-map';
import Link from 'next/link';

interface Integration {
  name: string;
  slug: string;
  description: string;
  status: 'Disponible' | 'Próximamente';
}

const aseguradoras: Integration[] = [
  {
    name: 'ASSA',
    slug: 'assa',
    description: 'Seguros de auto, salud, vida, hogar y empresarial',
    status: 'Disponible',
  },
  {
    name: 'MAPFRE',
    slug: 'mapfre',
    description: 'Seguros generales y de vida en toda Latinoamérica',
    status: 'Disponible',
  },
  {
    name: 'SURA',
    slug: 'sura',
    description: 'Seguros, ARL y soluciones financieras',
    status: 'Disponible',
  },
  {
    name: 'Allianz',
    slug: 'allianz',
    description: 'Seguros globales con presencia en LATAM',
    status: 'Disponible',
  },
  {
    name: 'Liberty',
    slug: 'liberty',
    description: 'Seguros de auto y hogar',
    status: 'Disponible',
  },
  {
    name: 'Qualitas',
    slug: 'qualitas',
    description: 'Especialistas en seguro de auto',
    status: 'Disponible',
  },
  {
    name: 'GNP',
    slug: 'gnp',
    description: 'Seguros de vida, auto, salud y empresariales',
    status: 'Próximamente',
  },
  {
    name: 'Rímac',
    slug: 'rimac',
    description: 'Líder en seguros en Perú',
    status: 'Próximamente',
  },
  {
    name: 'Bolívar',
    slug: 'bolivar',
    description: 'Seguros y capitalización en Colombia',
    status: 'Próximamente',
  },
  {
    name: 'Pacífico',
    slug: 'pacifico',
    description: 'Seguros de salud y vida en Perú',
    status: 'Próximamente',
  },
];

const productos = [
  { icon: Car, label: 'Auto' },
  { icon: Heart, label: 'Salud' },
  { icon: Shield, label: 'Vida' },
  { icon: Home, label: 'Hogar' },
  { icon: Briefcase, label: 'Empresarial' },
  { icon: Plane, label: 'Viaje' },
  { icon: AlertCircle, label: 'Responsabilidad Civil' },
  { icon: Users, label: 'Accidentes Personales' },
];

const steps = [
  {
    title: 'Conecta credenciales',
    description: 'Ingresa tus API keys o credenciales de cada aseguradora en el dashboard de kotkot.',
  },
  {
    title: 'Configura productos',
    description: 'Selecciona qué tipos de seguros quieres que tu bot ofrezca automáticamente.',
  },
  {
    title: 'Tu bot cotiza automáticamente',
    description: 'Tu agente IA consulta precios en tiempo real y cierra ventas 24/7 por WhatsApp.',
  },
];

export default function AseguradorasPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Integraciones', href: '/integraciones' },
          { label: 'Aseguradoras', href: '' },
        ]}
      />

      <PageHero
        badge="Aseguradoras"
        title="25+ Aseguradoras Conectadas a tu Bot"
        subtitle="Tu agente IA cotiza en tiempo real con las principales aseguradoras de Latinoamérica. Sin portales, sin esperas, sin errores."
      />

      {/* Integration Cards Grid */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aseguradoras.map((aseguradora, index) => {
              const isComingSoon = aseguradora.status === 'Próximamente';

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
                    {aseguradora.status === 'Disponible' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--success-fg)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                        Disponible
                      </span>
                    )}
                    {aseguradora.status === 'Próximamente' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-panel)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                        Próximamente
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                    <Building2 className="h-8 w-8" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)]">
                    {aseguradora.name}
                  </h3>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="inline-block rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Aseguradora
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {aseguradora.description}
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
                  key={aseguradora.slug}
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
                    <Link href={`/integraciones/${aseguradora.slug}`}>
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
              Productos que tu bot puede cotizar
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
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

      <CTABanner
        title="Conecta tus aseguradoras en minutos"
        subtitle="Empieza a cotizar seguros en tiempo real con tu bot de WhatsApp hoy mismo"
        ctaText="Solicitar Demo"
        ctaHref="/demo"
      />
    </>
  );
}
