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
  title: 'Centro de Ayuda — CotiFácil',
  description:
    'Encuentra respuestas a tus preguntas sobre CotiFácil. Guías, tutoriales y soporte técnico.',
};

const faqs = [
  {
    category: 'Primeros Pasos',
    icon: Smartphone,
    questions: [
      {
        q: '¿Cómo empiezo a usar CotiFácil?',
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
        a: 'CotiFácil genera automáticamente links de pago (Yappy, Stripe) cuando un cliente acepta una cotización. El dinero va directamente a tu cuenta de procesador de pagos.',
      },
      {
        q: '¿CotiFácil cobra comisión por las ventas?',
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
    description: 'Guías completas sobre cómo usar todas las funciones de CotiFácil.',
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
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Estamos aquí para ayudarte
            <span className="inline-block h-px w-10 bg-emerald-400" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Centro de Ayuda
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Encuentra respuestas a tus preguntas o contacta a nuestro equipo de
            soporte.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="glass-card flex items-center gap-3 p-4">
              <HelpCircle className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar en la ayuda..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* --- Quick Resources --- */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Recursos Rápidos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="glass-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 transition-colors group-hover:bg-emerald-100">
                  <resource.icon className="h-6 w-6 text-emerald-600" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* --- FAQs by Category --- */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                    <category.icon className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    {category.category}
                  </h3>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <div key={idx} className="glass-card p-6">
                      <h4 className="font-heading text-base font-semibold text-slate-900">
                        {faq.q}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <Mail className="h-7 w-7 text-emerald-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-slate-900">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Nuestro equipo de soporte está listo para ayudarte. Contáctanos por
            email, WhatsApp o chat en vivo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Contactar Soporte
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:support@kotkot.studio"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500 px-8 py-4 text-base font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-50"
            >
              Enviar Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
