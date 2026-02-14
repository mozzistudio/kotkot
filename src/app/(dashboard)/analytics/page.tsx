'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Target,
  Clock,
  DollarSign,
  Calendar,
  BarChart3,
  ArrowDown,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DateRange = '7d' | '30d' | '90d';

interface KPI {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
}

interface DailyConversation {
  day: string;
  value: number;
}

interface InsuranceTypeDist {
  type: string;
  percentage: number;
  color: string;
}

interface TopInsurer {
  name: string;
  sales: number;
  revenue: string;
}

interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const dateRanges: { key: DateRange; label: string }[] = [
  { key: '7d', label: 'Ultimos 7 dias' },
  { key: '30d', label: 'Ultimos 30 dias' },
  { key: '90d', label: 'Ultimos 90 dias' },
];

const kpiByRange: Record<DateRange, KPI[]> = {
  '7d': [
    { label: 'Total Conversaciones', value: '168', change: '+12%', changeType: 'up', icon: <MessageSquare className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Tasa de Conversion', value: '34.5%', change: '+3.2%', changeType: 'up', icon: <Target className="h-5 w-5 text-[var(--chart-dot)]" /> },
    { label: 'Tiempo Prom. Cotizacion', value: '2.4 min', change: '-18%', changeType: 'up', icon: <Clock className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Ingresos Totales', value: '$4,280', change: '+22%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--chart-dot)]" /> },
  ],
  '30d': [
    { label: 'Total Conversaciones', value: '682', change: '+18%', changeType: 'up', icon: <MessageSquare className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Tasa de Conversion', value: '31.2%', change: '+5.1%', changeType: 'up', icon: <Target className="h-5 w-5 text-[var(--chart-dot)]" /> },
    { label: 'Tiempo Prom. Cotizacion', value: '2.8 min', change: '-12%', changeType: 'up', icon: <Clock className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Ingresos Totales', value: '$12,450', change: '+15%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--chart-dot)]" /> },
  ],
  '90d': [
    { label: 'Total Conversaciones', value: '1,847', change: '+45%', changeType: 'up', icon: <MessageSquare className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Tasa de Conversion', value: '29.8%', change: '+8.3%', changeType: 'up', icon: <Target className="h-5 w-5 text-[var(--chart-dot)]" /> },
    { label: 'Tiempo Prom. Cotizacion', value: '3.1 min', change: '-24%', changeType: 'up', icon: <Clock className="h-5 w-5 text-[var(--chart-line)]" /> },
    { label: 'Ingresos Totales', value: '$38,920', change: '+52%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--chart-dot)]" /> },
  ],
};

const dailyConversations: DailyConversation[] = [
  { day: 'Lun', value: 32 },
  { day: 'Mar', value: 45 },
  { day: 'Mie', value: 28 },
  { day: 'Jue', value: 51 },
  { day: 'Vie', value: 42 },
  { day: 'Sab', value: 18 },
  { day: 'Dom', value: 12 },
];

const insuranceDistribution: InsuranceTypeDist[] = [
  { type: 'Auto', percentage: 45, color: 'bg-sky-500' },
  { type: 'Salud', percentage: 25, color: 'bg-rose-500' },
  { type: 'Hogar', percentage: 15, color: 'bg-amber-500' },
  { type: 'Viaje', percentage: 10, color: 'bg-purple-500' },
  { type: 'Negocio', percentage: 5, color: 'bg-[#059669]' },
];

const topInsurers: TopInsurer[] = [
  { name: 'ASSA', sales: 48, revenue: '$4,320' },
  { name: 'Mapfre', sales: 35, revenue: '$3,150' },
  { name: 'Pan American Life', sales: 28, revenue: '$2,520' },
  { name: 'Suramericana', sales: 22, revenue: '$1,980' },
  { name: 'General de Seguros', sales: 15, revenue: '$1,350' },
];

const funnelSteps: FunnelStep[] = [
  { label: 'Conversaciones', value: 682, percentage: 100, color: 'from-slate-500 to-slate-400' },
  { label: 'Cotizaciones', value: 412, percentage: 60, color: 'from-blue-500 to-blue-400' },
  { label: 'Seleccion', value: 213, percentage: 31, color: 'from-amber-500 to-amber-400' },
  { label: 'Pago', value: 156, percentage: 23, color: 'from-[#10b981] to-[#059669]' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const kpis = kpiByRange[dateRange];
  const maxDaily = Math.max(...dailyConversations.map((d) => d.value));
  const maxInsurerSales = Math.max(...topInsurers.map((i) => i.sales));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-page-title">Analiticas</h1>
          <p className="mt-1 text-body">
            Metricas y desempeno de tu negocio
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-1.5 rounded-lg border border-[var(--border)] bg-white p-1">
          {dateRanges.map((dr) => (
            <button
              key={dr.key}
              onClick={() => setDateRange(dr.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                dateRange === dr.key
                  ? 'bg-[#0C1E35] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {dr.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[var(--surface-secondary)] p-2.5">{kpi.icon}</div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${kpi.changeType === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                {kpi.changeType === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)] font-data">{kpi.value}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversaciones por dia */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-section-heading">Conversaciones por Dia</h2>
            <BarChart3 className="h-4 w-4 text-[var(--text-tertiary)]" />
          </div>
          <div className="flex items-end justify-between gap-3" style={{ height: 180 }}>
            {dailyConversations.map((d) => {
              const heightPct = (d.value / maxDaily) * 100;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)] font-data">{d.value}</span>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-8 rounded-t-md bg-[var(--chart-line)] transition-all duration-300"
                      style={{ height: `${heightPct}%`, minHeight: 8 }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribution by insurance type */}
        <div className="card">
          <h2 className="mb-4 text-section-heading">
            Distribucion por Tipo de Seguro
          </h2>
          <div className="space-y-4">
            {insuranceDistribution.map((item) => (
              <div key={item.type}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-[var(--text-primary)]">{item.type}</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)] font-data">{item.percentage}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top insurers by sales */}
        <div className="card">
          <h2 className="mb-4 text-section-heading">
            Top Aseguradoras por Ventas
          </h2>
          <div className="space-y-3">
            {topInsurers.map((insurer, idx) => (
              <div key={insurer.name} className="flex items-center gap-3">
                <span className="w-5 text-right text-xs font-semibold text-[var(--text-tertiary)]">{idx + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-[var(--text-primary)]">{insurer.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[var(--text-secondary)]">{insurer.sales} ventas</span>
                      <span className="font-semibold text-[var(--success)] font-data">{insurer.revenue}</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${(insurer.sales / maxInsurerSales) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="card">
          <h2 className="mb-4 text-section-heading">
            Embudo de Conversion
          </h2>
          <div className="space-y-3">
            {funnelSteps.map((step, idx) => (
              <div key={step.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-[var(--text-primary)]">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)] font-data">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="badge badge-dark-blue">
                      {step.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-8 overflow-hidden rounded-lg bg-[var(--surface-secondary)]">
                  <div
                    className={`flex h-full items-center justify-center rounded-lg bg-gradient-to-r ${step.color} transition-all duration-500`}
                    style={{ width: `${step.percentage}%` }}
                  >
                    {step.percentage > 15 && (
                      <span className="text-xs font-medium text-white/80">{step.value.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {idx < funnelSteps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-3.5 w-3.5 text-[var(--border-medium)]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion rate callout */}
          <div className="mt-4 rounded-lg border border-[rgba(12,30,53,0.12)] bg-[rgba(12,30,53,0.04)] p-3 text-center">
            <p className="text-xs text-[var(--text-secondary)]">Tasa de conversion total</p>
            <p className="text-xl font-bold text-[var(--success)] font-data">22.9%</p>
            <p className="text-xs text-[var(--text-tertiary)]">Conversacion a Pago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
