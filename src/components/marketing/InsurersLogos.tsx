'use client';

import { motion } from 'framer-motion';

// Row 1: Insurers (scrolls LEFT)
const insurers = [
  'ASSA',
  'MAPFRE',
  'SURA',
  'Allianz',
  'Liberty',
  'Qualitas',
  'GNP',
  'Rímac',
  'Bolívar',
  'Pacífico',
  'Nacional Seguros',
  'Banesco Seguros',
  'La Positiva',
];

// Row 2: Banks + Payment platforms (scrolls RIGHT)
const financials = [
  'BAC',
  'Banco General',
  'Banistmo',
  'Scotiabank',
  'Multibank',
  'Global Bank',
  'Caja de Ahorros',
  'Credicorp Bank',
  'Banco Nacional',
  'Banco Aliado',
  'Yappy',
  'Stripe',
];

// Duplicate for seamless infinite scroll
const insurerMarquee = [...insurers, ...insurers];
const financialMarquee = [...financials, ...financials];

export function InsurersLogos() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-panel)] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
            Conectado con las principales aseguradoras y bancos de Latinoamérica
          </h2>
        </motion.div>

        {/* --- Marquee Rows --- */}
        <div className="space-y-6">
          {/* Row 1: Insurers (scrolling LEFT) */}
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--surface-panel)] to-transparent sm:w-32"
              style={{
                maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--surface-panel)] to-transparent sm:w-32"
              style={{
                maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
              }}
            />

            {/* Marquee track */}
            <div className="marquee-container group">
              <motion.div
                className="flex gap-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    duration: 45,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {insurerMarquee.map((name, index) => (
                  <div
                    key={`insurer-${name}-${index}`}
                    className="flex min-w-[140px] shrink-0 items-center justify-center rounded-xl border border-[var(--border-default)] bg-white px-6 py-3 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[var(--accent)] hover:shadow-md"
                  >
                    <span className="whitespace-nowrap font-heading text-sm font-semibold text-[var(--text-primary)]">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Row 2: Financials (scrolling RIGHT) */}
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--surface-panel)] to-transparent sm:w-32"
              style={{
                maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--surface-panel)] to-transparent sm:w-32"
              style={{
                maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
              }}
            />

            {/* Marquee track */}
            <div className="marquee-container group">
              <motion.div
                className="flex gap-4"
                animate={{ x: ['-50%', '0%'] }}
                transition={{
                  x: {
                    duration: 45,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                {financialMarquee.map((name, index) => (
                  <div
                    key={`financial-${name}-${index}`}
                    className="flex min-w-[140px] shrink-0 items-center justify-center rounded-xl border border-[var(--border-default)] bg-white px-6 py-3 shadow-sm transition-all duration-200 hover:scale-105 hover:border-[var(--accent)] hover:shadow-md"
                  >
                    <span className="whitespace-nowrap font-heading text-sm font-semibold text-[var(--text-primary)]">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Footer Text --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-sm text-[var(--text-muted)]"
        >
          25+ aseguradoras y 15+ bancos en 10 países
        </motion.p>
      </div>
    </section>
  );
}
