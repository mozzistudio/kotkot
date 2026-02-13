import type { Metadata } from 'next';
import {
  MessageCircle,
  FileText,
  HelpCircle,
  Video,
  Mail,
  ArrowUpRight,
  Book,
  Smartphone,
  CreditCard,
  Settings,
  Users,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Centro de Ayuda — Kotkot',
  description:
    'Encuentra respuestas a tus preguntas sobre Kotkot. Guías, tutoriales y soporte técnico.',
};

const faqs = [
  {
    category: 'Primeros Pasos',
    icon: Smartphone,
    questions: [
      {
        q: '¿Cómo empiezo a usar Kotkot?',
        a: 'Primero, solicita una demo desde nuestra página principal. Nuestro equipo te contactará para configurar tu cuenta, conectar tu número de WhatsApp Business y configurar las integraciones con tus aseguradoras.',
      },
      {
        q: '¿Necesito un número de WhatsApp Business?',
        a: 'Sí, necesitas un número de WhatsApp Business API. Si no tienes uno, podemos ayudarte a obtenerlo como parte del proceso de onboarding.',
      },
      {
        q: '¿Cuánto tiempo toma la implementación?',
        a: 'La implementación inicial toma entre 3-5 días hábiles, dependiendo de la cantidad de aseguradoras que quieras conectar y la complejidad de tus flujos.',
      },
    ],
  },
  {
    category: 'Integraciones',
    icon: Settings,
    questions: [
      {
        q: '¿Qué aseguradoras puedo conectar?',
        a: 'Soportamos las principales aseguradoras de Latinoamérica. Si la aseguradora tiene API disponible, podemos integrarla. Consulta la lista completa en nuestra sección de integraciones.',
      },
      {
        q: '¿Necesito credenciales de API de las aseguradoras?',
        a: 'Sí, necesitarás tus propias credenciales de API de cada aseguradora. Esto garantiza que las cotizaciones sean en tiempo real y que el dinero vaya directo a tu cuenta.',
      },
      {
        q: '¿Puedo agregar nuevas aseguradoras después?',
        a: 'Absolutamente. Puedes agregar o quitar aseguradoras en cualquier momento desde tu dashboard.',
      },
    ],
  },
  {
    category: 'Pagos y Facturación',
    icon: CreditCard,
    questions: [
      {
        q: '¿Cómo funciona el cobro automático?',
        a: 'Kotkot genera automáticamente links de pago (Yappy, Stripe) cuando un cliente acepta una cotización. El dinero va directamente a tu cuenta de procesador de pagos.',
      },
      {
        q: '¿Kotkot cobra comisión por las ventas?',
        a: 'No. Solo pagas la suscripción mensual. No cobramos comisiones sobre tus ventas de seguros.',
      },
      {
        q: '¿Puedo cancelar mi suscripción en cualquier momento?',
        a: 'Sí, puedes cancelar tu suscripción en cualquier momento sin penalidades. No hay contratos de permanencia.',
      },
    ],
  },
  {
    category: 'Uso del Bot',
    icon: MessageCircle,
    questions: [
      {
        q: '¿El bot responde en otros idiomas además de español?',
        a: 'Sí, el bot puede responder en español, inglés y portugués. Puedes configurar el idioma principal desde tu dashboard.',
      },
      {
        q: '¿Puedo personalizar las respuestas del bot?',
        a: 'Sí, puedes personalizar el tono, el nombre del bot, y agregar mensajes personalizados para situaciones específicas.',
      },
      {
        q: '¿Qué pasa si el bot no entiende una pregunta?',
        a: 'Si el bot no puede responder, te notificará y podrás tomar control de la conversación manualmente desde el dashboard.',
      },
    ],
  },
  {
    category: 'Analytics y Reportes',
    icon: BarChart3,
    questions: [
      {
        q: '¿Qué métricas puedo ver en el dashboard?',
        a: 'Puedes ver conversaciones activas, cotizaciones generadas, tasa de conversión, ingresos, comisiones, clientes activos, y más.',
      },
      {
        q: '¿Puedo exportar los datos?',
        a: 'Sí, puedes exportar todos tus datos en formato CSV o Excel desde el dashboard.',
      },
      {
        q: '¿Los datos están en tiempo real?',
        a: 'Sí, todas las métricas se actualizan en tiempo real.',
      },
    ],
  },
  {
    category: 'Soporte Técnico',
    icon: Users,
    questions: [
      {
        q: '¿Cómo contacto a soporte?',
        a: 'Puedes contactarnos por email (support@kotkot.studio), WhatsApp, o abrir un ticket desde tu dashboard.',
      },
      {
        q: '¿Cuál es el tiempo de respuesta de soporte?',
        a: 'Respondemos en menos de 2 horas en horario laboral (lunes a viernes, 8am-6pm hora de Panamá). Clientes Pro y Enterprise tienen soporte prioritario.',
      },
      {
        q: '¿Hay soporte 24/7?',
        a: 'El soporte 24/7 está disponible solo para clientes Enterprise. Los demás planes tienen soporte en horario laboral.',
      },
    ],
  },
];

const resources = [
  {
    icon: Book,
    title: 'Documentación',
    description: 'Guías completas sobre cómo usar todas las funciones de Kotkot.',
    href: '#',
  },
  {
    icon: Video,
    title: 'Video Tutoriales',
    description: 'Aprende con videos paso a paso sobre configuración e integraciones.',
    href: '#',
  },
  {
    icon: FileText,
    title: 'API Docs',
    description: 'Documentación técnica completa para desarrolladores.',
    href: '/api-docs',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    description: 'Chatea con nuestro equipo de soporte en tiempo real.',
    href: '/contacto',
  },
];

export default function AyudaPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#059669]">
            Estamos aquí para ayudarte
            <span className="inline-block h-px w-10 bg-[#059669]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Centro de Ayuda
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#6b7280] sm:text-xl">
            Encuentra respuestas a tus preguntas o contacta a nuestro equipo de
            soporte.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] flex items-center gap-3 p-4">
              <HelpCircle className="h-5 w-5 shrink-0 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Buscar en la ayuda..."
                className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- Quick Resources --- */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-[#111827]">
              Recursos Rápidos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="bg-white border border-[#e5e7eb] rounded-[16px] group p-6 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)] transition-colors group-hover:bg-[rgba(202,255,4,0.15)]">
                  <resource.icon className="h-6 w-6 text-[#059669]" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-base font-semibold text-[#111827]">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* --- FAQs by Category --- */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-[#111827]">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)]">
                    <category.icon className="h-5 w-5 text-[#059669]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#111827]">
                    {category.category}
                  </h3>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-[#e5e7eb] rounded-[16px] p-6">
                      <h4 className="font-heading text-base font-semibold text-[#111827]">
                        {faq.q}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Contact Support CTA --- */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] mx-auto max-w-3xl p-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[rgba(202,255,4,0.15)]">
            <Mail className="h-7 w-7 text-[#059669]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#111827]">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6b7280]">
            Nuestro equipo de soporte está listo para ayudarte. Contáctanos por
            email, WhatsApp o chat en vivo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-[16px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-base font-semibold text-[#111827] transition-all duration-200 hover:bg-[#b8e600]"
            >
              Contactar Soporte
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:support@kotkot.studio"
              className="inline-flex items-center gap-2 rounded-[16px] bg-white border border-[#e5e7eb] px-8 py-4 text-base font-semibold text-[#111827] transition-all duration-200 hover:bg-[#f3f4f6]"
            >
              Enviar Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
