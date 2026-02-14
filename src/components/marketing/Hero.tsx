'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
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
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(12,30,53,0.08)] border border-[rgba(12,30,53,0.15)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0C1E35]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0C1E35]" />
              Insurtech para corredores
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 font-heading leading-[1.05] tracking-tight"
          >
            <span className="block text-[2.5rem] font-medium text-[#6b7280] sm:text-5xl lg:text-[3.5rem]">
              Tu agente de seguros
            </span>
            <span className="block text-[2.5rem] font-bold text-[#111827] sm:text-5xl lg:text-[3.5rem]">
              inteligente en
            </span>
            <span className="relative inline-block text-[2.5rem] font-bold text-[#111827] sm:text-5xl lg:text-[3.5rem]">
              WhatsApp
              <span className="absolute -bottom-1 left-0 h-3 w-full bg-[#CAFF04] -z-10 rounded-sm" />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[#6b7280]"
          >
            Automatiza tu correduría con IA. Cotiza, compara 10+ aseguradoras
            y cierra ventas 24/7 directamente por WhatsApp.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-[10px] bg-[#0C1E35] px-7 py-3.5 text-base font-semibold text-white transition-all duration-150 hover:bg-[#122B47] hover:shadow-lg hover:shadow-[rgba(12,30,53,0.25)]"
            >
              Solicitar Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/seguros"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#0C1E35] bg-white px-7 py-3.5 text-base font-semibold text-[#0C1E35] transition-all duration-150 hover:bg-[rgba(12,30,53,0.06)]"
            >
              <Play className="h-4 w-4" />
              Ver Seguros
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-2">
              {['JP', 'MR', 'AL', 'SC'].map((initials, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f3f4f6] text-[10px] font-bold text-[#111827]"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#6b7280]">
                Usado por <span className="font-semibold text-[#111827]">500+</span> corredores
              </span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-8 border-t border-[#e5e7eb] pt-8"
          >
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#111827]">2 min</div>
              <div className="text-xs text-[#9ca3af]">Cotización promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#111827]">10+</div>
              <div className="text-xs text-[#9ca3af]">Aseguradoras</div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-[#111827]">24/7</div>
              <div className="text-xs text-[#9ca3af]">Automatización</div>
            </div>
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
