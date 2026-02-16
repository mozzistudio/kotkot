'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from '@/components/shared/icon-map';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTABanner({
  title,
  subtitle = 'Únete a cientos de brokers en Latinoamérica que cierran ventas 24/7 con IA',
  ctaText = 'Solicitar Demo Gratis',
  ctaHref = '/demo',
}: CTABannerProps) {
  return (
    <section className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-[var(--surface-page)] px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Content */}
          <div className="relative">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl leading-[1.1]">
              {title}
            </h2>

            {subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-3 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--accent-hover)] hover:scale-[1.02] shadow-[0_4px_20px_rgba(202,255,4,0.25)]"
              >
                {ctaText}
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>

            {/* Accent decoration */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-[var(--dark-blue)] opacity-5 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
