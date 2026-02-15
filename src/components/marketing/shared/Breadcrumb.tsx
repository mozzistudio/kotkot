'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 px-4 pt-24 pb-4 sm:px-6" aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        Inicio
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
          {index === items.length - 1 ? (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
