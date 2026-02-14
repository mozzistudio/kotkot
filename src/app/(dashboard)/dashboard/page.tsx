'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  FileText,
  Shield,
  DollarSign,
  ArrowRight,
  Bot,
  Link2,
  TrendingUp,
  Clock,
  Phone,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
  href: string;
}

interface RecentConversation {
  id: string;
  clientName: string;
  phone: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'waiting' | 'human' | 'closed';
}

// ---------------------------------------------------------------------------
// Demo Data
// ---------------------------------------------------------------------------

const stats: StatCard[] = [
  {
    label: 'Conversaciones Activas',
    value: '24',
    change: '+12%',
    changeType: 'up',
    icon: <MessageSquare className="h-5 w-5 text-[var(--chart-line)]" />,
    href: '/conversations?filter=active',
  },
  {
    label: 'Cotizaciones Hoy',
    value: '18',
    change: '+8%',
    changeType: 'up',
    icon: <FileText className="h-5 w-5 text-[var(--chart-dot)]" />,
    href: `/quotes?date=${new Date().toISOString().slice(0, 10)}`,
  },
  {
    label: 'Polizas Vendidas',
    value: '156',
    change: '+23%',
    changeType: 'up',
    icon: <Shield className="h-5 w-5 text-[var(--chart-line)]" />,
    href: '/quotes?status=paid',
  },
  {
    label: 'Ingresos del Mes',
    value: '$12,450',
    change: '+18%',
    changeType: 'up',
    icon: <DollarSign className="h-5 w-5 text-[var(--chart-dot)]" />,
    href: '/ingresos',
  },
];

const recentConversations: RecentConversation[] = [
  {
    id: '1',
    clientName: 'Maria Gonzalez',
    phone: '+507 6234-5678',
    lastMessage: 'Me interesa un seguro de auto para mi Toyota Corolla 2023',
    time: 'Hace 2 min',
    status: 'active',
  },
  {
    id: '2',
    clientName: 'Carlos Perez',
    phone: '+507 6345-6789',
    lastMessage: 'Ya seleccione la cotizacion de ASSA, como pago?',
    time: 'Hace 15 min',
    status: 'waiting',
  },
  {
    id: '3',
    clientName: 'Ana Rodriguez',
    phone: '+507 6456-7890',
    lastMessage: 'Necesito hablar con un agente sobre la cobertura',
    time: 'Hace 32 min',
    status: 'human',
  },
  {
    id: '4',
    clientName: 'Juan Martinez',
    phone: '+507 6567-8901',
    lastMessage: 'Gracias, ya recibi mi poliza por correo',
    time: 'Hace 1 hora',
    status: 'closed',
  },
  {
    id: '5',
    clientName: 'Laura Castillo',
    phone: '+507 6678-9012',
    lastMessage: 'Quiero comparar seguros de salud para mi familia',
    time: 'Hace 2 horas',
    status: 'active',
  },
];

const chartData = [
  { day: 'Lun', value: 32 },
  { day: 'Mar', value: 45 },
  { day: 'Mie', value: 28 },
  { day: 'Jue', value: 51 },
  { day: 'Vie', value: 42 },
  { day: 'Sab', value: 18 },
  { day: 'Dom', value: 12 },
];

const quickActions = [
  { label: 'Ver Conversaciones', icon: <MessageSquare className="h-4 w-4" />, href: '/conversations' },
  { label: 'Configurar Bot', icon: <Bot className="h-4 w-4" />, href: '/bot' },
  { label: 'Conectar Aseguradora', icon: <Link2 className="h-4 w-4" />, href: '/apis' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusColors: Record<RecentConversation['status'], string> = {
  active: 'bg-[#10b981]',
  waiting: 'bg-amber-500',
  human: 'bg-[#0C1E35]',
  closed: 'bg-slate-400',
};

const statusLabels: Record<RecentConversation['status'], string> = {
  active: 'Activa',
  waiting: 'Esperando Pago',
  human: 'Humano',
  closed: 'Cerrada',
};

const statusBadgeClasses: Record<RecentConversation['status'], string> = {
  active: 'bg-[rgba(16,185,129,0.12)] text-[#047857] border border-[rgba(16,185,129,0.25)]',
  waiting: 'bg-[rgba(245,158,11,0.12)] text-[#b45309] border border-[rgba(245,158,11,0.25)]',
  human: 'bg-[rgba(12,30,53,0.08)] text-[#0C1E35] border border-[rgba(12,30,53,0.15)]',
  closed: 'bg-[#f3f4f6] text-[#4b5563] border border-[#e5e7eb]',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-page-title">
          Dashboard
        </h1>
        <p className="mt-1 text-body">
          Resumen de tu actividad de hoy
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, idx) => (
          <Link
            key={stat.label}
            href={stat.href}
            onMouseEnter={() => setHoveredStat(idx)}
            onMouseLeave={() => setHoveredStat(null)}
            className={`block card transition-all duration-200 ${
              hoveredStat === idx ? 'border-[var(--border-medium)]' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[var(--surface-secondary)] p-2.5">{stat.icon}</div>
              <span
                className={`text-xs font-semibold ${
                  stat.changeType === 'up' ? 'text-[var(--success)]' : 'text-[var(--error)]'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)] font-data">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-section-heading">
              Conversaciones Recientes
            </h2>
            <Link
              href="/conversations"
              className="inline-flex items-center gap-1 text-sm text-[var(--text-link)] hover:opacity-80 transition-opacity"
            >
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/conversations?id=${conv.id}`}
                className="flex items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-3.5 transition-colors hover:border-[var(--border-medium)]"
              >
                {/* Status Dot */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  {conv.status === 'active' && (
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColors[conv.status]}`}
                    />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusColors[conv.status]}`}
                  />
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {conv.clientName}
                    </span>
                    <span className={`badge ${statusBadgeClasses[conv.status]}`}>
                      {statusLabels[conv.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-[var(--text-secondary)]">
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Right side */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <Phone className="h-3 w-3" />
                    {conv.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <Clock className="h-3 w-3" />
                    {conv.time}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions + Chart */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="mb-4 text-section-heading">
              Acciones Rapidas
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--border-medium)] hover:text-[var(--text-link)]"
                >
                  {action.icon}
                  {action.label}
                  <ArrowRight className="ml-auto h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Chart */}
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-section-heading">
                Actividad Semanal
              </h2>
              <TrendingUp className="h-4 w-4 text-[var(--chart-line)]" />
            </div>

            <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
              {chartData.map((d) => {
                const heightPct = (d.value / maxChartValue) * 100;
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-xs text-[var(--text-secondary)] font-data">
                      {d.value}
                    </span>
                    <div className="w-full flex justify-center">
                      <div
                        className="w-6 rounded-t-md bg-[var(--chart-line)] transition-all duration-300"
                        style={{ height: `${heightPct}%`, minHeight: 8 }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
