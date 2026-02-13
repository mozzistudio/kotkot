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
      className={`bg-white border border-[#e5e7eb] rounded-[16px] p-6 transition-all duration-150 hover:border-[rgba(202,255,4,0.40)] hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-[12px] bg-[rgba(202,255,4,0.15)]">
          <div className="text-[#111827]">{icon}</div>
        </div>

        {/* Trend */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
              trend.direction === 'up'
                ? 'bg-[rgba(16,185,129,0.15)] text-[#047857]'
                : 'bg-[rgba(239,68,68,0.15)] text-[#dc2626]'
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
      <p className="mt-4 text-sm text-[#6b7280]">{label}</p>

      {/* Value */}
      <p className="mt-1 text-2xl font-bold font-mono text-[#111827] tracking-tight">{value}</p>
    </div>
  );
}
