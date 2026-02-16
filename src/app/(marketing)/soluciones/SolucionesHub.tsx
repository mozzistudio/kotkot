'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, FileText, Users, CreditCard, TrendingUp, Package } from '@/components/shared/icon-map';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

interface SolutionFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  problem: string;
}

const solutions: SolutionFeature[] = [
  {
    icon: MessageCircle,
    title: 'Vender por WhatsApp',
    description: 'Convierte WhatsApp en tu mejor vendedor. Bot que responde 24/7, cotiza y cierra automáticamente.',
    href: '/soluciones/vender-por-whatsapp',
    problem: 'Pierdes ventas por no estar disponible 24/7',
  },
  {
    icon: FileText,
    title: 'Automatizar Cotizaciones',
    description: 'Genera cotizaciones en segundos de múltiples aseguradoras. Envía propuestas profesionales al instante.',
    href: '/soluciones/automatizar-cotizaciones',
    problem: 'Cotizaciones manuales consumen horas',
  },
  {
    icon: Users,
    title: 'Gestionar Clientes',
    description: 'Centraliza toda tu cartera. Pipeline inteligente, historial completo, nunca pierdas un lead.',
    href: '/soluciones/gestionar-clientes',
    problem: 'Clientes dispersos en Excel, WhatsApp y correos',
  },
  {
    icon: CreditCard,
    title: 'Cobro Automático',
    description: 'Procesa pagos en WhatsApp. Múltiples métodos, seguridad garantizada, dinero al instante.',
    href: '/soluciones/cobro-automatico',
    problem: 'Perseguir pagos consume tiempo valioso',
  },
  {
    icon: TrendingUp,
    title: 'Escalar sin Equipo',
    description: 'Automatiza todo tu flujo. Atiende más clientes sin contratar personal adicional.',
    href: '/soluciones/escalar-sin-equipo',
    problem: 'Crecer requiere contratar más gente (presupuesto limitado)',
  },
  {
    icon: Package,
    title: 'Multi-Producto',
    description: 'Vende múltiples productos con el mismo flujo. Seguros, préstamos, servicios financieros.',
    href: '/soluciones/multi-producto',
    problem: 'Cada producto requiere proceso diferente',
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

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function SolucionesHub() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Soluciones', href: '/soluciones' }]} />

      <PageHero
        badge="SOLUCIONES"
        title="Un Problema, Una Solución"
        subtitle="Descubre cómo kotkot.ai resuelve los retos más comunes de brokers de seguros y préstamos en Latinoamérica."
      />

      {/* Solutions Grid */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {solutions.map((solution) => (
              <motion.div key={solution.href} variants={itemVariants}>
                <Link href={solution.href} className="group">
                  <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10">
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-dark-blue)] transition-transform duration-300 group-hover:scale-110">
                      <solution.icon className="h-6 w-6 text-[var(--accent)]" />
                    </div>

                    {/* Problem Badge */}
                    <div className="mb-3 inline-flex rounded-full bg-[var(--color-warning-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-warning)]">
                      {solution.problem.split(' ').slice(0, 2).join(' ')}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--dark-blue)]">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Problem Statement */}
                    <p className="mt-4 text-xs text-[var(--color-warning)]">
                      {solution.problem}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-transform duration-300 group-hover:gap-3">
                      Ver solución
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Accent gradient */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[var(--accent)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why kotkot */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Por qué Elegir kotkot.ai
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              No solo ofrecemos herramientas, ofrecemos soluciones diseñadas específicamente para el modelo de negocio de brokers latinoamericanos.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-4 sm:grid-cols-2"
          >
            {[
              'IA entrenada en miles de interacciones de brokers',
              'Integración con aseguradoras locales de Latinoamérica',
              'Soporte en español, en tu zona horaria',
              'Modelos de precios diseñados para brokers',
              'Sin contrato de larga duración',
              'Implementación en menos de 48 horas',
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <svg className="h-5 w-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[var(--text-secondary)]">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Resuelve tu Problema Hoy"
        subtitle="Miles de brokers en Latinoamérica ya están escalando con kotkot.ai"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
