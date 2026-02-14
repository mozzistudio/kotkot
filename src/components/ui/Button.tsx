'use client';

import { ArrowRight, Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
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
    'bg-[#CAFF04] text-[#111827] border border-[rgba(202,255,4,0.40)] hover:bg-[#b8e600] font-semibold',
  secondary:
    'bg-white text-[#374151] border border-[#e5e7eb] hover:bg-[#f3f4f6]',
  outline:
    'bg-transparent text-[#374151] border border-[#e5e7eb] hover:bg-[#f3f4f6]',
  ghost:
    'bg-transparent text-[#6b7280] border-none hover:bg-[#f3f4f6]',
  dark:
    'bg-[#111827] text-white border border-[#111827] hover:bg-[#1f2937]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
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
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C1E35] disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
