'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '10+', label: 'Países en LATAM' },
  { value: '98%', label: 'Satisfacción' },
  { value: '24/7', label: 'Agente IA Activo' },
  { value: '< 3s', label: 'Tiempo de Cotización' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="px-4 py-16 sm:py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            className="flex flex-col items-center justify-center rounded-[16px] border border-[#e5e7eb] bg-white px-6 py-8 text-center transition-all duration-200 hover:bg-[rgba(12,30,53,0.06)]"
          >
            <span className="font-data text-4xl font-bold tracking-tight text-[#0C1E35]">
              {stat.value}
            </span>
            <span className="mt-2 text-sm font-medium text-[#6b7280]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
