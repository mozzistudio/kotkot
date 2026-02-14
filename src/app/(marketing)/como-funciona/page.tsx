import type { Metadata } from 'next';
import {
  CircleUser,
  Plug,
  Smartphone,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo Funciona — Kotkot',
  description:
    'Empieza a vender seguros por WhatsApp en 15 minutos. Conoce el proceso paso a paso para configurar tu agente IA de seguros.',
};

const steps = [
  {
    number: 1,
    icon: CircleUser,
    title: 'Registro y configuración',
    subtitle: 'Crea tu cuenta en 2 minutos',
    description:
      'Regístrate con tu email, elige tu plan y selecciona tu país de operación. Nuestro asistente de configuración te guía paso a paso para tener todo listo.',
    details: [
      'Registro rápido con email o Google',
      'Selección de plan (Starter, Growth, Enterprise)',
      'Configuración de país y moneda',
      'Datos de tu correduría (nombre, RUC/NIT, dirección)',
      'Configuración de cuenta bancaria para recibir pagos',
    ],
  },
  {
    number: 2,
    icon: Plug,
    title: 'Conexión de aseguradoras',
    subtitle: 'Conecta tus APIs o sube tarifas',
    description:
      'Conecta las APIs de tus aseguradoras usando tus propias credenciales. Si alguna aseguradora no tiene API, simplemente sube sus tablas de tarifas en CSV o Excel.',
    details: [
      'Ingresa tus API keys por aseguradora',
      'Prueba la conexión con cotización de prueba',
      'Alternativa: carga tablas de tarifas (CSV/Excel)',
      'Selecciona productos: auto, salud, vida, hogar',
      'Configura comisiones por aseguradora y producto',
    ],
  },
  {
    number: 3,
    icon: Smartphone,
    title: 'Conexión de WhatsApp',
    subtitle: 'Vincula tu número de WhatsApp Business',
    description:
      'Usa el flujo de Meta Embedded Signup para vincular tu número de WhatsApp Business en segundos. No necesitas conocimientos técnicos.',
    details: [
      'Click en "Conectar WhatsApp"',
      'Autorización via Meta Business Suite',
      'Verificación de número de WhatsApp Business',
      'Configuración de perfil de negocio',
      'Mensaje de prueba para verificar conexión',
    ],
  },
  {
    number: 4,
    icon: Sparkles,
    title: 'Personalización del agente',
    subtitle: 'Configura la personalidad de tu bot',
    description:
      'Usa nuestro editor visual para definir el nombre, tono, personalidad y respuestas de tu agente IA. Puedes agregar tu propia base de conocimiento.',
    details: [
      'Nombre y avatar del agente',
      'Tono de conversación: formal, amigable, técnico',
      'Mensajes de bienvenida y despedida',
      'Base de conocimiento personalizada (FAQ)',
      'Horarios de atención y mensajes automáticos',
    ],
  },
];

const faqs = [
  {
    question: '¿Necesito conocimientos técnicos para configurar Kotkot?',
    answer:
      'No. Nuestro asistente de configuración te guía paso a paso. Si necesitas ayuda, nuestro equipo de soporte está disponible por WhatsApp y email.',
  },
  {
    question: '¿Cuánto tiempo toma estar operativo?',
    answer:
      'La configuración básica toma 15 minutos. Si necesitas conectar APIs de aseguradoras que requieren aprobación, eso puede tomar algunos días dependiendo de cada aseguradora.',
  },
  {
    question: '¿Puedo usar mi número de WhatsApp existente?',
    answer:
      'Sí, siempre que sea un número de WhatsApp Business. Si ya tienes un número personal, puedes migrarlo a WhatsApp Business antes de conectarlo.',
  },
  {
    question: '¿El bot puede manejar preguntas complejas?',
    answer:
      'Sí. Nuestro agente IA entiende contexto y puede responder preguntas sobre coberturas, exclusiones, deducibles y más. Para casos muy específicos, escala automáticamente a un corredor humano.',
  },
  {
    question: '¿Qué pasa si un cliente quiere hablar con un humano?',
    answer:
      'El bot detecta cuando un cliente necesita atención humana y transfiere la conversación a un corredor de tu equipo, incluyendo todo el contexto de la conversación.',
  },
  {
    question: '¿En qué países funciona Kotkot?',
    answer:
      'Kotkot opera en Panamá, Colombia, México, Chile, Perú, Ecuador, Costa Rica, República Dominicana, Argentina y Brasil. Estamos expandiéndonos constantemente.',
  },
  {
    question: '¿Cómo se cobran los mensajes de WhatsApp?',
    answer:
      'Las tarifas de mensajes de WhatsApp son establecidas por Meta y se cobran por separado, al costo. Kotkot no agrega ningún markup a las tarifas de Meta.',
  },
  {
    question: '¿Mis datos y los de mis clientes están seguros?',
    answer:
      'Sí. Usamos encriptación end-to-end, servidores en la nube con certificación SOC 2, y cumplimos con las regulaciones de protección de datos de cada país donde operamos.',
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Hero --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
            Paso a paso
            <span className="inline-block h-px w-10 bg-[var(--text-primary)]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Empieza a vender seguros por WhatsApp en{' '}
            <span className="text-gradient-primary">15 minutos</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Configurar tu agente IA de seguros es más fácil de lo que piensas.
            Sigue estos 4 pasos y empieza a recibir cotizaciones automáticas hoy.
          </p>
        </div>

        {/* --- Steps --- */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {steps.map((step, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section
                key={step.number}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* --- Text --- */}
                <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)]">
                      <span className="font-heading text-lg font-bold text-[var(--text-primary)]">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                        {step.title}
                      </h2>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-primary)]" />
                        <span className="text-sm leading-relaxed text-slate-700">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* --- Mockup Placeholder --- */}
                <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                  <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] flex aspect-[4/3] items-center justify-center overflow-hidden p-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)]">
                        <step.icon
                          className="h-10 w-10 text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-sm font-medium text-[var(--text-muted)]">
                        Captura de pantalla / Mockup
                      </p>
                      <p className="max-w-xs text-xs text-[var(--text-muted)]">
                        Paso {step.number}: {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* --- FAQ Section --- */}
        <div className="mt-32">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Todo lo que necesitas saber sobre cómo funciona Kotkot.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6">
                <div className="flex items-start gap-3">
                  <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-primary)]" />
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Listo para empezar?
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Solicita una demo y te mostramos cómo Kotkot transforma tu
            correduría en minutos.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--action-primary-hover)]"
            >
              Solicitar Demo
            </a>
            <a
              href="/precios"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-white border border-[var(--border-default)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--surface-hover)]"
            >
              Ver Precios
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
