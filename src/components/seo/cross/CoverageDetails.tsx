/**
 * Coverage Details Component
 * Displays coverage information for insurance products
 */

import React from 'react';
import { Check } from 'lucide-react';
import type { Coverage } from '@/data/schema';

interface CoverageDetailsProps {
  coverages: Array<{
    name: string;
    description: string;
  }>;
  title?: string;
}

export function CoverageDetails({
  coverages,
  title = '¿Qué cubre?',
}: CoverageDetailsProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {coverages.map((coverage, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-1.5">
                <Check className="h-4 w-4 text-[var(--text-primary)]" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-[var(--text-primary)]">
                  {coverage.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{coverage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoverageDetails;
