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
    'border border-[var(--color-border-strong)] bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] hover:bg-[var(--color-action-primary-hover)]',
  secondary:
    'border border-[var(--color-border-default)] bg-[var(--color-action-secondary-bg)] text-[var(--color-action-secondary-fg)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)]',
  tertiary:
    'border border-transparent bg-transparent text-[var(--color-action-tertiary-fg)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 gap-2 px-4 py-2 text-[var(--type-body-sm)]',
  md: 'min-h-11 gap-2 px-6 py-3 text-[var(--type-body-sm)]',
  lg: 'min-h-12 gap-2 px-8 py-3 text-[var(--type-body-md)]',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-4 w-4',
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
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className={`animate-spin ${iconSizeClasses[size]}`} />}
      {children}
      {arrow && !loading && <ArrowRight className={`${iconSizeClasses[size]}`} />}
    </button>
  );
}
