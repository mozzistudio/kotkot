type StatusDotStatus = 'active' | 'pending' | 'error';

interface StatusDotProps {
  status: StatusDotStatus;
  label?: string;
  className?: string;
}

const statusClasses: Record<StatusDotStatus, string> = {
  active: 'bg-emerald-500',
  pending: 'bg-amber-500',
  error: 'bg-red-500',
};

const pulseClasses: Record<StatusDotStatus, string> = {
  active: 'bg-emerald-400',
  pending: 'bg-amber-400',
  error: 'bg-red-400',
};

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {status === 'active' && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pulseClasses[status]}`}
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusClasses[status]}`}
        />
      </span>
      {label && (
        <span className="text-sm text-gray-600">{label}</span>
      )}
    </span>
  );
}
