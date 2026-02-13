/**
 * CTA Section Component
 * Call-to-action section with WhatsApp integration
 */

import React from 'react';
import { Phone } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

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

  const baseClasses = 'p-12 text-center';
  const variantClasses =
    variant === 'gradient'
      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white'
      : '';

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <GlassCard className={`${baseClasses} ${variantClasses}`}>
        <h2
          className={`mb-4 text-3xl font-bold ${
            variant === 'gradient' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
        <p
          className={`mx-auto mb-8 max-w-2xl text-lg ${
            variant === 'gradient' ? 'text-emerald-50' : 'text-gray-600'
          }`}
        >
          {description}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold transition-colors shadow-lg ${
            variant === 'gradient'
              ? 'bg-white text-emerald-600 hover:bg-gray-50'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
          }`}
        >
          <Phone className="h-5 w-5" />
          {buttonText}
        </a>
      </GlassCard>
    </section>
  );
}

export default CTASection;
