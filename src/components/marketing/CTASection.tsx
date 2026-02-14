'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          <div>
            <h2 className="font-heading text-[var(--type-heading-lg)] font-bold tracking-tight text-[var(--color-text-primary)] sm:text-[var(--type-display-sm)]">
              ¿Listo para automatizar{' '}
              <span className="text-[var(--color-text-primary)]">tu correduría</span>?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[var(--type-body-md)] text-[var(--color-text-secondary)]">
              Únete a cientos de corredores en Latinoamérica que ya venden
              seguros con IA.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/demo"
                size="lg"
                className="bg-[var(--color-action-dark-bg)] text-[var(--color-action-dark-fg)] hover:bg-[var(--color-action-dark-hover)]"
                arrow
              >
                Solicitar Demo
              </Button>
              <Button
                href="#precios"
                variant="secondary"
                size="lg"
                className="border-[var(--color-info-fg)] text-[var(--color-info-fg)] hover:bg-[var(--color-info-bg)]"
              >
                Ver Precios
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
