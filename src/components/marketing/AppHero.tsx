'use client';

import { motion } from 'framer-motion';

export function AppHero() {
  return (
    <section className="mx-auto max-w-4xl text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-link)]">
          Plataforma Todo-en-Uno
        </span>

        <h1 className="mt-6 font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)]">
          Tu centro de comando{' '}
          <span className="text-[var(--text-link)]">financiero</span>
        </h1>

        <p className="mt-6 text-xl text-[var(--text-secondary)] leading-relaxed">
          Gestiona seguros, préstamos, conversaciones y clientes desde una
          plataforma moderna. Dashboard en tiempo real, análisis instantáneos, y
          automatización completa.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/demo"
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] border-2 border-[var(--accent)] px-10 py-5 text-xl font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--accent-hover)] hover:scale-[1.02] shadow-[0_4px_24px_rgba(202,255,4,0.25)]"
          >
            Solicitar Demo
          </a>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--border)] bg-[var(--surface-primary)] px-10 py-5 text-lg font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--surface-hover)] hover:border-[var(--accent)]"
          >
            Iniciar Sesión
          </a>
        </div>
      </motion.div>
    </section>
  );
}
