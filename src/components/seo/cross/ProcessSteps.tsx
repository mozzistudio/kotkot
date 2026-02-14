/**
 * Process Steps Component
 * Displays step-by-step process information
 */

import React from 'react';

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
      <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">{title}</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6">
            <div className="flex gap-4">
              <div className="h-8 w-8 flex-shrink-0 bg-[var(--accent)] rounded-[var(--radius-pill)] flex items-center justify-center text-base font-bold text-[var(--text-primary)]">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSteps;
