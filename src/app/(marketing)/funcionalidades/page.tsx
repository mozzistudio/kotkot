import type { Metadata } from 'next';
import {
  MessageSquare,
  Plug,
  CreditCard,
  BarChart3,
  Palette,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Funcionalidades — CotiFácil',
  description:
    'Descubre todas las funcionalidades de CotiFácil: agente IA en WhatsApp, conexión multi-aseguradora, cobros automáticos, dashboard inteligente y más.',
};

const features = [
  {
    icon: MessageSquare,
    title: 'Agente IA en WhatsApp',
    subtitle: 'Tu corredor virtual que nunca duerme',
    description:
      'Despliega un agente de inteligencia artificial directamente en el WhatsApp de tu correduría. El bot entiende lenguaje natural, responde preguntas sobre coberturas, recopila datos del cliente y genera cotizaciones comparativas en segundos.',
    subFeatures: [
      'Conversación natural en español con contexto completo',
      'Recopilación inteligente de datos (cédula, placa, fecha de nacimiento)',
      'Cotización multi-aseguradora en tiempo real',
      'Comparación lado a lado de planes y precios',
      'Generación automática de link de pago',
      'Escalado a corredor humano cuando se requiere',
    ],
    flow: [
      'Cliente envía "Hola, quiero cotizar seguro de auto"',
      'Bot solicita datos: placa, año, marca, modelo',
      'Bot consulta APIs de aseguradoras en paralelo',
      'Bot presenta comparación de 3-5 opciones',
      'Cliente elige plan y recibe link de pago',
      'Póliza emitida y enviada por WhatsApp',
    ],
  },
  {
    icon: Plug,
    title: 'Conexión Multi-Aseguradora',
    subtitle: 'Todas tus aseguradoras en un solo lugar',
    description:
      'Conecta las APIs de tus aseguradoras con tus propias credenciales. CotiFácil actúa como middleware inteligente, normalizando las respuestas para que tu agente pueda comparar precios y coberturas instantáneamente.',
    subFeatures: [
      'Integración directa via API REST',
      'Alternativa: carga de tablas de tarifas (CSV/Excel)',
      'Normalización automática de coberturas',
      'Cache inteligente para respuestas rápidas',
      'Monitoreo de estado de APIs en tiempo real',
      'Soporte para cotización de auto, salud, vida y hogar',
    ],
    countries: {
      'Panamá': ['ASSA', 'Mapfre', 'Generali', 'SURA'],
      'Colombia': ['SURA', 'Bolívar', 'Allianz', 'Mapfre', 'Liberty'],
      'México': ['GNP', 'Qualitas', 'AXA', 'Mapfre', 'HDI'],
      'Chile': ['SURA', 'BCI Seguros', 'Mapfre', 'Liberty'],
      'Perú': ['Rímac', 'Pacífico', 'Mapfre', 'La Positiva'],
      'Ecuador': ['Equinoccial', 'SURA', 'AIG', 'Mapfre'],
      'Costa Rica': ['INS', 'ASSA', 'Mapfre', 'SURA'],
      'Rep. Dominicana': ['Universal', 'Mapfre BHD', 'Seguros Reservas'],
      'Argentina': ['SURA', 'Zurich', 'La Caja', 'Mapfre'],
      'Brasil': ['Porto Seguro', 'SulAmérica', 'Bradesco', 'Mapfre'],
    },
  },
  {
    icon: CreditCard,
    title: 'Cobro Automático',
    subtitle: 'Del WhatsApp al pago en un clic',
    description:
      'Genera links de pago personalizados automáticamente al final de cada cotización. El cliente paga sin salir de WhatsApp. El dinero llega directo a tu cuenta bancaria.',
    subFeatures: [
      'Yappy (Panamá): pagos con billetera digital local',
      'Stripe: tarjetas de crédito/débito en toda LATAM',
      'Links de pago con expiración configurable',
      'Confirmación automática de pago por WhatsApp',
      'Conciliación automática con reportes',
      'Soporte para pagos fraccionados y financiamiento',
    ],
    flow: [
      'Agente genera cotización aprobada por cliente',
      'Sistema crea link de pago personalizado',
      'Link enviado directamente por WhatsApp',
      'Cliente paga con Yappy, tarjeta o transferencia',
      'Confirmación instantánea al cliente y corredor',
      'Comisión calculada y reportada automáticamente',
    ],
  },
  {
    icon: BarChart3,
    title: 'Dashboard Inteligente',
    subtitle: 'Métricas que impulsan tu negocio',
    description:
      'Un panel de control completo con todas las métricas de tu correduría. Desde conversaciones hasta comisiones, todo en tiempo real con gráficos interactivos y reportes exportables.',
    subFeatures: [
      'Métricas en tiempo real: conversaciones, cotizaciones, ventas',
      'Gráficos de tendencia y análisis temporal',
      'Ranking de aseguradoras por conversión',
      'Análisis de embudo: conversación a póliza',
      'Reportes exportables (PDF, CSV, Excel)',
      'Alertas personalizables por email o WhatsApp',
    ],
    flow: [],
  },
  {
    icon: Palette,
    title: 'Personalización del Agente',
    subtitle: 'Tu marca, tu voz, tu estilo',
    description:
      'Configura cada aspecto de tu agente IA. Desde el nombre y tono de conversación hasta las respuestas personalizadas y el idioma. Tu bot habla como tu correduría.',
    subFeatures: [
      'Editor de personalidad: formal, amigable, técnico',
      'Nombre y avatar personalizados',
      'Mensajes de bienvenida y despedida configurables',
      'Base de conocimiento propia (FAQ de tu correduría)',
      'Idioma y regionalismos por país',
      'Horarios de atención y mensajes fuera de horario',
    ],
    flow: [],
  },
  {
    icon: Users,
    title: 'CRM Automático',
    subtitle: 'Cada conversación es un lead',
    description:
      'Cada interacción con tu agente IA crea automáticamente un registro de cliente. Seguimiento de leads, recordatorios de renovación, oportunidades de cross-sell, todo sin esfuerzo manual.',
    subFeatures: [
      'Creación automática de leads desde WhatsApp',
      'Historial completo de conversaciones por cliente',
      'Recordatorios de renovación automáticos',
      'Detección de oportunidades de cross-sell',
      'Segmentación por tipo de seguro y perfil',
      'Pipeline de ventas visual con etapas configurables',
    ],
    flow: [],
  },
];

export default function FuncionalidadesPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#059669]">
            Plataforma completa
            <span className="inline-block h-px w-10 bg-[#059669]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Funcionalidades
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#6b7280] sm:text-xl">
            Todo lo que necesitas para automatizar tu correduría de seguros.
            Una plataforma diseñada para corredores en Latinoamérica.
          </p>
        </div>

        {/* --- Feature Sections (alternating layout) --- */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {features.map((feature, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <section
                key={feature.title}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* --- Text Side --- */}
                <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[rgba(202,255,4,0.15)]">
                    <feature.icon
                      className="h-7 w-7 text-[#059669]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h2 className="font-heading text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="mt-1 text-base font-medium text-[#059669]">
                    {feature.subtitle}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
                    {feature.description}
                  </p>

                  {/* Sub-features list */}
                  <ul className="mt-6 space-y-3">
                    {feature.subFeatures.map((sub) => (
                      <li key={sub} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#059669]"
                          strokeWidth={2}
                        />
                        <span className="text-sm leading-relaxed text-[#6b7280]">
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Conversation flow (if applicable) */}
                  {feature.flow && feature.flow.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#9ca3af]">
                        Flujo de conversación
                      </h3>
                      <ol className="mt-3 space-y-2">
                        {feature.flow.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(202,255,4,0.15)] text-xs font-bold text-[#059669]">
                              {i + 1}
                            </span>
                            <span className="text-sm leading-relaxed text-[#6b7280]">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Countries list (for multi-insurer) */}
                  {'countries' in feature && feature.countries && (
                    <div className="mt-8">
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#9ca3af]">
                        Aseguradoras por país
                      </h3>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {Object.entries(
                          feature.countries as Record<string, string[]>
                        ).map(([country, insurers]) => (
                          <div
                            key={country}
                            className="bg-white border border-[#e5e7eb] rounded-[16px] px-4 py-3"
                          >
                            <p className="text-sm font-semibold text-[#111827]">
                              {country}
                            </p>
                            <p className="mt-0.5 text-xs text-[#9ca3af]">
                              {insurers.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* --- Visual / Mockup Placeholder Side --- */}
                <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                  <div className="bg-white border border-[#e5e7eb] rounded-[16px] flex aspect-[4/3] items-center justify-center overflow-hidden p-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[16px] bg-[rgba(202,255,4,0.15)] shadow-lg shadow-emerald-500/25">
                        <feature.icon
                          className="h-10 w-10 text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-sm font-medium text-[#9ca3af]">
                        Ilustración / Mockup
                      </p>
                      <p className="max-w-xs text-xs text-[#9ca3af]">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Listo para transformar tu correduría?
          </h2>
          <p className="mt-4 text-lg text-[#6b7280]">
            Solicita una demo personalizada y descubre cómo CotiFácil puede
            automatizar tu negocio de seguros.
          </p>
          <div className="mt-8">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[16px] bg-[#CAFF04] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-lg font-semibold text-[#111827] shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
