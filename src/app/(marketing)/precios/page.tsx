import type { Metadata } from 'next';
import { Pricing } from '@/components/marketing/Pricing';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Precios — CotiFácil',
  description:
    'Planes y precios de CotiFácil. Desde $149/mes para corredores individuales hasta planes Enterprise para grandes corredurías.',
};

const faqs = [
  {
    question: '¿Puedo cambiar de plan?',
    answer:
      'Sí, puedes upgrade o downgrade en cualquier momento. El cambio se aplica al siguiente ciclo de facturación y se prorratea automáticamente.',
  },
  {
    question: '¿Hay periodo de prueba?',
    answer:
      'Ofrecemos una demo personalizada donde te mostramos todas las funcionalidades con datos reales de tu correduría. Contáctanos para agendar.',
  },
  {
    question: '¿Qué pasa con los mensajes de WhatsApp?',
    answer:
      'Las tarifas de Meta se cobran por separado, al costo. CotiFácil no agrega ningún markup. Las tarifas varían por país y tipo de mensaje (conversación iniciada por usuario vs. notificación).',
  },
  {
    question: '¿Cuánto cuesta un número adicional?',
    answer:
      '$100/mes por número de WhatsApp adicional. Cada número puede tener su propia personalidad de agente y conectarse a diferentes aseguradoras.',
  },
  {
    question: '¿Puedo usar mi número existente?',
    answer:
      'Sí, siempre que sea un número de WhatsApp Business. Si actualmente usas WhatsApp personal, puedes migrarlo a WhatsApp Business antes de conectarlo a CotiFácil.',
  },
  {
    question: '¿En qué países están disponibles?',
    answer:
      'Panamá, Colombia, México, Chile, Perú, Ecuador, Costa Rica, República Dominicana, Argentina y Brasil. Estamos en constante expansión a nuevos mercados.',
  },
];

export default function PreciosPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* --- Pricing Component --- */}
      <Pricing />

      {/* --- FAQ Section --- */}
      <div className="mx-auto mt-24 max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Preguntas sobre precios
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Resolvemos tus dudas sobre planes, pagos y facturación.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="glass-card p-6">
              <div className="flex items-start gap-3">
                <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            ¿No estás seguro de qué plan necesitas?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Agenda una demo y te ayudamos a elegir el plan perfecto para tu
            correduría.
          </p>
          <div className="mt-8">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
