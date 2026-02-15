'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  children?: ReactNode;
}

export function PageHero({
  badge,
  title,
  subtitle,
  ctaText = 'Solicitar Demo',
  ctaHref = '/demo',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-info-bg)] to-transparent px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-6 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--dark-blue)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-heading text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--dark-blue)] sm:text-[48px] lg:text-[56px]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
          >
            {subtitle}
          </motion.p>

          {ctaText && ctaHref && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="mt-8 flex justify-center"
            >
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-base font-bold text-[var(--text-primary)] transition-all duration-150 hover:bg-[var(--accent-hover)] hover:scale-[1.02] shadow-[0_4px_16px_rgba(202,255,4,0.25)]"
              >
                {ctaText}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
