'use client';

import { motion } from 'framer-motion';

const insurers = [
  'ASSA',
  'MAPFRE',
  'SURA',
  'GNP',
  'Rímac',
  'Allianz',
  'Liberty',
  'Qualitas',
  'Bolívar',
  'Pacífico',
];

const lenders = [
  'Banco General',
  'Banistmo',
  'BAC',
  'Banco Nacional',
  'Caja de Ahorros',
  'Credicorp Bank',
  'Global Bank',
  'Multibank',
  'Scotiabank',
  'Banco Aliado',
];

// Duplicate lists for seamless infinite scroll
const insurerMarquee = [...insurers, ...insurers];
const lenderMarquee = [...lenders, ...lenders];

export function InsurersLogos() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* --- Header --- */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 text-center font-heading text-xl font-semibold text-[var(--text-secondary)]"
        >
          Conectado con las principales aseguradoras y bancos de Latinoamérica
        </motion.p>

        {/* --- Insurers Section --- */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-10 text-center font-heading text-base font-semibold text-[#6b7280]"
          >
            Aseguradoras
          </motion.p>

          {/* --- Marquee --- */}
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex shrink-0 gap-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {insurerMarquee.map((name, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="flex shrink-0 items-center justify-center rounded-[10px] border border-[#e5e7eb] bg-white px-6 py-2.5 transition-all duration-200 hover:bg-[#f3f4f6]"
                  >
                    <span className="font-heading text-sm font-semibold tracking-wide text-[#111827] whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center text-sm text-[#9ca3af]"
          >
            + 30 más en 10 países
          </motion.p>
        </div>

        {/* --- Banks Section --- */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-10 text-center font-heading text-base font-semibold text-[#6b7280]"
          >
            Bancos y Financieras
          </motion.p>

          {/* --- Marquee --- */}
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex shrink-0 gap-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    duration: 35,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {lenderMarquee.map((name, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="flex shrink-0 items-center justify-center rounded-[10px] border border-[#e5e7eb] bg-white px-6 py-2.5 transition-all duration-200 hover:bg-[#f3f4f6]"
                  >
                    <span className="font-heading text-sm font-semibold tracking-wide text-[#111827] whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center text-sm text-[#9ca3af]"
          >
            + 20 más en toda Latinoamérica
          </motion.p>
        </div>
      </div>
    </section>
  );
}
