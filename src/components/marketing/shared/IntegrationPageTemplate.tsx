'use client';

import { motion } from 'framer-motion';
import { Breadcrumb } from './Breadcrumb';
import { CTABanner } from './CTABanner';
import { Check, ArrowRight } from 'lucide-react';

interface IntegrationFeature {
  title: string;
  items: string[];
}

interface IntegrationStep {
  number: string;
  title: string;
  description: string;
}

interface IntegrationPageProps {
  companyName: string;
  companyType: 'Aseguradora' | 'Banco' | 'Pagos';
  overview: string;
  features: IntegrationFeature[];
  steps: IntegrationStep[];
}

export function IntegrationPageTemplate({
  companyName,
  companyType,
  overview,
  features,
  steps,
}: IntegrationPageProps) {
  const getTypeLabel = () => {
    if (companyType === 'Aseguradora') return 'seguros';
    if (companyType === 'Banco') return 'préstamos';
    return 'pagos';
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Integraciones', href: '/integraciones' },
          { label: companyName, href: '' },
        ]}
      />

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-block">
              <span
                className={`inline-block rounded-md px-3 py-1.5 text-xs font-semibold ${
                  companyType === 'Aseguradora'
                    ? 'bg-blue-50 text-blue-700'
                    : companyType === 'Banco'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-purple-50 text-purple-700'
                }`}
              >
                {companyType}
              </span>
            </div>

            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-[var(--dark-blue)] sm:text-5xl">
              Vende {companyName} con kotkot
            </h1>

            <p className="text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              {overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="bg-[var(--surface-panel)] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-8 font-heading text-3xl font-bold text-[var(--text-primary)]">
              Qué puedes hacer con esta integración
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index}>
                  <h3 className="mb-4 font-heading text-xl font-semibold text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <ul className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--success)]" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-10 font-heading text-3xl font-bold text-[var(--text-primary)]">
              Cómo funciona
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-heading text-xl font-bold text-[var(--text-primary)]">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-gradient-to-br from-[var(--accent-light)] to-transparent p-8 text-center sm:p-12"
          >
            <h2 className="mb-4 font-heading text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Conecta {companyName} a tu bot
            </h2>
            <p className="mb-8 text-lg text-[var(--text-secondary)]">
              Empieza a vender {getTypeLabel()} de {companyName} en automático hoy
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-3 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] transition-all duration-150 hover:scale-[1.02] hover:bg-[var(--accent-hover)] hover:shadow-lg"
            >
              Solicitar Demo
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="¿Tienes preguntas sobre esta integración?"
        subtitle="Nuestro equipo está listo para ayudarte a configurar e integrar tu bot"
        ctaText="Hablar con Ventas"
        ctaHref="/demo"
      />
    </>
  );
}
