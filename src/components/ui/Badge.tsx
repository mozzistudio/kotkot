type BadgeColor = 'lime' | 'success' | 'warning' | 'error' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  lime: 'bg-[rgba(202,255,4,0.15)] text-[#111827]',
  success: 'bg-[rgba(16,185,129,0.15)] text-[#047857]',
  warning: 'bg-[rgba(245,158,11,0.15)] text-[#d97706]',
  error: 'bg-[rgba(239,68,68,0.15)] text-[#dc2626]',
  gray: 'bg-[#f3f4f6] text-[#6b7280]',
};

export function Badge({ children, color = 'lime', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[6px] px-2 py-1 text-[11px] font-semibold ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
