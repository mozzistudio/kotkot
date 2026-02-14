'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  Plug,
  CreditCard,
  BarChart3,
  Palette,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    title: 'Agente IA en WhatsApp',
    description:
      'Tu bot cotiza, compara y vende seguros directamente en WhatsApp. Sin intervención humana.',
  },
  {
    icon: Plug,
    title: 'Conecta tus Aseguradoras',
    description:
      'Conecta los APIs de tus aseguradoras. Cotización en tiempo real con tus propias credenciales.',
  },
  {
    icon: CreditCard,
    title: 'Cobro Automático',
    description:
      'Genera links de pago automáticamente. Yappy en Panamá, Stripe en toda Latinoamérica. El dinero llega directo a tu cuenta.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Inteligente',
    description:
      'Conversaciones, cotizaciones, clientes, pólizas y comisiones. Todo en un solo lugar.',
  },
  {
    icon: Palette,
    title: 'Personaliza tu Agente',
    description:
      'Configura el nombre, tono, idioma y personalidad de tu bot. Tu marca, tu voz.',
  },
  {
    icon: Users,
    title: 'CRM Automático',
    description:
      'Cada conversación crea un lead. Seguimiento automático, recordatorios de renovación, cross-sell.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Features() {
  return (
    <section id="funcionalidades" className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Todo lo que tu correduría{' '}
            <span className="text-[var(--text-primary)]">necesita</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Una plataforma completa para automatizar tu negocio de seguros en
            cualquier país de Latinoamérica.
          </p>
        </motion.div>

        {/* --- Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group cursor-default rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-hover)]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-info-bg)]">
                <feature.icon className="h-6 w-6 text-[var(--dark-blue)]" strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
