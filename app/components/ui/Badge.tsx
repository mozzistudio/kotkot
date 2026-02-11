interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.05em] bg-primary-soft/30 text-primary border border-primary-soft/40 ${className}`}
    >
      {children}
    </span>
  );
}
