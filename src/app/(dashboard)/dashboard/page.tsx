'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, TrendingUp, DollarSign, UserPlus, Upload, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

interface Stats {
  leadsThisMonth: number;
  leadsLastMonth: number;
  quotesThisMonth: number;
  conversionRate: number;
  pipeline: number;
  leadsByDay: { date: string; count: number }[];
  leadsByType: { type: string; count: number }[];
  leadsByStatus: { status: string; count: number }[];
  recentActivities: { id: string; activityType: string; description: string; createdAt: string }[];
}

const typeColors: Record<string, string> = {
  auto: '#2D8C4E', moto: '#E67E22', salud: '#2563EB', hogar: '#7C3AED', viaje: '#06B6D4', empresarial: '#DC2626',
};
const typeLabels: Record<string, string> = {
  auto: 'Auto', moto: 'Moto', salud: 'Salud', hogar: 'Hogar', viaje: 'Viaje', empresarial: 'Empresarial',
};
const statusColors: Record<string, string> = {
  new: '#94A3B8', quoted: '#2563EB', docs_pending: '#E67E22', docs_complete: '#8B5CF6', contracted: '#2D8C4E', lost: '#EF4444',
};
const statusLabels: Record<string, string> = {
  new: 'Nuevos', quoted: 'Cotizados', docs_pending: 'Docs pendientes', docs_complete: 'Docs completos', contracted: 'Contratados', lost: 'Perdidos',
};

const activityIcons: Record<string, typeof UserPlus> = {
  lead_new: UserPlus, quote_sent: FileText, doc_received: Upload, lead_converted: CheckCircle, lead_lost: XCircle,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="text-3xl">🦊</span>
          <p className="mt-2 text-slate-500">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  const leadsDiff = stats.leadsThisMonth - stats.leadsLastMonth;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Users} label="Leads este mes" value={stats.leadsThisMonth.toString()} subtitle={`${leadsDiff >= 0 ? '+' : ''}${leadsDiff} vs mes anterior`} />
        <KPICard icon={FileText} label="Cotizaciones" value={stats.quotesThisMonth.toString()} subtitle={`${stats.leadsByStatus.find(s => s.status === 'quoted')?.count || 0} leads cotizados`} />
        <KPICard icon={TrendingUp} label="Tasa de conversión" value={`${stats.conversionRate}%`} subtitle="Últimos 30 días" />
        <KPICard icon={DollarSign} label="Pipeline" value={`B/. ${stats.pipeline.toLocaleString('es-PA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} subtitle="Primas anuales" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Leads por día — Últimos 30 días</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.leadsByDay}>
              <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#2D8C4E" strokeWidth={2} dot={false} name="Leads" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Por tipo de seguro</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.leadsByType.map(t => ({ ...t, name: typeLabels[t.type] || t.type }))}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                dataKey="count"
                nameKey="name"
              >
                {stats.leadsByType.map((entry) => (
                  <Cell key={entry.type} fill={typeColors[entry.type] || '#94A3B8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend formatter={(value) => <span className="text-xs text-slate-600">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Embudo de conversión</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.leadsByStatus.map(s => ({ ...s, name: statusLabels[s.status] || s.status }))} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
            <Tooltip />
            <Bar dataKey="count" name="Leads" radius={[0, 4, 4, 0]}>
              {stats.leadsByStatus.map((entry) => (
                <Cell key={entry.status} fill={statusColors[entry.status] || '#94A3B8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Actividad reciente</h3>
        <div className="space-y-3">
          {stats.recentActivities.map((act) => {
            const Icon = activityIcons[act.activityType] || FileText;
            const iconColor = act.activityType === 'lead_converted' ? 'text-green-600' :
              act.activityType === 'lead_lost' ? 'text-red-500' :
              act.activityType === 'quote_sent' ? 'text-blue-600' :
              act.activityType === 'doc_received' ? 'text-orange-500' : 'text-slate-500';
            return (
              <div key={act.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">{act.description}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatDistanceToNow(new Date(act.createdAt), { locale: es, addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/leads" className="block text-center text-sm text-brand font-medium mt-4 hover:underline">
          Ver todos
        </Link>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, subtitle }: { icon: typeof Users; label: string; value: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}
