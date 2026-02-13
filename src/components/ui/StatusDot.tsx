type StatusDotStatus = 'active' | 'pending' | 'error';

interface StatusDotProps {
  status: StatusDotStatus;
  label?: string;
  className?: string;
}

const statusClasses: Record<StatusDotStatus, string> = {
  active: 'bg-[#10b981]',
  pending: 'bg-[#f59e0b]',
  error: 'bg-[#ef4444]',
};

const pulseClasses: Record<StatusDotStatus, string> = {
  active: 'bg-[#34d399]',
  pending: 'bg-[#fbbf24]',
  error: 'bg-[#f87171]',
};

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        {status === 'active' && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pulseClasses[status]}`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusClasses[status]}`}
        />
      </span>
      {label && (
        <span className="text-sm text-[#6b7280]">{label}</span>
      )}
    </span>
  );
}
