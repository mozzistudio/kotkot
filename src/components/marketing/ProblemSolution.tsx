'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Clock, TrendingUp } from '@/components/shared/icon-map';

interface PainPoint {
  title: string;
  detail: string;
}

interface SolutionPoint {
  title: string;
  detail: string;
}

const painPoints: PainPoint[] = [
  {
    title: 'Cotizas en 5 portales diferentes',
    detail: '30 min por cotización, errores de copy-paste',
  },
  {
    title: 'Pierdes clientes fuera de horario',
    detail: '40% de consultas llegan después de las 8pm',
  },
  {
    title: 'Excel para todo',
    detail: 'Clientes, pólizas, comisiones — todo manual',
  },
  {
    title: 'Cobras persiguiendo al cliente',
    detail: '3 llamadas promedio para cobrar una prima',
  },
  {
    title: 'Un solo vertical',
    detail: 'Vendes seguros o préstamos, nunca los dos',
  },
];

const solutionPoints: SolutionPoint[] = [
  {
    title: 'Tu bot cotiza 25+ opciones en segundos',
    detail: 'Cotización simultánea en todas tus aseguradoras',
  },
  {
    title: 'Vendes a las 3am sin estar despierto',
    detail: 'Agente IA responde 24/7, 365 días al año',
  },
  {
    title: 'CRM que se llena solo',
    detail: 'Cada conversación = un lead con historial completo',
  },
  {
    title: 'Cobro automático al instante',
    detail: 'Link de pago enviado con la cotización',
  },
  {
    title: 'Multi-producto activado',
    detail: 'Seguros + préstamos con un solo bot, doble comisión',
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ProblemSolution() {
  return (
    <section className="relative bg-white px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Tu correduría, antes y después de{' '}
            <span className="text-[var(--dark-blue)]">kotkot</span>
          </h2>
        </motion.div>

        {/* --- Before/After Cards --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Left Card — "Sin kotkot" (Pain) */}
          <motion.div
            variants={cardVariants}
            className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-dashed border-gray-300 bg-gray-50 p-8"
          >
            {/* Top accent line */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gray-300" />

            {/* Header */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-gray-500">
                Sin kotkot
              </h3>
              <p className="mt-1 text-sm text-gray-400">El día a día manual</p>
            </div>

            {/* Pain points */}
            <motion.ul
              variants={containerVariants}
              className="mb-8 flex-1 space-y-5"
            >
              {painPoints.map((point, index) => (
                <motion.li
                  key={point.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="font-medium leading-relaxed text-gray-700">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-400">{point.detail}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom summary */}
            <div className="mt-auto rounded-lg bg-red-50 p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2} />
                <p className="text-sm font-semibold text-red-500">
                  ~4 horas/día en tareas que no generan ingresos
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Card — "Con kotkot" (Solution) */}
          <motion.div
            variants={cardVariantsRight}
            className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-white p-8 shadow-lg"
          >
            {/* Top accent line */}
            <div className="absolute left-0 top-0 h-1 w-full bg-[var(--accent)]" />

            {/* Header */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                Con kotkot
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Automatización que multiplica resultados
              </p>
            </div>

            {/* Solution points */}
            <motion.ul
              variants={containerVariants}
              className="mb-8 flex-1 space-y-5"
            >
              {solutionPoints.map((point, index) => (
                <motion.li
                  key={point.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="font-medium leading-relaxed text-[var(--text-primary)]">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                      {point.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom summary */}
            <div
              className="mt-auto rounded-lg p-3"
              style={{
                backgroundColor: 'rgba(202, 255, 4, 0.1)',
              }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp
                  className="h-4 w-4 shrink-0"
                  style={{ color: 'var(--accent)' }}
                  strokeWidth={2}
                />
                <p className="text-sm font-semibold" style={{ color: 'var(--dark-blue)' }}>
                  3x más ventas con la mitad del esfuerzo
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
