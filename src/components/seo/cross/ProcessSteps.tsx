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
      <h2 className="mb-8 text-3xl font-bold text-[#111827]">{title}</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="bg-white border border-[#e5e7eb] rounded-[16px] p-6">
            <div className="flex gap-4">
              <div className="h-8 w-8 flex-shrink-0 bg-[#CAFF04] rounded-[20px] flex items-center justify-center text-base font-bold text-[#111827]">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-[#6b7280]">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSteps;
