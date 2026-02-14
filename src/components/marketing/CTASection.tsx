'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Content */}
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              ¿Listo para automatizar{' '}
              <span className="text-[var(--text-primary)]">tu correduría</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
              Únete a cientos de corredores en Latinoamérica que ya venden
              seguros con IA.
            </p>

            {/* Single primary CTA + secondary */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/demo"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--action-dark-bg)] px-8 py-3.5 text-base font-semibold text-[var(--action-dark-fg)] transition-all duration-200 hover:bg-[var(--action-dark-hover)]"
              >
                Solicitar Demo
                <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
              <a
                href="#precios"
                className="inline-flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--dark-blue)] bg-white px-8 py-3.5 font-heading text-[0.9375rem] font-semibold text-[var(--dark-blue)] transition-all duration-200 hover:bg-[var(--dark-blue-surface)]"
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
