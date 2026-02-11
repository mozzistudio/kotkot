import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  className?: string;
}

export function StatsCard({ icon, label, value, trend, className = '' }: StatsCardProps) {
  return (
    <div
      className={`bg-[#0d1117] border border-[#1e293b] rounded-xl p-6 transition-all duration-200 hover:border-[#2d3a4d] ${className}`}
    >
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10">
          <div className="text-emerald-400">{icon}</div>
        </div>

        {/* Trend */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              trend.direction === 'up'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {trend.direction === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.value}
          </div>
        )}
      </div>

      {/* Label */}
      <p className="mt-4 text-sm text-slate-400">{label}</p>

      {/* Value */}
      <p className="mt-1 text-2xl font-bold font-mono text-white tracking-tight">{value}</p>
    </div>
  );
}
