/**
 * Benefits Section Component
 * Displays product benefits in a grid
 */

import React from 'react';
import { Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface BenefitsSectionProps {
  title?: string;
  benefits: string[];
  whoNeedsIt?: string[];
}

export function BenefitsSection({
  title = '¿Qué cubre?',
  benefits,
  whoNeedsIt,
}: BenefitsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Benefits */}
        <div>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
          <GlassCard className="p-8">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Who Needs It */}
        {whoNeedsIt && whoNeedsIt.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              ¿Quién lo necesita?
            </h2>
            <GlassCard className="p-8">
              <ul className="space-y-4">
                {whoNeedsIt.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 flex-shrink-0 text-emerald-600 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
}

export default BenefitsSection;
