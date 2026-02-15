'use client';

import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/shared/PageHero';
import { Breadcrumb } from '@/components/marketing/shared/Breadcrumb';
import { CTABanner } from '@/components/marketing/shared/CTABanner';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Seguros' | 'Préstamos';
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Prima',
    category: 'Seguros',
    definition:
      'Es el monto que el asegurado paga a la compañía de seguros por la cobertura de una póliza. La prima se calcula según el riesgo, el tipo de seguro y las coberturas contratadas. Con kotkot, puedes automatizar el cálculo de primas en tiempo real.',
  },
  {
    term: 'Deducible',
    category: 'Seguros',
    definition:
      'Es la cantidad de dinero que el asegurado debe pagar de su bolsillo antes de que la aseguradora comience a cubrir los gastos de un siniestro. Por ejemplo, si tienes un deducible de $500 y tu daño es de $2000, pagas $500 y la aseguradora paga $1500.',
  },
  {
    term: 'Copago',
    category: 'Seguros',
    definition:
      'Es un pago fijo que realiza el asegurado cada vez que utiliza un servicio médico cubierto por su seguro de salud. El copago es independiente del costo total del servicio y se define en la póliza.',
  },
  {
    term: 'Cobertura',
    category: 'Seguros',
    definition:
      'Se refiere a los riesgos, eventos o situaciones que están protegidos por una póliza de seguros. Una cobertura amplia incluye más eventos protegidos, mientras que una cobertura limitada solo cubre situaciones específicas.',
  },
  {
    term: 'Póliza',
    category: 'Seguros',
    definition:
      'Es el contrato legal entre el asegurado y la compañía de seguros donde se especifican las coberturas, exclusiones, primas, deducibles y términos del seguro. La póliza es el documento oficial que certifica el seguro.',
  },
  {
    term: 'Beneficiario',
    category: 'Seguros',
    definition:
      'Es la persona o entidad designada por el asegurado para recibir el pago de la indemnización en caso de un siniestro. En seguros de vida, el beneficiario recibe el monto asegurado cuando fallece el titular.',
  },
  {
    term: 'Tasa de interés',
    category: 'Préstamos',
    definition:
      'Es el porcentaje que se cobra sobre el monto del préstamo como costo por el uso del dinero. Una tasa del 10% anual significa que pagarás 10% adicional al monto prestado cada año. Tu bot puede comparar tasas automáticamente.',
  },
  {
    term: 'LTV (Loan-to-Value)',
    category: 'Préstamos',
    definition:
      'Es la relación entre el monto del préstamo y el valor del bien que se financia (generalmente usado en hipotecas). Un LTV del 80% significa que el préstamo cubre el 80% del valor de la propiedad.',
  },
  {
    term: 'Plazo',
    category: 'Préstamos',
    definition:
      'Es el período de tiempo durante el cual el prestatario debe devolver el préstamo. Puede ser de meses o años. Un plazo más largo reduce las cuotas mensuales, pero aumenta el interés total pagado.',
  },
  {
    term: 'Amortización',
    category: 'Préstamos',
    definition:
      'Es el proceso de pagar gradualmente un préstamo a través de pagos periódicos (generalmente mensuales). Cada pago incluye capital (monto prestado) e intereses. Con el tiempo, pagas más capital y menos intereses.',
  },
  {
    term: 'Refinanciamiento',
    category: 'Préstamos',
    definition:
      'Consiste en reemplazar un préstamo existente por uno nuevo, generalmente con mejores condiciones (menor tasa de interés o plazo más conveniente). Se usa para reducir el costo total del crédito.',
  },
  {
    term: 'Siniestro',
    category: 'Seguros',
    definition:
      'Es el evento dañoso, accidente o pérdida cubierto por la póliza de seguros. Cuando ocurre un siniestro, el asegurado puede reclamar la indemnización a la aseguradora según los términos de su póliza.',
  },
  {
    term: 'Cuota',
    category: 'Préstamos',
    definition:
      'Es el pago periódico (usualmente mensual) que el prestatario realiza para devolver el préstamo. La cuota incluye capital e intereses, y permanece fija en préstamos con tasa de interés fija.',
  },
];

export default function GlosarioPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTerm = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Recursos', href: '/recursos' },
          { label: 'Glosario', href: '' },
        ]}
      />

      <PageHero
        badge="Glosario"
        title="Glosario de Seguros y Préstamos"
        subtitle="Términos clave explicados de forma clara y práctica para brokers y corredores"
        ctaText="Ver Demo"
        ctaHref="/demo"
      />

      {/* Glossary Terms */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3">
            {glossaryTerms.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.03,
                }}
              >
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-white">
                  {/* Term header (clickable) */}
                  <button
                    onClick={() => toggleTerm(index)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-all hover:bg-[var(--surface-panel)]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                          item.category === 'Seguros'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {item.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                        {item.term}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-[var(--text-secondary)] transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Definition (expandable) */}
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-[var(--border-default)] bg-[var(--surface-panel)] px-6 py-4"
                    >
                      <p className="leading-relaxed text-[var(--text-secondary)]">
                        {item.definition}
                      </p>
                    </motion.div>
                  )}
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
              ¿Confundido con algún término?
            </h2>
            <p className="mb-8 text-lg text-[var(--text-secondary)]">
              Con kotkot, tu bot explica automáticamente estos conceptos a tus clientes durante la venta
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--text-primary)] transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)]"
            >
              Ver cómo funciona
            </a>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Automatiza tu correduría hoy"
        subtitle="Deja que tu bot haga el trabajo mientras tú te enfocas en cerrar más ventas"
      />
    </>
  );
}
