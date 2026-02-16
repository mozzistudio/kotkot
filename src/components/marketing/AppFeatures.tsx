'use client';

import { motion } from 'framer-motion';
import { BarChart3, Zap, Shield } from '@/components/shared/icon-map';

const appFeatures = [
  {
    icon: BarChart3,
    title: 'Analytics en Tiempo Real',
    description:
      'Dashboards interactivos con métricas de conversión, productos top y rendimiento del bot.',
  },
  {
    icon: Zap,
    title: 'Acceso desde Cualquier Lugar',
    description:
      'Responsive design. Accede desde desktop, tablet o móvil sin perder funcionalidad.',
  },
  {
    icon: Shield,
    title: 'Seguro y Confiable',
    description:
      'Datos encriptados, backups automáticos y uptime del 99.9%. Tu información siempre protegida.',
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

export function AppFeatures() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl leading-[1.1]">
            Potente, rápido y{' '}
            <span className="text-[var(--text-link)]">confiable</span>
          </h2>
          <p className="mt-6 text-xl text-[var(--text-secondary)] font-medium leading-relaxed">
            Una plataforma diseñada para brokers modernos que valoran su tiempo.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {appFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group cursor-default rounded-[var(--radius-card)] border-2 border-[var(--border)] bg-[var(--surface-primary)] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_8px_32px_rgba(202,255,4,0.15)]"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[var(--radius-input)] bg-[var(--accent-light)]">
                <feature.icon
                  className="h-7 w-7 text-[var(--text-primary)]"
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
