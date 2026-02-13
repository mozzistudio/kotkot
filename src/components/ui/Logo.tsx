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
        className={`${sizes.container} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50`}
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
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Upper diagonal */}
          <path
            d="M7 12 L16 5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lower diagonal */}
          <path
            d="M7 12 L16 19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Shield accent - top right corner */}
          <path
            d="M17 4 L17 8 L19 7 L19 4 Z"
            fill="white"
            opacity="0.8"
          />
        </svg>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      {/* Brand Name */}
      <span className={`font-heading ${sizes.text} font-bold tracking-tight text-slate-900`}>
        kotkot<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">.ai</span>
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const sizes = sizeMap[size];

  return (
    <div
      className={`${sizes.container} ${className} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-lg shadow-emerald-500/30`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-[60%] w-[60%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 4 L7 20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M7 12 L16 5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M7 12 L16 19"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 4 L17 8 L19 7 L19 4 Z"
          fill="white"
          opacity="0.8"
        />
      </svg>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
    </div>
  );
}
