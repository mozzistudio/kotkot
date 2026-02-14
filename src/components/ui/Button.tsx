'use client';

import { ArrowRight, Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] border border-[rgba(202,255,4,0.40)] hover:bg-[var(--action-primary-hover)] font-semibold',
  secondary:
    'bg-[var(--surface-page)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]',
  tertiary:
    'bg-transparent text-[var(--text-secondary)] border-none hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium transition-all duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={`animate-spin ${iconSizeClasses[size]}`} />
      )}
      {children}
      {arrow && !loading && (
        <ArrowRight className={`transition-transform group-hover:translate-x-0.5 ${iconSizeClasses[size]}`} />
      )}
    </button>
  );
}
