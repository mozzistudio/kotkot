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
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#111827]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#6b7280]">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full rounded-[12px] px-4 py-2.5 text-sm bg-white border border-[#e5e7eb] text-[#111827] placeholder:text-[#9ca3af] transition-all duration-150 focus:outline-none focus:border-[#CAFF04] focus:ring-[3px] focus:ring-[rgba(202,255,4,0.2)] ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-[#ef4444] ring-[#ef4444]/20 focus:border-[#ef4444] focus:ring-[#ef4444]/20'
              : ''
          } ${className}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#ef4444]" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-[#9ca3af]">
          {hint}
        </p>
      )}
    </div>
  );
}
