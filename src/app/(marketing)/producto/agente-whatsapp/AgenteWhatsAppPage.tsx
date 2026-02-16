'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Zap, Clock, Users, TrendingUp, CheckCircle2 } from '@/components/shared/icon-map';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';

const capabilities = [
  {
    icon: MessageCircle,
    title: 'Responde 24/7',
    description: 'Tu bot responde al instante a cualquier hora, incluso cuando duermes.',
  },
  {
    icon: Zap,
    title: 'Cotiza Automáticamente',
    description: 'Genera cotizaciones personalizadas según los criterios del cliente.',
  },
  {
    icon: Clock,
    title: 'Agenda Citas',
    description: 'Coordina reuniones directamente en WhatsApp sin ir y venir de mensajes.',
  },
  {
    icon: Users,
    title: 'Gestiona Conversaciones',
    description: 'Todas tus conversaciones organizadas y categorizadas automáticamente.',
  },
  {
    icon: TrendingUp,
    title: 'Cierra Ventas',
    description: 'Cierra deals automáticamente cuando el cliente está listo para comprar.',
  },
  {
    icon: CheckCircle2,
    title: 'Integrado con tu CRM',
    description: 'Cada conversación se sincroniza automáticamente con tu base de datos.',
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

export function AgenteWhatsAppPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Producto', href: '/producto' }, { label: 'Agente WhatsApp', href: '/producto/agente-whatsapp' }]} />

      <PageHero
        badge="AGENTE IA"
        title="Tu Vendedor 24/7 en WhatsApp"
        subtitle="Un bot inteligente que cotiza, atiende dudas, agenda reuniones y cierra ventas mientras tú haces crecer tu negocio."
      />

      {/* Key Capabilities */}
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
              6 Superpoderes del Bot
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
              Automatiza cada parte de tu flujo de ventas
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map((cap) => (
              <motion.div key={cap.title} variants={itemVariants}>
                <div className="h-full rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-dark-blue)]">
                    <cap.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--text-primary)]">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cap.description}
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
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Así Funciona
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 space-y-6"
          >
            {[
              {
                number: '1',
                title: 'Cliente te escribe en WhatsApp',
                description: 'Tu cliente inicia la conversación con una pregunta sobre seguros o préstamos.',
              },
              {
                number: '2',
                title: 'El Bot entiende y responde',
                description: 'IA analiza la pregunta y responde con información relevante e inmediata.',
              },
              {
                number: '3',
                title: 'Genera una cotización',
                description: 'Si el cliente está interesado, el bot cotiza automáticamente según sus necesidades.',
              },
              {
                number: '4',
                title: 'Agenda o Cierra',
                description: 'Si quiere conocer más detalles, agenda una reunión. Si está listo, cierra la venta.',
              },
              {
                number: '5',
                title: 'Sincroniza con tu CRM',
                description: 'Toda la información se guarda automáticamente en tu base de datos.',
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
              { value: '24/7', label: 'Disponibilidad' },
              { value: '3x', label: 'Más conversiones' },
              { value: '98%', label: 'Satisfacción' },
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
        title="Activa Tu Bot Vendedor Hoy"
        subtitle="Empieza a recibir y responder consultas 24/7 sin levantar un dedo"
        ctaText="Solicitar Demo Gratis"
        ctaHref="/demo"
      />
    </>
  );
}
