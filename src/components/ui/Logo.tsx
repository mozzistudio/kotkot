import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { container: 'h-8 w-8', text: 'text-lg', icon: 'h-[18px] w-[18px]' },
  md: { container: 'h-10 w-10', text: 'text-xl', icon: 'h-[22px] w-[22px]' },
  lg: { container: 'h-12 w-12', text: 'text-2xl', icon: 'h-[26px] w-[26px]' },
};

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo Mark */}
      <div
        className={`${sizes.container} relative flex items-center justify-center rounded-[10px] bg-[#CAFF04]`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={sizes.icon}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized "K" lettermark */}
          <path
            d="M9 6v20"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M9 16l10-10"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M9 16l10 10"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span className={`font-heading ${sizes.text} font-bold tracking-tight text-[#111827]`}>
        kotkot<span className="font-normal text-[#9ca3af]">.ai</span>
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const sizes = sizeMap[size];

  return (
    <div
      className={`${sizes.container} ${className} relative flex items-center justify-center rounded-[10px] bg-[#CAFF04]`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={sizes.icon}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 6v20"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M9 16l10-10"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M9 16l10 10"
          stroke="#111827"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
