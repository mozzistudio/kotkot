/**
 * Process Steps Component
 * Displays step-by-step process information
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  steps: Step[];
}

export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <GlassCard key={step.step} className="p-6">
            <div className="flex gap-4">
              <Badge color="emerald" className="h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center text-base font-bold">
                {step.step}
              </Badge>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export default ProcessSteps;
