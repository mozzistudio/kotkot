'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from '@/components/shared/icon-map';

const guides = [
  {
    title: 'Cómo automatizar tu correduría en 2026',
    description:
      'Guía completa sobre cómo implementar automatización en tu negocio de seguros y préstamos. Incluye casos de estudio, pasos prácticos y ROI esperado.',
    pages: '24 páginas',
    format: 'PDF',
    category: 'Automatización',
  },
  {
    title: 'Guía: Vender seguros por WhatsApp',
    description:
      'Paso a paso para implementar ventas de seguros a través de WhatsApp. Aprende a configurar tu bot, manejar objeciones y cerrar ventas digitalmente.',
    pages: '18 páginas',
    format: 'PDF',
    category: 'Ventas',
  },
  {
    title: 'Insurtech en Latinoamérica: Tendencias 2026',
    description:
      'Análisis de las tendencias tecnológicas que están transformando el mercado de seguros en LATAM. Incluye datos de mercado y predicciones.',
    pages: '32 páginas',
    format: 'PDF',
    category: 'Industria',
  },
  {
    title: 'Checklist: Lo que necesitas antes de automatizar',
    description:
      'Lista verificable de todo lo que debes tener preparado antes de implementar automatización en tu correduría. Evita errores comunes.',
    pages: '8 páginas',
    format: 'PDF',
    category: 'Implementación',
  },
];

export default function GuiasPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Recursos', href: '/recursos' },
          { label: 'Guías y Ebooks', href: '' },
        ]}
      />

      <PageHero
        badge="Guías"
        title="Guías y Ebooks para Corredores"
        subtitle="Recursos descargables para ayudarte a automatizar, escalar y optimizar tu correduría de seguros y préstamos"
        ctaText="Solicitar Demo"
        ctaHref="/demo"
      />

      {/* Guides Grid */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
              >
                <div className="group relative overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white p-6 transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    {/* Icon */}
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--dark-blue-surface)] text-[var(--dark-blue)]">
                      <FileText className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Category badge */}
                      <span className="mb-2 inline-block rounded-md bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--dark-blue)]">
                        {guide.category}
                      </span>

                      {/* Title */}
                      <h3 className="mb-2 font-heading text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                        {guide.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                        {guide.description}
                      </p>

                      {/* Meta info */}
                      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>{guide.pages}</span>
                        <span>•</span>
                        <span>{guide.format}</span>
                      </div>

                      {/* Download button */}
                      <a
                        href="/demo"
                        className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02]"
                      >
                        <Download className="h-4 w-4" />
                        Descargar gratis
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-[var(--text-primary)]">
              ¿Te gustaron las guías?
            </h2>
            <p className="mb-8 text-lg text-[var(--text-secondary)]">
              Implementa todo lo aprendido con kotkot y empieza a automatizar hoy
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)]"
            >
              Ver Demo
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="¿Quieres ayuda personalizada?"
        subtitle="Nuestro equipo puede asesorarte sobre la mejor estrategia de automatización para tu correduría"
      />
    </>
  );
}
