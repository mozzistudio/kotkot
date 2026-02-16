'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Award,
  ShieldCheck,
  Receipt,
  BarChart3,
  CreditCard,
  Smartphone,
  ArrowUpRight,
  ArrowDownRight,
} from '@/components/shared/icon-map';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DateRange = '7d' | '30d' | '90d' | '12m';

interface KPI {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
}

interface RevenueBar {
  label: string;
  value: number;
}

interface InsuranceTypeRevenue {
  type: string;
  percentage: number;
  amount: string;
  color: string;
}

interface InsurerRevenue {
  name: string;
  slug: string;
  policiesSold: number;
  totalRevenue: string;
  commissionPct: number;
  commissionAmount: string;
}

interface Transaction {
  id: string;
  fecha: string;
  cliente: string;
  tipoSeguro: string;
  aseguradora: string;
  prima: string;
  comision: string;
  estado: 'pagado' | 'pendiente' | 'cancelado';
}

interface PaymentMethod {
  name: string;
  percentage: number;
  amount: string;
  color: string;
  icon: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const dateRanges: { key: DateRange; label: string }[] = [
  { key: '7d', label: '7 dias' },
  { key: '30d', label: '30 dias' },
  { key: '90d', label: '90 dias' },
  { key: '12m', label: '12 meses' },
];

const kpiByRange: Record<DateRange, KPI[]> = {
  '7d': [
    { label: 'Ingresos Totales', value: '$3,120', change: '+8.2%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Comisiones Ganadas', value: '$936', change: '+6.1%', changeType: 'up', icon: <Award className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Polizas Activas', value: '142', change: '+3', changeType: 'up', icon: <ShieldCheck className="h-5 w-5 text-[var(--accent)]" /> },
    { label: 'Ticket Promedio', value: '$72.10', change: '-2.3%', changeType: 'down', icon: <Receipt className="h-5 w-5 text-[var(--accent)]" /> },
  ],
  '30d': [
    { label: 'Ingresos Totales', value: '$12,450', change: '+15.3%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Comisiones Ganadas', value: '$3,735', change: '+12.8%', changeType: 'up', icon: <Award className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Polizas Activas', value: '156', change: '+14', changeType: 'up', icon: <ShieldCheck className="h-5 w-5 text-[var(--accent)]" /> },
    { label: 'Ticket Promedio', value: '$79.80', change: '+4.1%', changeType: 'up', icon: <Receipt className="h-5 w-5 text-[var(--accent)]" /> },
  ],
  '90d': [
    { label: 'Ingresos Totales', value: '$38,920', change: '+22.7%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Comisiones Ganadas', value: '$11,676', change: '+19.4%', changeType: 'up', icon: <Award className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Polizas Activas', value: '156', change: '+38', changeType: 'up', icon: <ShieldCheck className="h-5 w-5 text-[var(--accent)]" /> },
    { label: 'Ticket Promedio', value: '$83.50', change: '+7.6%', changeType: 'up', icon: <Receipt className="h-5 w-5 text-[var(--accent)]" /> },
  ],
  '12m': [
    { label: 'Ingresos Totales', value: '$148,600', change: '+45.2%', changeType: 'up', icon: <DollarSign className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Comisiones Ganadas', value: '$44,580', change: '+41.8%', changeType: 'up', icon: <Award className="h-5 w-5 text-[var(--text-primary)]" /> },
    { label: 'Polizas Activas', value: '156', change: '+89', changeType: 'up', icon: <ShieldCheck className="h-5 w-5 text-[var(--accent)]" /> },
    { label: 'Ticket Promedio', value: '$86.20', change: '+11.3%', changeType: 'up', icon: <Receipt className="h-5 w-5 text-[var(--accent)]" /> },
  ],
};

const revenueBarsByRange: Record<DateRange, RevenueBar[]> = {
  '7d': [
    { label: 'Lun', value: 520 },
    { label: 'Mar', value: 680 },
    { label: 'Mie', value: 390 },
    { label: 'Jue', value: 710 },
    { label: 'Vie', value: 540 },
    { label: 'Sab', value: 180 },
    { label: 'Dom', value: 100 },
  ],
  '30d': [
    { label: 'Sem 1', value: 2800 },
    { label: 'Sem 2', value: 3200 },
    { label: 'Sem 3', value: 2950 },
    { label: 'Sem 4', value: 3500 },
  ],
  '90d': [
    { label: 'Ene', value: 11200 },
    { label: 'Feb', value: 13400 },
    { label: 'Mar', value: 14320 },
  ],
  '12m': [
    { label: 'Ene', value: 9800 },
    { label: 'Feb', value: 10200 },
    { label: 'Mar', value: 11500 },
    { label: 'Abr', value: 10800 },
    { label: 'May', value: 12100 },
    { label: 'Jun', value: 13200 },
    { label: 'Jul', value: 11900 },
    { label: 'Ago', value: 12800 },
    { label: 'Sep', value: 13600 },
    { label: 'Oct', value: 14200 },
    { label: 'Nov', value: 14800 },
    { label: 'Dic', value: 13700 },
  ],
};

const insuranceTypeRevenue: InsuranceTypeRevenue[] = [
  { type: 'Auto', percentage: 45, amount: '$5,603', color: 'bg-[var(--accent)]' },
  { type: 'Salud', percentage: 25, amount: '$3,113', color: 'bg-[var(--accent)]' },
  { type: 'Hogar', percentage: 15, amount: '$1,868', color: 'bg-[var(--accent)]' },
  { type: 'Viaje', percentage: 10, amount: '$1,245', color: 'bg-[var(--accent)]' },
  { type: 'Negocio', percentage: 5, amount: '$623', color: 'bg-[var(--surface-inverse)]' },
];

const insurerRevenue: InsurerRevenue[] = [
  { name: 'ASSA Compania de Seguros', slug: 'assa', policiesSold: 48, totalRevenue: '$4,320', commissionPct: 30, commissionAmount: '$1,296' },
  { name: 'Mapfre Panama', slug: 'mapfre', policiesSold: 35, totalRevenue: '$3,150', commissionPct: 28, commissionAmount: '$882' },
  { name: 'Pan American Life', slug: 'pan-american-life', policiesSold: 28, totalRevenue: '$2,520', commissionPct: 32, commissionAmount: '$806' },
  { name: 'Suramericana', slug: 'suramericana', policiesSold: 22, totalRevenue: '$1,480', commissionPct: 30, commissionAmount: '$444' },
  { name: 'General de Seguros', slug: 'general-de-seguros', policiesSold: 15, totalRevenue: '$620', commissionPct: 25, commissionAmount: '$155' },
  { name: 'Worldwide Medical', slug: 'worldwide-medical', policiesSold: 8, totalRevenue: '$360', commissionPct: 30, commissionAmount: '$108' },
];

const recentTransactions: Transaction[] = [
  { id: 'TX-001', fecha: '2026-02-11', cliente: 'Maria Gonzalez', tipoSeguro: 'Auto', aseguradora: 'ASSA', prima: '$185.00', comision: '$55.50', estado: 'pagado' },
  { id: 'TX-002', fecha: '2026-02-10', cliente: 'Carlos Mendez', tipoSeguro: 'Salud', aseguradora: 'Mapfre', prima: '$320.00', comision: '$89.60', estado: 'pagado' },
  { id: 'TX-003', fecha: '2026-02-10', cliente: 'Ana Rodriguez', tipoSeguro: 'Hogar', aseguradora: 'Pan American Life', prima: '$145.00', comision: '$46.40', estado: 'pendiente' },
  { id: 'TX-004', fecha: '2026-02-09', cliente: 'Roberto Silva', tipoSeguro: 'Auto', aseguradora: 'ASSA', prima: '$210.00', comision: '$63.00', estado: 'pagado' },
  { id: 'TX-005', fecha: '2026-02-09', cliente: 'Laura Chen', tipoSeguro: 'Viaje', aseguradora: 'Suramericana', prima: '$95.00', comision: '$28.50', estado: 'pagado' },
  { id: 'TX-006', fecha: '2026-02-08', cliente: 'Pedro Castillo', tipoSeguro: 'Negocio', aseguradora: 'General de Seguros', prima: '$450.00', comision: '$112.50', estado: 'pendiente' },
  { id: 'TX-007', fecha: '2026-02-08', cliente: 'Sofia Vargas', tipoSeguro: 'Salud', aseguradora: 'Worldwide Medical', prima: '$275.00', comision: '$82.50', estado: 'pagado' },
  { id: 'TX-008', fecha: '2026-02-07', cliente: 'Diego Morales', tipoSeguro: 'Auto', aseguradora: 'Mapfre', prima: '$165.00', comision: '$46.20', estado: 'cancelado' },
  { id: 'TX-009', fecha: '2026-02-07', cliente: 'Isabella Torres', tipoSeguro: 'Hogar', aseguradora: 'ASSA', prima: '$190.00', comision: '$57.00', estado: 'pagado' },
  { id: 'TX-010', fecha: '2026-02-06', cliente: 'Miguel Herrera', tipoSeguro: 'Auto', aseguradora: 'Pan American Life', prima: '$225.00', comision: '$72.00', estado: 'pagado' },
];

const paymentMethods: PaymentMethod[] = [
  { name: 'Yappy', percentage: 62, amount: '$7,719', color: 'from-[var(--accent)] to-[var(--accent-hover)]', icon: <Smartphone className="h-5 w-5" /> },
  { name: 'Stripe', percentage: 38, amount: '$4,731', color: 'from-[var(--accent)] to-[var(--accent-hover)]', icon: <CreditCard className="h-5 w-5" /> },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getEstadoBadge(estado: Transaction['estado']) {
  switch (estado) {
    case 'pagado':
      return <span className="inline-flex items-center rounded-full bg-[rgba(16,185,129,0.12)] px-2.5 py-0.5 text-xs font-semibold text-[var(--success-fg)]">Pagado</span>;
    case 'pendiente':
      return <span className="inline-flex items-center rounded-full bg-[rgba(245,158,11,0.12)] px-2.5 py-0.5 text-xs font-semibold text-[var(--warning-fg)]">Pendiente</span>;
    case 'cancelado':
      return <span className="inline-flex items-center rounded-full bg-[rgba(239,68,68,0.12)] px-2.5 py-0.5 text-xs font-semibold text-[var(--danger-fg)]">Cancelado</span>;
  }
}

function formatCurrency(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IngresosPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const kpis = kpiByRange[dateRange];
  const revenueBars = revenueBarsByRange[dateRange];
  const maxRevenue = Math.max(...revenueBars.map((b) => b.value));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-page-title">Ingresos</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Resumen de ingresos, comisiones y transacciones
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
                  ? 'bg-[var(--accent)] text-[var(--text-primary)]'
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
              <div className="rounded-lg p-2.5">{kpi.icon}</div>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  kpi.changeType === 'up' ? 'text-[var(--success-fg)]' : 'text-[var(--danger-fg)]'
                }`}
              >
                {kpi.changeType === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {kpi.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)] font-data">{kpi.value}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-section-heading">Ingresos por Periodo</h2>
            <BarChart3 className="h-4 w-4 text-[var(--text-tertiary)]" />
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
            {revenueBars.map((bar) => {
              const heightPct = (bar.value / maxRevenue) * 100;
              return (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] text-[var(--text-secondary)] font-data">
                    {formatCurrency(bar.value)}
                  </span>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-8 rounded-t-md bg-[var(--surface-inverse)] transition-all duration-300"
                      style={{ height: `${heightPct}%`, minHeight: 8 }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">{bar.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue by Insurance Type */}
        <div className="card">
          <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
            Ingresos por Tipo de Seguro
          </h2>
          <div className="space-y-4">
            {insuranceTypeRevenue.map((item) => (
              <div key={item.type}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-[var(--text-primary)]">{item.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--text-secondary)]">{item.percentage}%</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)] font-data">
                      {item.amount}
                    </span>
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Insurer Table */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
            Ingresos por Aseguradora
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                    Aseguradora
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Polizas
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Ingresos
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Comision %
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Comision
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-default)]">
                {insurerRevenue.map((insurer) => (
                  <tr key={insurer.name} className="group hover:bg-[var(--surface-panel)] transition-colors">
                    <td className="py-3 text-sm">
                      <Link
                        href={`/apis/${insurer.slug}`}
                        className="text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {insurer.name}
                      </Link>
                    </td>
                    <td className="py-3 text-sm text-[var(--text-primary)] text-right font-data">
                      {insurer.policiesSold}
                    </td>
                    <td className="py-3 text-sm text-[var(--text-primary)] text-right font-data font-semibold">
                      {insurer.totalRevenue}
                    </td>
                    <td className="py-3 text-sm text-[var(--text-secondary)] text-right font-data">
                      {insurer.commissionPct}%
                    </td>
                    <td className="py-3 text-sm text-[var(--success-fg)] text-right font-data font-semibold">
                      {insurer.commissionAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-section-heading">Transacciones Recientes</h2>
            <span className="text-xs text-[var(--text-tertiary)]">Ultimas 10 transacciones</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                    Fecha
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                    Cliente
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                    Tipo de Seguro
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                    Aseguradora
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Prima
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-right">
                    Comision
                  </th>
                  <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)] text-center">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-default)]">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-[var(--surface-panel)] transition-colors">
                    <td className="py-3 text-sm text-[var(--text-secondary)] font-data">{tx.fecha}</td>
                    <td className="py-3 text-sm">
                      <Link
                        href={`/clients/${tx.id.replace('TX-', 'C-')}`}
                        className="text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {tx.cliente}
                      </Link>
                    </td>
                    <td className="py-3 text-sm text-[var(--text-primary)]">{tx.tipoSeguro}</td>
                    <td className="py-3 text-sm">
                      <Link
                        href={`/apis/${tx.aseguradora.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {tx.aseguradora}
                      </Link>
                    </td>
                    <td className="py-3 text-sm text-[var(--text-primary)] text-right font-data font-semibold">
                      {tx.prima}
                    </td>
                    <td className="py-3 text-sm text-[var(--success-fg)] text-right font-data font-semibold">
                      {tx.comision}
                    </td>
                    <td className="py-3 text-center">{getEstadoBadge(tx.estado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 lg:col-span-2">
          <h2 className="mb-6 text-base font-semibold text-[var(--text-primary)]">
            Metodo de Pago
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Pie-chart-like visual */}
            <div className="flex items-center justify-center">
              <div className="relative h-48 w-48">
                {/* Background ring */}
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {/* Yappy slice */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#yappyGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${62 * 2.51327} ${100 * 2.51327}`}
                    strokeDashoffset="0"
                    className="transition-all duration-700"
                  />
                  {/* Stripe slice */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#stripeGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${38 * 2.51327} ${100 * 2.51327}`}
                    strokeDashoffset={`${-62 * 2.51327}`}
                    className="transition-all duration-700"
                  />
                  <defs>
                    <linearGradient id="yappyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-brand-yappy-1)" />
                      <stop offset="100%" stopColor="var(--color-brand-yappy-2)" />
                    </linearGradient>
                    <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-brand-stripe-1)" />
                      <stop offset="100%" stopColor="var(--color-brand-stripe-2)" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-[var(--text-primary)] font-data">$12,450</span>
                  <span className="text-xs text-[var(--text-tertiary)]">Total</span>
                </div>
              </div>
            </div>

            {/* Legend and breakdown */}
            <div className="flex flex-col justify-center space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="rounded-lg border border-[var(--border)] p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${method.color} text-white`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{method.name}</span>
                        <span className="text-sm font-bold text-[var(--text-primary)] font-data">
                          {method.amount}
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${method.color} transition-all duration-500`}
                          style={{ width: `${method.percentage}%` }}
                        />
                      </div>
                      <span className="mt-1 text-xs text-[var(--text-tertiary)]">{method.percentage}% del total</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
