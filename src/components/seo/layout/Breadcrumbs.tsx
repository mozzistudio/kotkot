/**
 * Breadcrumbs Component
 * Navigation breadcrumbs with Schema.org markup
 */

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '../shared/SchemaMarkup';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Always include home as first item
  const allItems: BreadcrumbItem[] = [
    { name: 'Inicio', url: 'https://kotkot.ai' },
    ...items,
  ];

  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema(allItems)} />

      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-2 text-sm text-[#6b7280] ${className}`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <React.Fragment key={item.url}>
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
              )}

              {isLast ? (
                <span
                  className="text-[#111827] font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url.replace('https://kotkot.ai', '')}
                  className="hover:text-[#111827] transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

export default Breadcrumbs;
