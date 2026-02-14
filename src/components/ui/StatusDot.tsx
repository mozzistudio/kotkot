type StatusDotStatus = 'active' | 'pending' | 'error';

interface StatusDotProps {
  status: StatusDotStatus;
  label?: string;
  className?: string;
}

const statusClasses: Record<StatusDotStatus, string> = {
  active: 'bg-[var(--success)]',
  pending: 'bg-[var(--warning)]',
  error: 'bg-[var(--error)]',
};

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        {status === 'active' && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusClasses[status]}`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusClasses[status]}`}
        />
      </span>
      {label && (
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      )}
    </span>
  );
}
