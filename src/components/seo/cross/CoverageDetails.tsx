/**
 * Coverage Details Component
 * Displays coverage information for insurance products
 */

import React from 'react';
import { Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
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
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
      <GlassCard className="p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {coverages.map((coverage, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-6 w-6 flex-shrink-0 text-emerald-600 mt-1" />
              <div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  {coverage.name}
                </h3>
                <p className="text-sm text-gray-600">{coverage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

export default CoverageDetails;
