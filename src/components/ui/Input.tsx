'use client';

import { type ReactNode, useId } from 'react';

type InputVariant = 'glass' | 'dark';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  variant?: InputVariant;
}

const variantClasses: Record<InputVariant, string> = {
  glass:
    'backdrop-blur-xl bg-white/60 border border-white/40 text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20',
  dark:
    'bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20',
};

const labelVariantClasses: Record<InputVariant, string> = {
  glass: 'text-gray-700',
  dark: 'text-gray-300',
};

export function Input({
  label,
  error,
  hint,
  icon,
  variant = 'glass',
  className = '',
  id: externalId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${labelVariantClasses[variant]}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full rounded-xl px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-red-400 ring-red-400/20 focus:border-red-400 focus:ring-red-400/20'
              : variantClasses[variant]
          } ${className}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
}
