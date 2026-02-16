/**
 * Internal Link Grid Component
 * Displays related links for internal linking strategy
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/shared/icon-map';

export interface InternalLink {
  title: string;
  description?: string;
  href: string;
  icon?: string;
}

interface InternalLinkGridProps {
  title?: string;
  links: InternalLink[];
  columns?: 2 | 3 | 4;
}

export function InternalLinkGrid({
  title = 'También te puede interesar',
  links,
  columns = 3,
}: InternalLinkGridProps) {
  if (links.length === 0) return null;

  const gridColsClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
      <div className={`grid gap-4 ${gridColsClass}`}>
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="group">
            <div className="h-full bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6 transition-all hover:scale-[1.02]">
              {link.icon && <div className="mb-3 text-3xl">{link.icon}</div>}
              <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--text-secondary)]">
                {link.title}
              </h3>
              {link.description && (
                <p className="mb-3 text-sm text-[var(--text-secondary)] line-clamp-2">
                  {link.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                Ver más
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default InternalLinkGrid;
