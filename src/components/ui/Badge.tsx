type BadgeColor = 'lime' | 'success' | 'warning' | 'error' | 'gray' | 'dark-blue' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  lime: 'bg-[rgba(202,255,4,0.25)] text-[var(--action-primary-fg)] border border-[rgba(202,255,4,0.40)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--success-fg)] border border-[rgba(16,185,129,0.25)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--warning-fg)] border border-[rgba(245,158,11,0.25)]',
  error: 'bg-[var(--color-danger-bg)] text-[var(--danger-fg)] border border-[rgba(239,68,68,0.25)]',
  gray: 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-default)]',
  'dark-blue': 'bg-[var(--color-info-bg)] text-[var(--dark-blue)] border border-[rgba(12,30,53,0.15)]',
  info: 'bg-[var(--color-info-bg)] text-[var(--color-info-fg)] border border-[rgba(12,30,53,0.15)]',
  neutral: 'bg-[var(--surface-panel)] text-[var(--text-secondary)] border border-[var(--border-default)]',
};

export function Badge({ children, color = 'lime', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-badge)] px-2 py-1 text-xs font-semibold ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
