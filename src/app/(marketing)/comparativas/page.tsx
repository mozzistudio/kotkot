'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const features = [
  { name: 'Integración con WhatsApp Business', kotkot: 'check', manual: 'x', crm: 'x', chatbot: 'partial' },
  { name: 'Cotización multi-aseguradora automática', kotkot: 'check', manual: 'x', crm: 'x', chatbot: 'x' },
  { name: 'Emisión de pólizas automatizada', kotkot: 'check', manual: 'x', crm: 'x', chatbot: 'x' },
  { name: 'CRM integrado para gestión de clientes', kotkot: 'check', manual: 'x', crm: 'check', chatbot: 'x' },
  { name: 'Cobro automático con Yappy y Stripe', kotkot: 'check', manual: 'x', crm: 'partial', chatbot: 'x' },
  { name: 'Responde 24/7 sin intervención humana', kotkot: 'check', manual: 'x', crm: 'x', chatbot: 'check' },
  { name: 'Soporte especializado en LATAM', kotkot: 'check', manual: 'x', crm: 'partial', chatbot: 'x' },
  { name: 'Configuración sin código', kotkot: 'check', manual: 'x', crm: 'x', chatbot: 'partial' },
  { name: 'Precio competitivo', kotkot: 'check', manual: 'check', crm: 'x', chatbot: 'partial' },
];

export default function ComparativasPage() {
  const renderIcon = (value: string) => {
    if (value === 'check') return <Check className="h-6 w-6 text-[var(--success)]" />;
    if (value === 'x') return <X className="h-6 w-6 text-[var(--text-muted)]" />;
    if (value === 'partial') return <Minus className="h-6 w-6 text-orange-500" />;
    return null;
  };

  return (
    <>
      <PageHero
        badge="Comparativas"
        title="¿Por qué kotkot?"
        subtitle="Compara kotkot con otras alternativas del mercado y descubre por qué somos la mejor opción para brokers en Latinoamérica"
        ctaText="Ver Demo"
        ctaHref="/demo"
      />

      {/* Comparison Table */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-default)] bg-white"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-default)] bg-[var(--surface-panel)]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                      Característica
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-[var(--text-primary)]">
                          kotkot
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
                      Hacerlo Manual
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
                      CRM Genérico
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--text-secondary)]">
                      Otro chatbot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`border-b border-[var(--border-subtle)] ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[var(--surface-panel)]'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderIcon(feature.kotkot)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderIcon(feature.manual)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderIcon(feature.crm)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderIcon(feature.chatbot)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 border-t border-[var(--border-default)] bg-[var(--surface-panel)] px-6 py-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[var(--success)]" />
                <span className="text-sm text-[var(--text-secondary)]">Incluido</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-[var(--text-secondary)]">Parcial</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-[var(--text-muted)]" />
                <span className="text-sm text-[var(--text-secondary)]">No incluido</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Below Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-10 text-center"
          >
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)] hover:shadow-xl"
            >
              ¿Convencido? Solicitar Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why kotkot Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-[var(--text-primary)]">
              Por qué elegir kotkot
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--text-primary)]">
                  Especializado para LATAM
                </h3>
                <p className="text-[var(--text-secondary)]">
                  kotkot fue diseñado específicamente para el mercado latinoamericano, con integraciones nativas con aseguradoras y bancos locales.
                </p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--text-primary)]">
                  Todo en uno
                </h3>
                <p className="text-[var(--text-secondary)]">
                  No necesitas múltiples herramientas. kotkot combina WhatsApp, CRM, cotizador, emisor y cobro en una sola plataforma.
                </p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--text-primary)]">
                  Sin código
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Configura todo desde nuestro dashboard sin escribir una sola línea de código. Empieza a vender en minutos, no semanas.
                </p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--text-primary)]">
                  Soporte local
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Nuestro equipo habla español, entiende tu mercado y está disponible para ayudarte en tu zona horaria.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Comprueba la diferencia tú mismo"
        subtitle="Agenda una demo y ve en acción cómo kotkot puede transformar tu correduría"
      />
    </>
  );
}
