'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const painPoints = [
  'Cotizas manualmente en 5 portales diferentes',
  'Pierdes clientes que escriben fuera de horario',
  'Excel para tracking de clientes y comisiones',
  'Cobras persiguiendo al cliente por días',
];

const solutions = [
  'Tu bot cotiza 25+ opciones en segundos',
  'Vendes a las 3am sin estar despierto',
  'CRM automático con cada conversación',
  'Link de pago enviado al instante',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export function ProblemSolution() {
  return (
    <section id="como-funciona" className="relative px-4 py-16 sm:py-24 bg-[var(--surface-panel)]">
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
            La diferencia es <span className="text-[var(--dark-blue)]">abismal</span>
          </h2>
        </motion.div>

        {/* --- Split Layout --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* Left: Without kotkot (Pain) */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-8"
          >
            <div className="mb-6">
              <h3 className="font-heading text-2xl font-bold text-[var(--text-secondary)]">
                Sin kotkot
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                El día a día de un corredor tradicional
              </p>
            </div>

            <ul className="space-y-4">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-danger-bg)]">
                    <X className="h-3.5 w-3.5 text-[var(--danger-fg)]" strokeWidth={3} />
                  </div>
                  <span className="text-base leading-relaxed text-[var(--text-secondary)] line-through opacity-60">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: With kotkot (Solution) */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-gradient-to-br from-white to-[var(--accent-light)] p-8 shadow-[0_8px_32px_rgba(202,255,4,0.15)]"
          >
            <div className="mb-6">
              <h3 className="font-heading text-2xl font-bold text-[var(--dark-blue)]">
                Con kotkot
              </h3>
              <p className="mt-2 text-sm font-semibold text-[var(--dark-blue)]">
                Automatización que multiplica resultados
              </p>
            </div>

            <ul className="space-y-4">
              {solutions.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success-bg)]">
                    <Check className="h-3.5 w-3.5 text-[var(--success-fg)]" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium leading-relaxed text-[var(--text-primary)]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Accent decoration */}
            <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
