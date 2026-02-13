/**
 * Pricing Section Component
 * Displays pricing information and factors
 */

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface PricingSectionProps {
  productName: string;
  companyName: string;
  priceMin: string;
  priceMax: string;
  factors: string[];
}

export function PricingSection({
  productName,
  companyName,
  priceMin,
  priceMax,
  factors,
}: PricingSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-[#111827]">
        Precios y Factores
      </h2>
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <div className="mb-6">
          <p className="mb-4 text-[#6b7280]">
            El costo del {productName.toLowerCase()} en {companyName} varía según
            tus necesidades:
          </p>
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-[#111827]">
              {priceMin}
            </span>
            <span className="text-xl text-[#6b7280]">a</span>
            <span className="text-3xl font-bold text-[#111827]">
              {priceMax}
            </span>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-[#111827]">
            Factores que afectan el precio:
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {factors.map((factor, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge color="gray" className="mt-0.5">
                  {index + 1}
                </Badge>
                <span className="text-sm text-[#6b7280]">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
