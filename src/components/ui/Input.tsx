'use client';

import { type ReactNode, useId } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  className = '',
  id: externalId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-[var(--type-body-sm)] font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-text-secondary)]">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-4 py-3 text-[var(--type-body-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors duration-150 focus:border-[var(--color-focus-ring)] focus:outline-none focus:ring-2 focus:ring-[var(--color-info-bg)] ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-[var(--color-danger-fg)] focus:border-[var(--color-danger-fg)] focus:ring-[var(--color-danger-bg)]'
              : ''
          } ${className}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-[var(--type-body-sm)] text-[var(--color-danger-fg)]" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[var(--type-body-sm)] text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
}
