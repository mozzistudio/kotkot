'use client';

import { motion } from 'framer-motion';
import { CreditCard, Shield, Zap, Globe, Lock, TrendingUp } from 'lucide-react';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

const features = [
  {
    icon: CreditCard,
    title: 'Múltiples Métodos de Pago',
    description: 'Tarjetas de crédito, transferencias, billeteras digitales, y más.',
  },
  {
    icon: Shield,
    title: 'Seguridad PCI Compliant',
    description: 'Todos los pagos encriptados y conformes con estándares internacionales.',
  },
  {
    icon: Zap,
    title: 'Cobros Instantáneos',
    description: 'Los pagos se procesan en segundos. Dinero en tu cuenta al instante.',
  },
  {
    icon: Globe,
    title: 'Multi-país',
    description: 'Acepta pagos desde clientes en toda Latinoamérica.',
  },
  {
    icon: Lock,
    title: 'Fraud Detection',
    description: 'IA detecta y previene fraudes automáticamente.',
  },
  {
    icon: TrendingUp,
    title: 'Reportes de Ingresos',
    description: 'Visualiza todas tus transacciones y tendencias de ingresos.',
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

export function CobrosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Producto', href: '/producto' }, { label: 'Cobros', href: '/producto/cobros' }]} />

      <PageHero
        badge="PAGOS"
        title="Sistema de Cobros Todo en Uno"
        subtitle="Procesa pagos de seguros, préstamos y servicios en una plataforma segura y confiable. Múltiples métodos, una solución."
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
              Procesa pagos sin complicaciones
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

      {/* Supported Payment Methods */}
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
              Métodos Soportados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Dale a tus clientes flexibilidad para pagar
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              { name: 'Tarjetas de Crédito', icon: '💳' },
              { name: 'Tarjetas de Débito', icon: '💳' },
              { name: 'Transferencias ACH', icon: '🏦' },
              { name: 'Billetera Digital (Yappy)', icon: '📱' },
              { name: 'Transferencia Bancaria', icon: '🏦' },
              { name: 'Efectivo contra Entrega', icon: '💵' },
            ].map((method, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 flex items-center gap-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div>
                    <p className="font-heading font-semibold text-[var(--text-primary)]">
                      {method.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payment Flow */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              El Flujo de Pago
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Rápido, seguro y automático
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
              { number: '1', title: 'Cliente recibe enlace de pago', description: 'Por WhatsApp, email o SMS directamente desde el bot.' },
              { number: '2', title: 'Selecciona método de pago', description: 'Elige el que prefieras. Todos disponibles en un click.' },
              { number: '3', title: 'Confirma información', description: 'Verifica detalles de la transacción y autoriza.' },
              { number: '4', title: 'Procesamos al instante', description: 'Nuestro sistema procesa el pago con máxima seguridad.' },
              { number: '5', title: 'Confirmación automática', description: 'Cliente recibe recibo. Tú ves el dinero en tu cuenta.' },
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
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {[
              { value: '< 2s', label: 'Tiempo de procesamiento' },
              { value: '99.99%', label: 'Uptime del sistema' },
              { value: '$0', label: 'Costo de configuración' },
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
        title="Empieza a Cobrar Hoy"
        subtitle="Configura tu sistema de pagos en minutos"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
