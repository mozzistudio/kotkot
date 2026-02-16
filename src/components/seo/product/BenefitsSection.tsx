/**
 * Benefits Section Component
 * Displays product benefits in a grid
 */

import React from 'react';
import { Check } from '@/components/shared/icon-map';

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
          <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
          <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-1.5">
                    <Check className="h-4 w-4 text-[var(--text-primary)]" />
                  </div>
                  <span className="text-[var(--text-secondary)]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who Needs It */}
        {whoNeedsIt && whoNeedsIt.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">
              ¿Quién lo necesita?
            </h2>
            <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
              <ul className="space-y-4">
                {whoNeedsIt.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-1.5">
                      <Check className="h-4 w-4 text-[var(--text-primary)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BenefitsSection;
