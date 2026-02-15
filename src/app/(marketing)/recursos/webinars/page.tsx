'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { Video, Calendar, Users, Bell } from 'lucide-react';

export default function WebinarsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Recursos', href: '/recursos' },
          { label: 'Webinars', href: '' },
        ]}
      />

      <PageHero
        badge="Webinars"
        title="Webinars para Corredores"
        subtitle="Sesiones en vivo sobre automatización, mejores prácticas y tendencias del mercado de seguros y préstamos"
        ctaText="Ver Demo"
        ctaHref="/demo"
      />

      {/* Coming Soon Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-gradient-to-br from-[var(--surface-panel)] to-white p-8 text-center sm:p-12"
          >
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--dark-blue)] text-white">
              <Video className="h-10 w-10" />
            </div>

            <h2 className="mb-4 font-heading text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Próximamente: Webinars en vivo
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Estamos preparando una serie de webinars exclusivos para brokers sobre automatización,
              ventas digitales, y cómo escalar tu correduría con IA.
            </p>

            {/* Features grid */}
            <div className="mb-10 grid gap-6 text-left sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--text-primary)]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[var(--text-primary)]">Sesiones mensuales</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Un tema nuevo cada mes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--text-primary)]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[var(--text-primary)]">Expertos invitados</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Líderes de insurtech
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--text-primary)]">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[var(--text-primary)]">Grabaciones</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Acceso a replays
                  </p>
                </div>
              </div>
            </div>

            {/* Email capture form */}
            <div className="mx-auto max-w-md">
              <form className="flex flex-col gap-3 sm:flex-row" action="/demo" method="get">
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    required
                    className="w-full rounded-[var(--radius-input)] border border-[var(--border-default)] bg-white px-4 py-3 text-[var(--text-primary)] transition-all focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--dark-blue)] px-6 py-3 font-semibold text-white transition-all hover:bg-[var(--dark-blue-light)]"
                >
                  <Bell className="h-4 w-4" />
                  Notificarme
                </button>
              </form>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Sé el primero en enterarte cuando lancemos nuestros webinars
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why attend section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              ¿Qué aprenderás en nuestros webinars?
            </h2>

            <div className="space-y-4">
              {[
                'Cómo implementar automatización sin perder el toque personal',
                'Estrategias para vender seguros y préstamos por WhatsApp',
                'Casos de éxito de brokers que escalaron con IA',
                'Tendencias de insurtech en Latinoamérica',
                'Mejores prácticas de conversión y cierre de ventas',
                'Cómo gestionar un CRM automatizado eficientemente',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--text-primary)]">
                    {index + 1}
                  </div>
                  <p className="text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="¿No quieres esperar?"
        subtitle="Agenda una demo personalizada y aprende cómo automatizar tu correduría hoy mismo"
      />
    </>
  );
}
