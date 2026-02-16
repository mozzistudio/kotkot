'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Database, BarChart3, CreditCard, Zap } from '@/components/shared/icon-map';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

interface ProductoFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const productFeatures: ProductoFeature[] = [
  {
    icon: MessageCircle,
    title: 'Agente WhatsApp',
    description: 'Bot de IA que responde 24/7 en WhatsApp. Cotiza, atiende dudas y cierra ventas automáticamente.',
    href: '/producto/agente-whatsapp',
    badge: 'Más popular',
  },
  {
    icon: Database,
    title: 'CRM Inteligente',
    description: 'Gestiona clientes, historial de interacciones y oportunidades de venta en un solo lugar.',
    href: '/producto/crm',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description: 'Visualiza métricas en tiempo real. Conversiones, ingresos, satisfacción y más.',
    href: '/producto/dashboard',
  },
  {
    icon: CreditCard,
    title: 'Sistema de Cobros',
    description: 'Procesa pagos de seguros y préstamos con múltiples métodos. Automatiza el flujo completo.',
    href: '/producto/cobros',
  },
  {
    icon: Zap,
    title: 'Integraciones',
    description: 'Conecta con aseguradoras, bancos y plataformas de pago que ya usas.',
    href: '/producto/integraciones',
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

export function ProductoHub() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Producto', href: '/producto' }]} />

      <PageHero
        badge="PLATAFORMA COMPLETA"
        title="Todo lo que necesitas para vender más"
        subtitle="Agente IA, CRM, pagos y analytics en una sola plataforma. Diseñado para brokers de seguros y préstamos."
      />

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productFeatures.map((feature) => (
              <motion.div key={feature.href} variants={itemVariants}>
                <Link href={feature.href} className="group">
                  <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10">
                    {/* Icon */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-[var(--color-dark-blue)] p-2.5 transition-transform duration-300 group-hover:scale-110">
                        <feature.icon className="h-5 w-5 text-[var(--accent)]" />
                      </div>
                      {feature.badge && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                          {feature.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--dark-blue)]">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-transform duration-300 group-hover:gap-3">
                      Explorar
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

      {/* Features Highlight */}
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
              Una plataforma, infinitas posibilidades
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              Integra todas tus operaciones en un solo lugar. IA que aprende tus procesos, automatización que escala con tu negocio, y analytics que te muestran dónde está el dinero.
            </p>
          </motion.div>

          {/* Feature Bullets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-4 sm:grid-cols-2"
          >
            {[
              'IA que aprende tu forma de vender',
              'Automatización de procesos 24/7',
              'Conecta con tus sistemas actuales',
              'Reportes y insights en tiempo real',
              'Soporte dedicado para tu equipo',
              'Escalabilidad sin límites de usuarios',
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
        title="Automatiza tu Brokerage Hoy"
        subtitle="Únete a cientos de brokers que cierran ventas 24/7 con kotkot.ai"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
