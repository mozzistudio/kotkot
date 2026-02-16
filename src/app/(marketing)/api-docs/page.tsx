import type { Metadata } from 'next';
import {
  Code,
  Key,
  FileText,
  Zap,
  Shield,
  BookOpen,
  Terminal,
  Webhook,
  Database,
  Lock,
} from '@/components/shared/icon-map';

export const metadata: Metadata = {
  title: 'Documentación API — Kotkot',
  description:
    'Documentación técnica completa de la API de Kotkot. Integra Kotkot con tus sistemas.',
};

const features = [
  {
    icon: Zap,
    title: 'REST API',
    description:
      'API RESTful completa para gestionar conversaciones, cotizaciones, clientes y más.',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description:
      'Recibe notificaciones en tiempo real sobre eventos importantes en tu cuenta.',
  },
  {
    icon: Key,
    title: 'Autenticación',
    description:
      'Autenticación segura mediante API keys con permisos granulares.',
  },
  {
    icon: Shield,
    title: 'Rate Limiting',
    description:
      'Límites justos de rate limiting para garantizar disponibilidad para todos.',
  },
];

const endpoints = [
  {
    category: 'Conversaciones',
    icon: Terminal,
    description: 'Gestiona conversaciones de WhatsApp',
    methods: [
      { method: 'GET', path: '/api/v1/conversations', desc: 'Listar conversaciones' },
      { method: 'GET', path: '/api/v1/conversations/:id', desc: 'Obtener conversación' },
      { method: 'POST', path: '/api/v1/conversations', desc: 'Crear conversación' },
      { method: 'PATCH', path: '/api/v1/conversations/:id', desc: 'Actualizar conversación' },
    ],
  },
  {
    category: 'Cotizaciones',
    icon: FileText,
    description: 'Gestiona cotizaciones de seguros',
    methods: [
      { method: 'GET', path: '/api/v1/quotes', desc: 'Listar cotizaciones' },
      { method: 'GET', path: '/api/v1/quotes/:id', desc: 'Obtener cotización' },
      { method: 'POST', path: '/api/v1/quotes', desc: 'Crear cotización' },
      { method: 'PATCH', path: '/api/v1/quotes/:id', desc: 'Actualizar cotización' },
    ],
  },
  {
    category: 'Clientes',
    icon: Database,
    description: 'Gestiona tu base de clientes',
    methods: [
      { method: 'GET', path: '/api/v1/clients', desc: 'Listar clientes' },
      { method: 'GET', path: '/api/v1/clients/:id', desc: 'Obtener cliente' },
      { method: 'POST', path: '/api/v1/clients', desc: 'Crear cliente' },
      { method: 'PATCH', path: '/api/v1/clients/:id', desc: 'Actualizar cliente' },
      { method: 'DELETE', path: '/api/v1/clients/:id', desc: 'Eliminar cliente' },
    ],
  },
  {
    category: 'Webhooks',
    icon: Webhook,
    description: 'Configura webhooks para eventos',
    methods: [
      { method: 'GET', path: '/api/v1/webhooks', desc: 'Listar webhooks' },
      { method: 'POST', path: '/api/v1/webhooks', desc: 'Crear webhook' },
      { method: 'DELETE', path: '/api/v1/webhooks/:id', desc: 'Eliminar webhook' },
    ],
  },
];

const quickStart = `# Instalación
npm install @kotkot/sdk

# Configuración
import Kotkot from '@kotkot/sdk';

const client = new Kotkot({
  apiKey: 'tu_api_key',
  environment: 'production', // o 'sandbox'
});

# Ejemplo: Listar conversaciones
const conversations = await client.conversations.list({
  limit: 10,
  status: 'active',
});

# Ejemplo: Crear una cotización
const quote = await client.quotes.create({
  clientId: 'cli_123',
  productType: 'auto',
  coverageAmount: 25000,
  duration: 12,
});`;

export default function ApiDocsPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* --- Page Header --- */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--text-primary)]">
            Para desarrolladores
            <span className="inline-block h-px w-10 bg-[var(--text-primary)]" />
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Documentación API
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Integra Kotkot con tus sistemas y flujos de trabajo existentes
            mediante nuestra API RESTful.
          </p>

          {/* Version badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[rgba(202,255,4,0.15)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]">
            <span className="h-2 w-2 rounded-[var(--radius-badge)] bg-[var(--accent)]" />
            API v1.0 — Estable
          </div>
        </div>

        {/* --- Features Grid --- */}
        <section className="mb-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                  <feature.icon className="h-6 w-6 text-[var(--text-primary)]" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Quick Start --- */}
        <section className="mb-20">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                <Code className="h-5 w-5 text-[var(--text-primary)]" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                Quick Start
              </h2>
            </div>
          </div>

          <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-hover)] px-6 py-3">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                JavaScript / TypeScript
              </span>
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-[var(--radius-badge)] bg-red-400" />
                <div className="h-3 w-3 rounded-[var(--radius-badge)] bg-yellow-400" />
                <div className="h-3 w-3 rounded-[var(--radius-badge)] bg-green-400" />
              </div>
            </div>
            <pre className="overflow-x-auto bg-slate-900 p-6 text-sm leading-relaxed text-slate-100">
              <code>{quickStart}</code>
            </pre>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-card)] border border-[rgba(202,255,4,0.40)] bg-[rgba(202,255,4,0.15)] p-4">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-primary)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Autenticación Requerida
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Para usar la API, necesitas un API key. Puedes generar una desde
                tu dashboard en <strong>Configuración → API Keys</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* --- Endpoints by Category --- */}
        <section className="mb-20">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                <BookOpen className="h-5 w-5 text-[var(--text-primary)]" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                Endpoints Disponibles
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {endpoints.map((category) => (
              <div key={category.category} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
                {/* Category header */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[rgba(202,255,4,0.15)]">
                    <category.icon className="h-6 w-6 text-[var(--text-primary)]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                      {category.category}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Methods */}
                <div className="space-y-3">
                  {category.methods.map((method, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-white p-4 transition-colors hover:bg-[var(--surface-hover)]"
                    >
                      <span
                        className={`inline-flex w-16 items-center justify-center rounded-[var(--radius-badge)] px-2 py-1 text-xs font-bold uppercase ${
                          method.method === 'GET'
                            ? 'bg-blue-100 text-blue-700'
                            : method.method === 'POST'
                            ? 'bg-green-100 text-green-700'
                            : method.method === 'PATCH'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {method.method}
                      </span>
                      <code className="flex-1 font-mono text-sm text-[var(--text-secondary)]">
                        {method.path}
                      </code>
                      <span className="text-sm text-[var(--text-secondary)]">{method.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Resources --- */}
        <section>
          <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Documentación Completa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Esta página es un resumen de la API. Para documentación completa con
              todos los parámetros, respuestas, códigos de error y ejemplos,
              visita nuestra documentación interactiva.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://docs.kotkot.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-[var(--accent)] border border-[rgba(202,255,4,0.40)] px-8 py-4 text-base font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--action-primary-hover)]"
              >
                <BookOpen className="h-5 w-5" />
                Ver Documentación Completa
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-white border border-[var(--border-default)] px-8 py-4 text-base font-semibold text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--surface-hover)]"
              >
                Contactar Soporte
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
