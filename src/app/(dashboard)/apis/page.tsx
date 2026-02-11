'use client';

import { useState } from 'react';
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
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConnectionStatus = 'active' | 'pending' | 'error' | 'disconnected';

type InsuranceProduct = 'auto' | 'health' | 'home' | 'travel' | 'business';

interface Insurer {
  id: string;
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
  active: { label: 'Activa', dotColor: 'bg-emerald-500', badgeBg: 'bg-emerald-500/15', badgeText: 'text-emerald-400', badgeBorder: 'border-emerald-500/30' },
  pending: { label: 'Pendiente', dotColor: 'bg-amber-500', badgeBg: 'bg-amber-500/15', badgeText: 'text-amber-400', badgeBorder: 'border-amber-500/30' },
  error: { label: 'Error', dotColor: 'bg-red-500', badgeBg: 'bg-red-500/15', badgeText: 'text-red-400', badgeBorder: 'border-red-500/30' },
  disconnected: { label: 'No conectada', dotColor: 'bg-slate-500', badgeBg: 'bg-slate-500/15', badgeText: 'text-slate-400', badgeBorder: 'border-slate-500/30' },
};

const productConfig: Record<InsuranceProduct, { label: string; icon: React.ReactNode; color: string }> = {
  auto: { label: 'Auto', icon: <Car className="h-3 w-3" />, color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  health: { label: 'Salud', icon: <Heart className="h-3 w-3" />, color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  home: { label: 'Hogar', icon: <Home className="h-3 w-3" />, color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  travel: { label: 'Viaje', icon: <Plane className="h-3 w-3" />, color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  business: { label: 'Negocio', icon: <Briefcase className="h-3 w-3" />, color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ApisPage() {
  const demoCountry = 'PA';
  const filtered = insurers.filter((ins) => ins.country === demoCountry);
  const activeCount = filtered.filter((i) => i.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#080c14] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 font-heading">
            Aseguradoras Conectadas
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {activeCount} de {filtered.length} aseguradoras activas en Panama
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/20">
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
            <div key={s} className="rounded-lg border border-[#1e293b] bg-[#0d1117] p-3">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${sc.dotColor}`} />
                <span className="text-xs text-slate-400">{sc.label}</span>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-200 font-data">{count}</p>
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
              className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-5 transition-all hover:border-[#1e293b]"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#080c14] text-slate-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{insurer.name}</h3>
                    <span className="text-xs text-slate-500">
                      {insurer.apiType === 'manual' ? 'Tarifas manuales' : 'API directa'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${sc.badgeBg} ${sc.badgeText} ${sc.badgeBorder}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${sc.dotColor}`} />
                  {sc.label}
                </span>
                {insurer.responseTime && insurer.status === 'active' && (
                  <span className="text-xs text-slate-500">{insurer.responseTime}</span>
                )}
                {insurer.status === 'error' && (
                  <span className="text-xs text-red-400">{insurer.responseTime}</span>
                )}
              </div>

              {/* Products */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {insurer.products.map((p) => {
                  const pc = productConfig[p];
                  return (
                    <span
                      key={p}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${pc.color}`}
                    >
                      {pc.icon}
                      {pc.label}
                    </span>
                  );
                })}
              </div>

              {/* Health Check */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                Ultimo chequeo: {insurer.lastHealthCheck}
              </div>

              {/* Action Button */}
              <div className="mt-4 border-t border-[#1e293b] pt-4">
                {insurer.status === 'disconnected' ? (
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/15 transition-all hover:shadow-emerald-500/25 hover:brightness-110">
                    <Link2 className="h-4 w-4" />
                    Conectar
                  </button>
                ) : insurer.status === 'error' ? (
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20">
                    <RefreshCw className="h-4 w-4" />
                    Reintentar Conexion
                  </button>
                ) : (
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#1e293b] bg-[#080c14] px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-emerald-500/30 hover:text-emerald-400">
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
