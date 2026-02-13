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
    <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
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
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Insurtech Partner
              <span className="inline-block h-px w-10 bg-emerald-400" />
            </span>
          </motion.div>

          {/* Main headline — mixed weights */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 font-heading leading-[1.08] tracking-tight text-slate-900"
          >
            <span className="block text-4xl font-light sm:text-5xl md:text-7xl">
              TU AGENTE DE SEGUROS
            </span>
            <span className="mt-1 block text-4xl font-bold sm:text-5xl md:text-7xl">
              <span className="mr-2">&#10024;</span>INTELIGENTE EN
            </span>
            <span className="mt-1 block text-4xl font-bold text-emerald-500 sm:text-5xl md:text-7xl">
              WHATSAPP
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Automatiza tu correduría con IA. Cotiza seguros de auto, salud, vida y más en segundos.
            Compara 10+ aseguradoras y cierra ventas 24/7 por WhatsApp.
          </motion.p>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">2 min</div>
                <div className="text-xs text-slate-500">Cotización promedio</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <span className="text-xl">🏢</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">10+</div>
                <div className="text-xs text-slate-500">Aseguradoras</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-xs text-slate-500">Automatización</div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <a
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110 active:brightness-95"
            >
              Solicitar Demo
              <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/seguros"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-200 hover:border-emerald-500 hover:text-emerald-600"
            >
              Ver Seguros
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
