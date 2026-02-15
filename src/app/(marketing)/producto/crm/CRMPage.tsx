'use client';

import { motion } from 'framer-motion';
import { Users, Inbox, BarChart3, Zap, Filter, Calendar } from 'lucide-react';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

const features = [
  {
    icon: Users,
    title: 'Contactos Centralizados',
    description: 'Todos tus clientes en un solo lugar con historial completo de interacciones.',
  },
  {
    icon: Inbox,
    title: 'Gestión de Oportunidades',
    description: 'Visualiza y organiza leads en diferentes etapas del proceso de venta.',
  },
  {
    icon: BarChart3,
    title: 'Pipeline Inteligente',
    description: 'Conoce exactamente cuánto dinero está en cada etapa de tu funnel.',
  },
  {
    icon: Zap,
    title: 'Automatización Smart',
    description: 'Acciones automáticas basadas en comportamiento del cliente.',
  },
  {
    icon: Filter,
    title: 'Segmentación Avanzada',
    description: 'Agrupa clientes por criterios personalizados para estrategias específicas.',
  },
  {
    icon: Calendar,
    title: 'Seguimiento de Actividades',
    description: 'No pierdas ningún seguimiento importante. Todo programado y recordado.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CRMPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Producto', href: '/producto' }, { label: 'CRM', href: '/producto/crm' }]} />

      <PageHero
        badge="GESTIÓN"
        title="CRM Diseñado para Brokers"
        subtitle="Gestiona todos tus clientes, oportunidades e interacciones en una plataforma centralizada. Nunca pierdas un lead."
      />

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Características Principales
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Todo lo que necesitas para gestionar tu cartera de clientes
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <div className="h-full rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-dark-blue)]">
                    <feature.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Cómo Funciona
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Tu flujo de ventas optimizado
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6"
          >
            {[
              {
                number: '1',
                title: 'Ingresa Clientes',
                description: 'Manualmente o automáticamente desde tus integraciones. El bot también agrega nuevos contactos.',
              },
              {
                number: '2',
                title: 'Organiza en Etapas',
                description: 'Mueve clientes a través de tu pipeline personalizado. Prospecto → Cotización → Cierre.',
              },
              {
                number: '3',
                title: 'Visualiza el Pipeline',
                description: 'Ve cuánto dinero hay en cada etapa y cuáles son tus oportunidades más calientes.',
              },
              {
                number: '4',
                title: 'Automatiza Follow-ups',
                description: 'El CRM te recuerda seguimientos y puede enviar mensajes automáticos.',
              },
              {
                number: '5',
                title: 'Cierra Ventas',
                description: 'Registra clientes nuevos y contratos firmados. El sistema se retroalimenta.',
              },
            ].map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)] font-heading font-bold text-[var(--text-primary)]">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-4">
                  <h3 className="font-heading font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {[
              { value: '100%', label: 'Visibilidad de clientes' },
              { value: '0', label: 'Leads perdidos' },
              { value: '+40%', label: 'Cierre de ventas' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 text-center"
              >
                <div className="font-heading text-4xl font-bold text-[var(--accent)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Gestiona Tu Cartera Inteligentemente"
        subtitle="Transforma tu CRM en tu mejor vendedor"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
