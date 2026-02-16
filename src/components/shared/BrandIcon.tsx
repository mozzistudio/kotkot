'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type LucideIcon } from 'lucide-react';

interface BrandIconProps {
  name: string;
  fallback?: LucideIcon;
  size?: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

export function BrandIcon({
  name,
  fallback: FallbackIcon,
  size = 24,
  className = '',
  alt = '',
  onClick,
}: BrandIconProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError && FallbackIcon) {
    return (
      <FallbackIcon
        size={size}
        className={`shrink-0 ${className}`}
        onClick={onClick}
      />
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={alt || name.replace(/-/g, ' ')}
      onClick={onClick}
    >
      <Image
        src={`/icons/${name}.png`}
        alt={alt || name.replace(/-/g, ' ')}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setImgError(true)}
      />
    </span>
  );
}
