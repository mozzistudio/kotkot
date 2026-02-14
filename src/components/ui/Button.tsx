'use client';

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-action-primary-bg)] text-[var(--color-action-primary-fg)] border border-[var(--color-action-primary-bg)] hover:bg-[var(--color-action-primary-hover)] font-semibold',
  secondary:
    'bg-[var(--color-surface-page)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)]',
  tertiary:
    'bg-transparent text-[var(--color-action-tertiary-fg)] border-none hover:bg-[var(--color-action-tertiary-hover)] hover:text-[var(--color-text-primary)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-3 text-base gap-2.5',
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
  href,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-all duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow && !loading && (
          <ArrowRight className={`transition-transform group-hover:translate-x-0.5 ${iconSizeClasses[size]}`} />
        )}
      </Link>
    );
  }

  return (
    <button
      className={classes}
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
