'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  AlertTriangle,
  XCircle,
  Link2,
  Settings,
  Clock,
  Upload,
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Building2,
  RefreshCw,
  Shield,
} from '@/components/shared/icon-map';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConnectionStatus = 'active' | 'pending' | 'error' | 'disconnected';

type InsuranceProduct = 'auto' | 'health' | 'home' | 'travel' | 'business';

interface Insurer {
  id: string;
  slug: string;
  name: string;
  country: string;
  status: ConnectionStatus;
  products: InsuranceProduct[];
  apiType: 'api' | 'manual';
  lastHealthCheck: string;
  responseTime?: string;
}

// ---------------------------------------------------------------------------
// Demo Data (filtered for Panama 'PA')
// ---------------------------------------------------------------------------

const insurers: Insurer[] = [
  {
    id: 'ins-1',
    slug: 'assa',
    name: 'ASSA Compania de Seguros',
    country: 'PA',
    status: 'active',
    products: ['auto', 'home', 'business'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '230ms',
  },
  {
    id: 'ins-2',
    slug: 'mapfre',
    name: 'Mapfre Panama',
    country: 'PA',
    status: 'active',
    products: ['auto', 'health', 'home'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '180ms',
  },
  {
    id: 'ins-3',
    slug: 'pan-american-life',
    name: 'Pan American Life',
    country: 'PA',
    status: 'active',
    products: ['health', 'travel'],
    apiType: 'api',
    lastHealthCheck: 'Hace 5 min',
    responseTime: '310ms',
  },
  {
    id: 'ins-4',
    slug: 'suramericana',
    name: 'Seguros Suramericana',
    country: 'PA',
    status: 'pending',
    products: ['auto', 'home'],
    apiType: 'api',
    lastHealthCheck: 'Hace 2 horas',
    responseTime: undefined,
  },
  {
    id: 'ins-5',
    slug: 'general-de-seguros',
    name: 'General de Seguros',
    country: 'PA',
    status: 'error',
    products: ['auto'],
    apiType: 'api',
    lastHealthCheck: 'Hace 30 min',
    responseTime: 'Timeout',
  },
  {
    id: 'ins-6',
    slug: 'bupa',
    name: 'BUPA Panama',
    country: 'PA',
    status: 'disconnected',
    products: ['health'],
    apiType: 'api',
    lastHealthCheck: 'Nunca',
    responseTime: undefined,
  },
  {
    id: 'ins-7',
    slug: 'cigna',
    name: 'Cigna International',
    country: 'PA',
    status: 'disconnected',
    products: ['health', 'travel'],
    apiType: 'api',
    lastHealthCheck: 'Nunca',
    responseTime: undefined,
  },
  {
    id: 'ins-8',
    slug: 'ancon',
    name: 'Aseguradora Nacional (ANCON)',
    country: 'PA',
    status: 'active',
    products: ['auto', 'home'],
    apiType: 'manual',
    lastHealthCheck: 'N/A (manual)',
    responseTime: undefined,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<ConnectionStatus, { label: string; dotColor: string; badgeBg: string; badgeText: string; badgeBorder: string }> = {
  active: { label: 'Activa', dotColor: 'bg-[var(--success)]', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700', badgeBorder: 'border-emerald-200' },
  pending: { label: 'Pendiente', dotColor: 'bg-amber-500', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', badgeBorder: 'border-amber-200' },
  error: { label: 'Error', dotColor: 'bg-red-500', badgeBg: 'bg-red-50', badgeText: 'text-red-700', badgeBorder: 'border-red-200' },
  disconnected: { label: 'No conectada', dotColor: 'bg-slate-400', badgeBg: 'bg-slate-100', badgeText: 'text-slate-600', badgeBorder: 'border-slate-200' },
};

const productConfig: Record<InsuranceProduct, { label: string; icon: React.ReactNode; color: string }> = {
  auto: { label: 'Auto', icon: <Car className="h-3 w-3" />, color: 'bg-sky-50 text-sky-700 border border-sky-200' },
  health: { label: 'Salud', icon: <Heart className="h-3 w-3" />, color: 'bg-rose-50 text-rose-700 border border-rose-200' },
  home: { label: 'Hogar', icon: <Home className="h-3 w-3" />, color: 'bg-amber-50 text-amber-700 border border-amber-200' },
  travel: { label: 'Viaje', icon: <Plane className="h-3 w-3" />, color: 'bg-purple-50 text-purple-700 border border-purple-200' },
  business: { label: 'Negocio', icon: <Briefcase className="h-3 w-3" />, color: 'bg-teal-50 text-teal-700 border border-teal-200' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ApisPage() {
  const demoCountry = 'PA';
  const filtered = insurers.filter((ins) => ins.country === demoCountry);
  const activeCount = filtered.filter((i) => i.status === 'active').length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-page-title">
            Aseguradoras Conectadas
          </h1>
          <p className="mt-1 text-body">
            {activeCount} de {filtered.length} aseguradoras activas en Panama
          </p>
        </div>

        <button className="btn-secondary text-[var(--warning)]">
          <Upload className="h-4 w-4" />
          Subir Tabla de Tarifas
        </button>
      </div>

      {/* Summary bar */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['active', 'pending', 'error', 'disconnected'] as ConnectionStatus[]).map((s) => {
          const sc = statusConfig[s];
          const count = filtered.filter((i) => i.status === s).length;
          return (
            <div key={s} className="card p-3">
              <div className="flex items-center gap-2">
                <span className={`status-dot ${sc.dotColor === 'bg-[var(--success)]' ? 'status-dot-success' : sc.dotColor === 'bg-red-500' ? 'status-dot-error' : sc.dotColor === 'bg-amber-500' ? 'status-dot-warning' : ''}`} />
                <span className="text-xs text-[var(--text-secondary)]">{sc.label}</span>
              </div>
              <p className="mt-1 text-lg font-bold text-[var(--text-primary)] font-data">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Insurer Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((insurer) => {
          const sc = statusConfig[insurer.status];
          return (
            <div
              key={insurer.id}
              className="card"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <Link href={`/apis/${insurer.slug}`} className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--text-link)] transition-colors">
                      {insurer.name}
                    </Link>
                    <span className="block text-xs text-[var(--text-tertiary)]">
                      {insurer.apiType === 'manual' ? 'Tarifas manuales' : 'API directa'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`badge ${sc.badgeBg} ${sc.badgeText} ${sc.badgeBorder}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                  {sc.label}
                </span>
                {insurer.responseTime && insurer.status === 'active' && (
                  <span className="text-xs text-[var(--text-tertiary)]">{insurer.responseTime}</span>
                )}
                {insurer.status === 'error' && (
                  <span className="text-xs text-[var(--error)]">{insurer.responseTime}</span>
                )}
              </div>

              {/* Products */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {insurer.products.map((p) => {
                  const pc = productConfig[p];
                  return (
                    <span
                      key={p}
                      className={`badge ${pc.color}`}
                    >
                      {pc.icon}
                      {pc.label}
                    </span>
                  );
                })}
              </div>

              {/* Health Check */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
                <Clock className="h-3 w-3" />
                Ultimo chequeo: {insurer.lastHealthCheck}
              </div>

              {/* Action Button */}
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                {insurer.status === 'disconnected' ? (
                  <button className="btn-primary w-full">
                    <Link2 className="h-4 w-4" />
                    Conectar
                  </button>
                ) : insurer.status === 'error' ? (
                  <button className="btn-secondary w-full text-[var(--error)]">
                    <RefreshCw className="h-4 w-4" />
                    Reintentar Conexion
                  </button>
                ) : (
                  <button className="btn-secondary w-full">
                    <Settings className="h-4 w-4" />
                    Configurar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
