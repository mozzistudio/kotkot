type BadgeColor = 'lime' | 'success' | 'warning' | 'error' | 'gray' | 'dark-blue';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  lime: 'bg-[rgba(202,255,4,0.25)] text-[#3d5a00] border border-[rgba(202,255,4,0.40)]',
  success: 'bg-[rgba(16,185,129,0.12)] text-[#047857] border border-[rgba(16,185,129,0.25)]',
  warning: 'bg-[rgba(245,158,11,0.12)] text-[#b45309] border border-[rgba(245,158,11,0.25)]',
  error: 'bg-[rgba(239,68,68,0.12)] text-[#b91c1c] border border-[rgba(239,68,68,0.25)]',
  gray: 'bg-[#f3f4f6] text-[#4b5563] border border-[#e5e7eb]',
  'dark-blue': 'bg-[rgba(12,30,53,0.08)] text-[#0C1E35] border border-[rgba(12,30,53,0.15)]',
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
