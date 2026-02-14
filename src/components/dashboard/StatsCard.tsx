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
      className={`bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6 transition-all duration-150 hover:border-[rgba(12,30,53,0.20)] hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--dark-blue-surface)]">
          <div className="text-[var(--dark-blue)]">{icon}</div>
        </div>

        {/* Trend */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              trend.direction === 'up'
                ? 'bg-[rgba(16,185,129,0.15)] text-[var(--dark-blue)]'
                : 'bg-[rgba(239,68,68,0.15)] text-[var(--error)]'
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
      <p className="mt-4 text-sm text-[var(--text-secondary)]">{label}</p>

      {/* Value */}
      <p className="mt-1 text-2xl font-bold font-mono text-[var(--text-primary)] tracking-tight">{value}</p>
    </div>
  );
}
