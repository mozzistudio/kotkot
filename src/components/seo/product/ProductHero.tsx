/**
 * Product Hero Component
 * Hero section for insurance/loan product pages
 */

import React from 'react';
import type { InsuranceProduct, LoanProduct } from '@/data/schema';

interface ProductHeroProps {
  product: InsuranceProduct | LoanProduct;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          {product.icon && (
            <div className="mb-6 text-6xl">{product.icon}</div>
          )}

          {/* H1 */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            {product.seo.h1}
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280] sm:text-xl">
            {product.longDescription}
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-[10px] bg-[#CAFF04] px-8 py-4 text-lg font-semibold text-[#111827] hover:bg-[#b8e604] transition-colors"
          >
            Cotizar Gratis por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProductHero;
