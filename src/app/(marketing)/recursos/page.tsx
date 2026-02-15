'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, GraduationCap, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Guías y Ebooks',
    description: 'Aprende a automatizar y escalar tu correduría con nuestras guías prácticas',
    href: '/recursos/guias',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Glosario',
    description: 'Términos clave de seguros, préstamos y automatización explicados claramente',
    href: '/recursos/glosario',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    title: 'Calculadora de ROI',
    description: 'Descubre cuánto más puedes ganar automatizando tu correduría',
    href: '/recursos/calculadora-roi',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: 'Webinars',
    description: 'Sesiones en vivo sobre automatización y mejores prácticas',
    href: '/recursos/webinars',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function RecursosPage() {
  return (
    <>
      <PageHero
        badge="Recursos"
        title="Recursos para Brokers Financieros"
        subtitle="Guías, herramientas y contenido para automatizar y escalar tu negocio de seguros y préstamos"
        ctaText="Ver Calculadora ROI"
        ctaHref="/recursos/calculadora-roi"
      />

      {/* Resources Grid */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
              >
                <Link href={resource.href}>
                  <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-8 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-2xl">
                    {/* Icon with gradient background */}
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${resource.color} text-white shadow-lg`}>
                      {resource.icon}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-heading text-2xl font-bold text-[var(--text-primary)]">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">
                      {resource.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)] transition-all group-hover:gap-3">
                      Explorar
                      <ArrowRight className="h-4 w-4" />
                    </div>

                    {/* Hover decoration */}
                    <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[var(--accent)] opacity-0 blur-2xl transition-opacity group-hover:opacity-10" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Link Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-[var(--text-primary)]">
              ¿Buscas más contenido?
            </h2>
            <p className="mb-8 text-lg text-[var(--text-secondary)]">
              Visita nuestro blog para artículos, casos de estudio y tendencias de insurtech
            </p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--dark-blue)] bg-[var(--dark-blue)] px-6 py-3 font-semibold text-white transition-all hover:bg-[var(--dark-blue-light)]"
            >
              Ir al Blog
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="¿Listo para automatizar tu correduría?"
        subtitle="Agenda una demo y descubre cómo kotkot puede transformar tu negocio"
      />
    </>
  );
}
