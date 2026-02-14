import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { container: 'h-8 w-8', text: 'text-lg' },
  md: { container: 'h-10 w-10', text: 'text-xl' },
  lg: { container: 'h-12 w-12', text: 'text-2xl' },
};

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Modern Logo Icon */}
      <div
        className={`${sizes.container} relative flex items-center justify-center rounded-xl bg-[#CAFF04] shadow-lg shadow-[rgba(202,255,4,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[rgba(202,255,4,0.5)]`}
      >
        {/* Abstract "K" Shape - Modern & Creative */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[60%] w-[60%]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main vertical bar */}
          <path
            d="M7 4 L7 20"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Upper diagonal */}
          <path
            d="M7 12 L16 5"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lower diagonal */}
          <path
            d="M7 12 L16 19"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Shield accent - top right corner */}
          <path
            d="M17 4 L17 8 L19 7 L19 4 Z"
            fill="#111827"
            opacity="0.8"
          />
        </svg>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#111827]/5 to-transparent" />
      </div>

      {/* Brand Name */}
      <span className={`font-heading ${sizes.text} font-bold tracking-tight text-slate-900`}>
        kotkot<span className="text-[#111827]">.ai</span>
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const sizes = sizeMap[size];

  return (
    <div
      className={`${sizes.container} ${className} relative flex items-center justify-center rounded-xl bg-[#CAFF04] shadow-lg shadow-[rgba(202,255,4,0.3)]`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[60%] w-[60%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 4 L7 20"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M7 12 L16 5"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M7 12 L16 19"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 4 L17 8 L19 7 L19 4 Z"
          fill="#111827"
          opacity="0.8"
        />
      </svg>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#111827]/5 to-transparent" />
    </div>
  );
}
