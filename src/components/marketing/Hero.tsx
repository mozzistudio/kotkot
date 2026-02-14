'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import WhatsAppMockup from './WhatsAppMockup';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mockupVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-52 lg:pb-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* --- Left: Text Content --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start lg:col-span-6"
        >
          {/* Tag line */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-link)]">
              Plataforma Financiera IA
              <span className="inline-block h-px w-10 bg-[var(--accent)]" />
            </span>
          </motion.div>

          {/* Main headline — Redesigned for punch */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-heading leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
          >
            <span className="block text-5xl font-extrabold sm:text-6xl md:text-[5rem] lg:text-[6rem]">
              Tu agente financiero
            </span>
            <span className="mt-2 block text-5xl font-extrabold sm:text-6xl md:text-[5rem] lg:text-[6rem]">
              <span className="text-[var(--text-link)]">inteligente</span> en WhatsApp
            </span>
          </motion.h1>

          {/* Sub-headline — Shortened for impact */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-xl leading-relaxed text-[var(--text-secondary)] sm:text-2xl font-medium"
          >
            Compara seguros y préstamos en minutos. Conecta 10+ aseguradoras y 15+ bancos. Cierra ventas 24/7 con IA.
          </motion.p>

          {/* Stats — Token-based */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-input)] bg-[var(--accent-light)]">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--text-primary)]">2 min</div>
                <div className="text-sm text-[var(--text-secondary)] font-medium">Cotización promedio</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-input)] bg-[var(--accent-light)]">
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--text-primary)]">25+</div>
                <div className="text-sm text-[var(--text-secondary)] font-medium">Partners Financieros</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-input)] bg-[var(--accent-light)]">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--text-primary)]">24/7</div>
                <div className="text-sm text-[var(--text-secondary)] font-medium">Automatización</div>
              </div>
            </div>
          </motion.div>

          {/* CTA — Single primary focus */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/demo"
              className="group inline-flex items-center gap-3 rounded-[var(--radius-button)] bg-[var(--accent)] border-2 border-[var(--accent)] px-10 py-5 text-xl font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--accent-hover)] hover:scale-[1.02] shadow-[0_4px_24px_rgba(202,255,4,0.25)]"
            >
              Solicitar Demo Gratis
              <ArrowUpRight className="h-6 w-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <a
              href="/seguros"
              className="inline-flex items-center gap-2 text-base font-semibold text-[var(--text-link)] underline underline-offset-4 decoration-2 hover:text-[var(--chart-dot)] transition-colors duration-150"
            >
              Ver productos disponibles
            </a>
          </motion.div>
        </motion.div>

        {/* --- Right: WhatsApp Mockup --- */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center lg:col-span-6"
        >
          <WhatsAppMockup />
        </motion.div>
      </div>
    </section>
  );
}
