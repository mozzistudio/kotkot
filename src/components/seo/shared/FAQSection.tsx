/**
 * FAQ Section Component
 * Displays FAQ with Schema.org markup
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SchemaMarkup } from './SchemaMarkup';
import { generateFAQSchema } from '@/lib/seo/schema';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  includeSchema?: boolean;
}

export function FAQSection({
  faqs,
  title = 'Preguntas Frecuentes',
  includeSchema = true,
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <>
      {includeSchema && <SchemaMarkup schema={generateFAQSchema(faqs)} />}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <GlassCard key={index} className="p-6">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}

export default FAQSection;
