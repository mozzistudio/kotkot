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

  const baseClasses = 'p-12 text-center bg-white border border-[var(--border-default)] rounded-[var(--radius-card)]';

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className={baseClasses}>
        <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
          {description}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Phone className="h-5 w-5" />
          {buttonText}
        </a>
      </div>
    </section>
  );
}

export default CTASection;
