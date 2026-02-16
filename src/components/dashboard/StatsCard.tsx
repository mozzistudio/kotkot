import Link from 'next/link';
import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from '@/components/shared/icon-map';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export function StatsCard({ icon, label, value, href, trend, className = '' }: StatsCardProps) {
  const Comp = href ? Link : 'div';

  return (
    <Comp
      {...(href ? { href } : {})}
      className={`rounded-2xl border border-[var(--border-default)] bg-white p-6 transition-all duration-200 ${
        href ? 'cursor-pointer hover:border-[rgba(200,238,68,0.3)] hover:shadow-md' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
          {icon}
        </div>

        {trend && (
          <div
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
              trend.direction === 'up'
                ? 'bg-green-50 text-green-600'
                : trend.direction === 'down'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {trend.direction === 'up' ? <TrendingUp className="h-3 w-3" /> : null}
            {trend.direction === 'down' ? <TrendingDown className="h-3 w-3" /> : null}
            {trend.value}
          </div>
        )}
      </div>

      <p className="mt-4 text-3xl font-bold font-data text-[var(--text-primary)]">{value}</p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
    </Comp>
  );
}
