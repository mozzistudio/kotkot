'use client';

import { useState } from 'react';
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
    icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
  },
  {
    label: 'Cotizaciones Hoy',
    value: '18',
    change: '+8%',
    changeType: 'up',
    icon: <FileText className="h-5 w-5 text-teal-400" />,
  },
  {
    label: 'Polizas Vendidas',
    value: '156',
    change: '+23%',
    changeType: 'up',
    icon: <Shield className="h-5 w-5 text-emerald-400" />,
  },
  {
    label: 'Ingresos del Mes',
    value: '$12,450',
    change: '+18%',
    changeType: 'up',
    icon: <DollarSign className="h-5 w-5 text-teal-400" />,
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
  active: 'bg-emerald-500',
  waiting: 'bg-amber-500',
  human: 'bg-blue-500',
  closed: 'bg-slate-500',
};

const statusLabels: Record<RecentConversation['status'], string> = {
  active: 'Activa',
  waiting: 'Esperando Pago',
  human: 'Humano',
  closed: 'Cerrada',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-[#080c14] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-200 font-heading">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Resumen de tu actividad de hoy
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            onMouseEnter={() => setHoveredStat(idx)}
            onMouseLeave={() => setHoveredStat(null)}
            className={`rounded-xl border border-[#1e293b] bg-[#0d1117] p-5 transition-all duration-200 ${
              hoveredStat === idx ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[#080c14] p-2.5">{stat.icon}</div>
              <span
                className={`text-xs font-semibold ${
                  stat.changeType === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-200 font-data">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 rounded-xl border border-[#1e293b] bg-[#0d1117] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200">
              Conversaciones Recientes
            </h2>
            <a
              href="/conversations"
              className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-3">
            {recentConversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center gap-4 rounded-lg border border-[#1e293b]/60 bg-[#080c14] p-3.5 transition-colors hover:border-[#1e293b]"
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
                    <span className="text-sm font-medium text-slate-200">
                      {conv.clientName}
                    </span>
                    <span className="rounded-full bg-[#1e293b] px-2 py-0.5 text-xs text-slate-400">
                      {statusLabels[conv.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-slate-400">
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Right side */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Phone className="h-3 w-3" />
                    {conv.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {conv.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions + Chart */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-5">
            <h2 className="mb-4 text-lg font-semibold text-slate-200">
              Acciones Rapidas
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-[#1e293b]/60 bg-[#080c14] px-4 py-3 text-sm text-slate-300 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  {action.icon}
                  {action.label}
                  <ArrowRight className="ml-auto h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Activity Chart */}
          <div className="rounded-xl border border-[#1e293b] bg-[#0d1117] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-200">
                Actividad Semanal
              </h2>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
              {chartData.map((d) => {
                const heightPct = (d.value / maxChartValue) * 100;
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-data">
                      {d.value}
                    </span>
                    <div className="w-full flex justify-center">
                      <div
                        className="w-6 rounded-t-md bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-300"
                        style={{ height: `${heightPct}%`, minHeight: 8 }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{d.day}</span>
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
