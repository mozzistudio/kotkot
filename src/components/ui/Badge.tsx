type BadgeColor = 'emerald' | 'teal' | 'amber' | 'red' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  teal: 'bg-teal-100 text-teal-700 ring-teal-600/20',
  amber: 'bg-amber-100 text-amber-700 ring-amber-600/20',
  red: 'bg-red-100 text-red-700 ring-red-600/20',
  gray: 'bg-gray-100 text-gray-700 ring-gray-600/20',
};

export function Badge({ children, color = 'emerald', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
