/**
 * CTA Section Component
 * Call-to-action section with WhatsApp integration
 */

import React from 'react';
import { Phone } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  whatsappMessage?: string;
  variant?: 'gradient' | 'glass';
}

export function CTASection({
  title,
  description,
  buttonText = 'Cotizar por WhatsApp',
  whatsappMessage = 'Hola, quiero cotizar un seguro',
  variant = 'gradient',
}: CTASectionProps) {
  const whatsappUrl = `https://wa.me/50760000000?text=${encodeURIComponent(whatsappMessage)}`;

  const baseClasses = 'p-12 text-center bg-white border border-[#e5e7eb] rounded-[16px]';

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className={baseClasses}>
        <h2 className="mb-4 text-3xl font-bold text-[#111827]">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
          {description}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#CAFF04] px-8 py-4 text-lg font-semibold text-[#111827] hover:bg-[#b8e604] transition-colors"
        >
          <Phone className="h-5 w-5" />
          {buttonText}
        </a>
      </div>
    </section>
  );
}

export default CTASection;
