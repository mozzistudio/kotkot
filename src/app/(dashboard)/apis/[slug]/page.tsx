'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Clock,
  Shield,
  TrendingUp,
  DollarSign,
  FileText,
  Check,
  AlertTriangle,
  Settings,
  RefreshCw,
  Zap,
  Globe,
  Phone as PhoneIcon,
  Mail,
} from '@/components/shared/icon-map';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConnectionStatus = 'active' | 'pending' | 'error' | 'disconnected';
type InsuranceProduct = 'auto' | 'health' | 'home' | 'travel' | 'business';

interface InsurerDetail {
  slug: string;
  name: string;
  country: string;
  status: ConnectionStatus;
  products: InsuranceProduct[];
  apiType: 'api' | 'manual';
  lastHealthCheck: string;
  responseTime?: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  commissionRate: number;
  policiesSold: number;
  totalRevenue: string;
  avgResponseTime: string;
  uptime: string;
  recentQuotes: { id: string; client: string; type: string; price: string; date: string; status: string }[];
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const insurerData: Record<string, InsurerDetail> = {
  assa: {
    slug: 'assa',
    name: 'ASSA Compania de Seguros',
    country: 'Panama',
    status: 'active',
    products: ['auto', 'home', 'business'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '230ms',
    description: 'La aseguradora mas grande de Panama con mas de 30 anos de experiencia. Ofrece una amplia gama de productos de seguros con cobertura nacional e internacional.',
    website: 'www.assa.com.pa',
    phone: '+507 300-2772',
    email: 'contacto@assa.com.pa',
    commissionRate: 30,
    policiesSold: 48,
    totalRevenue: '$4,320',
    avgResponseTime: '230ms',
    uptime: '99.8%',
    recentQuotes: [
      { id: 'Q-001', client: 'Maria Gonzalez', type: 'Auto', price: '$85/mes', date: '2026-02-11', status: 'Enviada' },
      { id: 'Q-002', client: 'Carlos Perez', type: 'Auto', price: '$92/mes', date: '2026-02-11', status: 'Seleccionada' },
      { id: 'Q-004', client: 'Juan Martinez', type: 'Hogar', price: '$55/mes', date: '2026-02-10', status: 'Pagada' },
      { id: 'Q-007', client: 'Patricia Morales', type: 'Auto', price: '$88/mes', date: '2026-02-07', status: 'Pagada' },
    ],
  },
  mapfre: {
    slug: 'mapfre',
    name: 'Mapfre Panama',
    country: 'Panama',
    status: 'active',
    products: ['auto', 'health', 'home'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '180ms',
    description: 'Grupo asegurador multinacional con presencia en mas de 100 paises. En Panama ofrece seguros de auto, salud y hogar con solida respaldo internacional.',
    website: 'www.mapfre.com.pa',
    phone: '+507 265-7900',
    email: 'panama@mapfre.com',
    commissionRate: 28,
    policiesSold: 35,
    totalRevenue: '$3,150',
    avgResponseTime: '180ms',
    uptime: '99.5%',
    recentQuotes: [
      { id: 'Q-001', client: 'Maria Gonzalez', type: 'Auto', price: '$92/mes', date: '2026-02-11', status: 'Enviada' },
      { id: 'Q-002', client: 'Carlos Perez', type: 'Auto', price: '$105/mes', date: '2026-02-11', status: 'Enviada' },
      { id: 'Q-005', client: 'Laura Castillo', type: 'Salud', price: '$195/mes', date: '2026-02-09', status: 'Enviada' },
    ],
  },
  'pan-american-life': {
    slug: 'pan-american-life',
    name: 'Pan American Life',
    country: 'Panama',
    status: 'active',
    products: ['health', 'travel'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '310ms',
    description: 'Lider en seguros de salud y vida en Latinoamerica. Ofrece planes individuales y familiares con cobertura internacional y red de hospitales.',
    website: 'www.palig.com',
    phone: '+507 206-3600',
    email: 'panama@palig.com',
    commissionRate: 32,
    policiesSold: 28,
    totalRevenue: '$2,520',
    avgResponseTime: '310ms',
    uptime: '99.2%',
    recentQuotes: [
      { id: 'Q-003', client: 'Ana Rodriguez', type: 'Salud', price: '$145/mes', date: '2026-02-10', status: 'Generada' },
      { id: 'Q-005', client: 'Laura Castillo', type: 'Salud', price: '$180/mes', date: '2026-02-09', status: 'Enviada' },
    ],
  },
  suramericana: {
    slug: 'suramericana',
    name: 'Seguros Suramericana',
    country: 'Panama',
    status: 'active',
    products: ['auto', 'home'],
    apiType: 'api',
    lastHealthCheck: 'Hace 2 horas',
    responseTime: '280ms',
    description: 'Parte del Grupo Sura, una de las organizaciones financieras mas importantes de America Latina. Seguros de auto y hogar con excelente servicio al cliente.',
    website: 'www.segurossura.com.pa',
    phone: '+507 302-5000',
    email: 'panama@sura.com',
    commissionRate: 30,
    policiesSold: 22,
    totalRevenue: '$1,480',
    avgResponseTime: '280ms',
    uptime: '98.9%',
    recentQuotes: [
      { id: 'Q-001', client: 'Maria Gonzalez', type: 'Auto', price: '$110/mes', date: '2026-02-11', status: 'Enviada' },
      { id: 'Q-004', client: 'Juan Martinez', type: 'Hogar', price: '$45/mes', date: '2026-02-10', status: 'Pagada' },
    ],
  },
  'general-de-seguros': {
    slug: 'general-de-seguros',
    name: 'General de Seguros',
    country: 'Panama',
    status: 'active',
    products: ['auto'],
    apiType: 'api',
    lastHealthCheck: 'Hace 30 min',
    responseTime: '420ms',
    description: 'Aseguradora panameña especializada en seguros de vehiculos. Precios competitivos y atencion personalizada para corredores.',
    website: 'www.generaldeseguros.com',
    phone: '+507 227-4000',
    email: 'info@generaldeseguros.com',
    commissionRate: 25,
    policiesSold: 15,
    totalRevenue: '$620',
    avgResponseTime: '420ms',
    uptime: '97.5%',
    recentQuotes: [
      { id: 'Q-002', client: 'Carlos Perez', type: 'Auto', price: '$115/mes', date: '2026-02-11', status: 'Enviada' },
      { id: 'Q-007', client: 'Patricia Morales', type: 'Auto', price: '$78/mes', date: '2026-02-07', status: 'Pagada' },
    ],
  },
  'worldwide-medical': {
    slug: 'worldwide-medical',
    name: 'Worldwide Medical',
    country: 'Panama',
    status: 'active',
    products: ['health'],
    apiType: 'api',
    lastHealthCheck: 'Hace 10 min',
    responseTime: '350ms',
    description: 'Aseguradora de salud con cobertura internacional. Planes de salud premium con acceso a hospitales de clase mundial.',
    website: 'www.worldwidemedical.com',
    phone: '+507 340-5000',
    email: 'info@worldwidemedical.com',
    commissionRate: 30,
    policiesSold: 8,
    totalRevenue: '$360',
    avgResponseTime: '350ms',
    uptime: '99.1%',
    recentQuotes: [
      { id: 'Q-009', client: 'Sofia Vargas', type: 'Salud', price: '$275/mes', date: '2026-02-08', status: 'Pagada' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const productConfig: Record<InsuranceProduct, { label: string; icon: React.ReactNode; color: string }> = {
  auto: { label: 'Auto', icon: <Car className="h-3.5 w-3.5" />, color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
  health: { label: 'Salud', icon: <Heart className="h-3.5 w-3.5" />, color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
  home: { label: 'Hogar', icon: <Home className="h-3.5 w-3.5" />, color: 'bg-[var(--surface-panel)] text-[var(--text-secondary)] border border-[var(--border-default)]' },
  travel: { label: 'Viaje', icon: <Plane className="h-3.5 w-3.5" />, color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
  business: { label: 'Negocio', icon: <Briefcase className="h-3.5 w-3.5" />, color: 'bg-[var(--accent-light)] text-[var(--text-primary)] border border-[rgba(202,255,4,0.45)]' },
};

const statusConfig: Record<ConnectionStatus, { label: string; dotColor: string; bg: string; text: string; border: string }> = {
  active: { label: 'Activa', dotColor: 'bg-[var(--success)]', bg: 'bg-[rgba(16,185,129,0.12)]', text: 'text-[var(--success-fg)]', border: 'border border-[rgba(16,185,129,0.25)]' },
  pending: { label: 'Pendiente', dotColor: 'bg-[var(--accent)]', bg: 'bg-[var(--surface-panel)]', text: 'text-[var(--text-primary)]', border: 'border border-[var(--border-default)]' },
  error: { label: 'Error', dotColor: 'bg-[var(--error)]', bg: 'bg-[rgba(239,68,68,0.12)]', text: 'text-[var(--error)]', border: 'border border-[rgba(239,68,68,0.25)]' },
  disconnected: { label: 'No conectada', dotColor: 'bg-[var(--border-strong)]', bg: 'bg-[var(--surface-panel)]', text: 'text-[var(--text-secondary)]', border: 'border border-[var(--border-default)]' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InsurerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const insurer = insurerData[slug];

  if (!insurer) {
    return (
      <div className="min-h-screen p-6 lg:p-8">
        <Link href="/app/apis" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver a Aseguradoras
        </Link>
        <div className="rounded-xl border border-[var(--border)] bg-white p-12 text-center">
          <Building2 className="mx-auto h-10 w-10 text-[var(--text-tertiary)]" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">Aseguradora no encontrada</h2>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">No se encontro informacion para esta aseguradora.</p>
        </div>
      </div>
    );
  }

  const sc = statusConfig[insurer.status];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Back link */}
      <Link href="/app/apis" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver a Aseguradoras
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[var(--text-secondary)]">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-page-title">{insurer.name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sc.bg} ${sc.text} ${sc.border}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                {sc.label}
              </span>
              <span className="text-xs text-[var(--text-tertiary)]">{insurer.country}</span>
              <span className="text-xs text-[var(--text-tertiary)]">{insurer.apiType === 'manual' ? 'Tarifas manuales' : 'API directa'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]">
            <RefreshCw className="h-4 w-4" />
            Test Conexion
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]">
            <Settings className="h-4 w-4" />
            Configurar
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-5">
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Polizas Vendidas</span>
          </div>
          <p className="mt-2 text-xl font-bold text-[var(--text-primary)] font-data">{insurer.policiesSold}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">Ingresos</span>
          </div>
          <p className="mt-2 text-xl font-bold text-[var(--text-primary)] font-data">{insurer.totalRevenue}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Comision</span>
          </div>
          <p className="mt-2 text-xl font-bold text-[var(--success-fg)] font-data">{insurer.commissionRate}%</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <Zap className="h-4 w-4" />
            <span className="text-xs">Tiempo Respuesta</span>
          </div>
          <p className="mt-2 text-xl font-bold text-[var(--text-primary)] font-data">{insurer.avgResponseTime}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <Check className="h-4 w-4" />
            <span className="text-xs">Uptime</span>
          </div>
          <p className="mt-2 text-xl font-bold text-[var(--text-primary)] font-data">{insurer.uptime}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Info */}
        <div className="space-y-6">
          {/* About */}
          <div className="card">
            <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Informacion</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{insurer.description}</p>

            <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">{insurer.website}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <PhoneIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">{insurer.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">{insurer.email}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="card">
            <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Productos Disponibles</h2>
            <div className="space-y-2">
              {insurer.products.map((p) => {
                const pc = productConfig[p];
                return (
                  <div key={p} className="flex items-center gap-3 rounded-lg border border-[var(--border)]/60 px-4 py-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${pc.color}`}>
                      {pc.icon}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{pc.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* API Status */}
          <div className="card">
            <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Estado de la API</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-tertiary)]">Estado</span>
                <span className={`inline-flex items-center gap-1.5 ${sc.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                  {sc.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-tertiary)]">Ultimo chequeo</span>
                <span className="text-[var(--text-primary)]">{insurer.lastHealthCheck}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-tertiary)]">Tiempo de respuesta</span>
                <span className="text-[var(--text-primary)]">{insurer.responseTime ?? 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-tertiary)]">Uptime (30d)</span>
                <span className="text-[var(--text-primary)]">{insurer.uptime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Quotes */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-section-heading">Cotizaciones Recientes</h2>
              <span className="text-xs text-[var(--text-tertiary)]">{insurer.recentQuotes.length} cotizaciones</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">ID</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Cliente</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Tipo</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">Precio</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Fecha</th>
                    <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {insurer.recentQuotes.map((q) => (
                    <tr key={q.id + q.client} className="hover:bg-[var(--surface-panel)] transition-colors">
                      <td className="py-3 text-sm text-[var(--text-secondary)] font-data">{q.id}</td>
                      <td className="py-3 text-sm">
                        <Link
                          href={`/clients/${q.id.replace('Q-', 'C-')}`}
                          className="text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          {q.client}
                        </Link>
                      </td>
                      <td className="py-3 text-sm text-[var(--text-secondary)]">{q.type}</td>
                      <td className="py-3 text-sm text-[var(--success-fg)] text-right font-data font-semibold">{q.price}</td>
                      <td className="py-3 text-sm text-[var(--text-secondary)] font-data">{q.date}</td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          q.status === 'Pagada' ? 'bg-[rgba(16,185,129,0.12)] text-[var(--success-fg)]' :
                          q.status === 'Seleccionada' ? 'bg-[var(--surface-panel)] text-[var(--text-primary)]' :
                          q.status === 'Enviada' ? 'bg-[var(--accent-light)] text-[var(--text-primary)]' :
                          'bg-[var(--surface-panel)] text-[var(--text-secondary)]'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
