'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { PageHero } from './PageHero';
import { CTABanner } from './CTABanner';
import { Breadcrumb } from './Breadcrumb';
import type { LucideIcon } from 'lucide-react';

interface BeforeAfter {
  before: string[];
  after: string[];
}

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface SolutionPageTemplateProps {
  breadcrumbLabel: string;
  breadcrumbHref: string;
  badge: string;
  title: string;
  subtitle: string;
  painPoint: string;
  beforeAfter: BeforeAfter;
  stats: Stat[];
  ctaTitle: string;
  ctaText?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SolutionPageTemplate({
  breadcrumbLabel,
  breadcrumbHref,
  badge,
  title,
  subtitle,
  painPoint,
  beforeAfter,
  stats,
  ctaTitle,
  ctaText = 'Solicitar demo',
}: SolutionPageTemplateProps) {
  return (
    <>
      <Breadcrumb items={[{ label: 'Soluciones', href: '/soluciones' }, { label: breadcrumbLabel, href: breadcrumbHref }]} />

      <PageHero
        badge={badge}
        title={title}
        subtitle={subtitle}
      />

      {/* Pain point */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[var(--radius-card)] border-2 border-[var(--color-warning)] bg-[var(--color-warning-bg)] p-8 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              El problema
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              {painPoint}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Antes vs Después
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Así cambia tu forma de trabajar
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <X className="h-6 w-6 text-[var(--danger)]" />
                <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                  Antes (sin kotkot)
                </h3>
              </div>
              <ul className="space-y-3">
                {beforeAfter.before.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--danger)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="rounded-[var(--radius-card)] border-2 border-[var(--success)] bg-[var(--color-success-bg)] p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-[var(--success)]" />
                <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                  Después (con kotkot)
                </h3>
              </div>
              <ul className="space-y-3">
                {beforeAfter.after.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6 text-center"
              >
                <stat.icon className="mx-auto h-8 w-8 text-[var(--dark-blue)]" strokeWidth={1.8} />
                <div className="mt-4 font-heading text-3xl font-bold text-[var(--text-primary)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner title={ctaTitle} ctaText={ctaText} />
    </>
  );
}
