import type { Metadata } from 'next';
import { TrendingUp, Clock, MessageSquare, Quote } from '@/components/shared/icon-map';

export const metadata: Metadata = {
  title: 'Casos de Éxito — Kotkot',
  description:
    'Descubre cómo corredurías de seguros en Latinoamérica están transformando sus negocios con Kotkot.',
};

const caseStudies = [
  {
    company: 'Correduría Panamá Seguros',
    country: 'Panamá',
    flag: '\u{1F1F5}\u{1F1E6}',
    headline: 'Aumentó ventas 300% en 3 meses con Kotkot',
    description:
      'Correduría Panamá Seguros es una correduría familiar con 15 años de experiencia. Antes de Kotkot, procesaban cotizaciones manualmente por teléfono y email, con un tiempo promedio de respuesta de 24 horas.',
    challenge:
      'Responder a clientes tomaba demasiado tiempo. Perdían prospectos que necesitaban cotizaciones inmediatas, especialmente fuera del horario de oficina.',
    solution:
      'Implementaron el agente IA de Kotkot en su WhatsApp Business, conectando 4 aseguradoras (ASSA, Mapfre, Generali, SURA) con cobro automático via Yappy.',
    metrics: [
      { icon: TrendingUp, label: 'Aumento en ventas', value: '+300%' },
      { icon: Clock, label: 'Tiempo de cotización', value: '3 seg' },
      { icon: MessageSquare, label: 'Cotizaciones/mes', value: '1,200+' },
    ],
    quote:
      'Kotkot transformó nuestra correduría. Ahora vendemos seguros las 24 horas sin aumentar personal. Nuestros clientes no pueden creer lo rápido que reciben sus cotizaciones.',
    author: 'Roberto Méndez',
    role: 'Director General',
  },
  {
    company: 'Asesores de Seguros Bogotá',
    country: 'Colombia',
    flag: '\u{1F1E8}\u{1F1F4}',
    headline: 'Automatizó 80% de sus cotizaciones',
    description:
      'Con un equipo de 12 corredores, Asesores de Seguros Bogotá manejaba más de 200 consultas diarias. El equipo estaba saturado y la calidad del servicio se deterioraba.',
    challenge:
      'El alto volumen de consultas repetitivas consumía el 80% del tiempo del equipo, dejando poco espacio para ventas consultivas y clientes de alto valor.',
    solution:
      'Desplegaron Kotkot para manejar cotizaciones estándar de auto y SOAT, liberando al equipo para enfocarse en seguros empresariales y de vida. Conectaron 5 aseguradoras.',
    metrics: [
      { icon: TrendingUp, label: 'Cotizaciones automáticas', value: '80%' },
      { icon: Clock, label: 'Horas ahorradas/semana', value: '120h' },
      { icon: MessageSquare, label: 'Satisfacción cliente', value: '97%' },
    ],
    quote:
      'Nuestro equipo ahora se enfoca en lo que realmente importa: las ventas consultivas. Kotkot maneja todo lo repetitivo con una precisión impresionante.',
    author: 'María Fernanda López',
    role: 'Gerente Comercial',
  },
  {
    company: 'Seguros Premium MX',
    country: 'México',
    flag: '\u{1F1F2}\u{1F1FD}',
    headline: 'Redujo tiempo de cotización de 24h a 3 segundos',
    description:
      'Seguros Premium MX es una correduría mediana en Ciudad de México especializada en seguros de auto y salud. Su proceso de cotización requería consultar manualmente los portales de cada aseguradora.',
    challenge:
      'Cotizar un seguro de auto requería ingresar datos en 5 portales diferentes, comparar manualmente y enviar el resultado al cliente. Todo el proceso tomaba entre 2 y 24 horas.',
    solution:
      'Integraron Kotkot con GNP, Qualitas, AXA y HDI. El agente IA ahora consulta las 4 aseguradoras en paralelo y presenta la comparación en WhatsApp en menos de 3 segundos.',
    metrics: [
      { icon: TrendingUp, label: 'Reducción de tiempo', value: '99.99%' },
      { icon: Clock, label: 'Tiempo de respuesta', value: '< 3 seg' },
      { icon: MessageSquare, label: 'Tasa de conversión', value: '+45%' },
    ],
    quote:
      'Pasamos de tardar horas en cada cotización a entregar comparativas en segundos. Nuestros clientes están encantados y nuestra tasa de conversión se disparó.',
    author: 'Carlos Hernández',
    role: 'Fundador y CEO',
  },
];

export default function CasosDeExitoPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
            Historias reales
            <span className="inline-block h-px w-10 bg-[var(--text-primary)]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Casos de Éxito
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Descubre cómo corredurías de seguros en Latinoamérica están
            transformando sus negocios con Kotkot.
          </p>
        </div>

        {/* --- Case Studies --- */}
        <div className="flex flex-col gap-16">
          {caseStudies.map((study) => (
            <article key={study.company} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] overflow-hidden">
              {/* Header */}
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-hover)] px-8 py-6 sm:px-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-3xl">{study.flag}</span>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                      {study.company}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">{study.country}</p>
                  </div>
                </div>
                <p className="mt-3 font-heading text-lg font-semibold text-[var(--text-primary)]">
                  {study.headline}
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-8 sm:px-10">
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {study.description}
                </p>

                {/* Challenge & Solution */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-5">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Desafío
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {study.challenge}
                    </p>
                  </div>
                  <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-5">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                      Solución
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col items-center rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)] px-4 py-5 text-center"
                    >
                      <metric.icon className="mb-2 h-5 w-5 text-[var(--text-primary)]" />
                      <span className="font-data text-2xl font-bold text-[var(--text-primary)]">
                        {metric.value}
                      </span>
                      <span className="mt-1 text-xs font-medium text-[var(--text-muted)]">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="mt-8 flex gap-4 rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)] p-6">
                  <Quote className="h-8 w-8 shrink-0 text-[rgba(202,255,4,0.40)]" />
                  <div>
                    <p className="text-base italic leading-relaxed text-[var(--text-secondary)]">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                      {study.author}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {study.role}, {study.company}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- Bottom CTA --- */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            ¿Quieres ser el próximo caso de éxito?
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Únete a las corredurías que ya están vendiendo seguros por WhatsApp
            con Kotkot.
          </p>
          <div className="mt-8">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--action-primary-hover)]"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
