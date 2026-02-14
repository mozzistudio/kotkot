'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function AppCTA() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border)] bg-[var(--surface-primary)] px-8 py-16 text-center sm:px-16 sm:py-24"
        >
          <div>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl leading-[1.1]">
              Empieza a vender más
              <br />
              <span className="text-[var(--text-link)]">hoy mismo</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-[var(--text-secondary)] font-medium leading-relaxed">
              Configura tu cuenta en minutos. Sin tarjeta de crédito requerida.
              Cancela cuando quieras.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <a
                href="/demo"
                className="inline-flex items-center gap-3 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-10 py-5 text-xl font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--accent-hover)] hover:scale-[1.02] shadow-[0_4px_24px_rgba(202,255,4,0.25)]"
              >
                Solicitar Demo Gratis
                <ArrowUpRight className="h-6 w-6" />
              </a>
              <a
                href="/precios"
                className="inline-flex items-center gap-2 text-base font-semibold text-[var(--text-link)] underline underline-offset-4 decoration-2 hover:text-[var(--chart-dot)] transition-colors"
              >
                Ver planes y precios
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
