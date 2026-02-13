/**
 * Cross Page Hero Component
 * Hero section for product × company pages
 */

import React from 'react';
import { Star, Phone } from 'lucide-react';
import type { InsuranceProduct, InsuranceCompany, LoanProduct, Lender } from '@/data/schema';

interface CrossPageHeroProps {
  product: InsuranceProduct | LoanProduct;
  company: InsuranceCompany | Lender;
}

export function CrossPageHero({ product, company }: CrossPageHeroProps) {
  const whatsappMessage = `Hola, quiero cotizar ${product.name} con ${company.name}`;
  const whatsappUrl = `https://wa.me/50760000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="mb-12">
      <div className="text-center">
        {/* Breadcrumb-style indicator */}
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-[#6b7280]">
          {product.icon && <span className="text-2xl">{product.icon}</span>}
          <span>→</span>
          <span className="font-semibold">{company.name}</span>
        </div>

        {/* H1 */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
          {product.name} {company.name}
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
          Toda la información sobre el {product.name.toLowerCase()} de {company.name} en
          Panamá: coberturas, precios, requisitos y cómo contratarlo.
        </p>

        {/* Company Rating */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold text-[#111827]">
              {company.ratings.overall.toFixed(1)}
            </span>
          </div>
          <span className="text-[#6b7280]">
            ({company.ratings.reviewCount || 0} reseñas)
          </span>
        </div>

        {/* CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#CAFF04] px-8 py-4 text-lg font-semibold text-[#111827] hover:bg-[#b8e604] transition-colors"
        >
          <Phone className="h-5 w-5" />
          Cotizar por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default CrossPageHero;
