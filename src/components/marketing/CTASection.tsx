'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass-card relative overflow-hidden px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Emerald glow background effect */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.25rem]">
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="absolute -bottom-16 left-1/4 h-32 w-64 rounded-full bg-teal-400/10 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              ¿Listo para automatizar{' '}
              <span className="text-gradient-primary">tu correduría</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Únete a cientos de corredores en Latinoamérica que ya venden
              seguros con IA.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/demo"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base"
              >
                Solicitar Demo
                <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
              <a
                href="#precios"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-50/50 px-8 py-3.5 font-heading text-[0.9375rem] font-semibold text-emerald-700 transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-50 hover:shadow-md hover:shadow-emerald-500/10"
              >
                Ver Precios
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
