/**
 * Company Card Component
 * Displays insurance company or lender card with ratings and CTAs
 */

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Phone } from '@/components/shared/icon-map';
import { Badge } from '@/components/ui/Badge';
import type { InsuranceCompany, Lender } from '@/data/schema';

interface CompanyCardProps {
  company: InsuranceCompany | Lender;
  productType?: string;
  basePath?: 'seguros' | 'prestamos';
}

export function CompanyCard({
  company,
  productType,
  basePath = 'seguros',
}: CompanyCardProps) {
  const isInsurance = 'productsOffered' in company;
  const companyPath = isInsurance
    ? `/seguros/aseguradoras/${company.slug}`
    : `/prestamos/bancos/${company.slug}`;

  const crossPagePath = productType
    ? `/${basePath}/${productType}/${company.slug}`
    : null;

  return (
    <div className="group relative overflow-hidden bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-6 transition-all hover:scale-[1.02]">
      {/* Company Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
            {company.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-[var(--text-primary)]">
                {company.ratings.overall.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">
              ({company.ratings.reviewCount || 0} reseñas)
            </span>
          </div>
        </div>

        {/* Badge for market position */}
        {company.marketPosition && (
          <Badge color="success" className="ml-2">
            Top
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]">
        {company.description}
      </p>

      {/* Key Features */}
      <div className="mb-4 flex flex-wrap gap-2">
        {isInsurance && 'onlineQuotes' in company.digitalFeatures && company.digitalFeatures.onlineQuotes && (
          <Badge color="gray">Cotización Online</Badge>
        )}
        {!isInsurance && 'onlineApplication' in company.digitalFeatures && company.digitalFeatures.onlineApplication && (
          <Badge color="gray">Solicitud Online</Badge>
        )}
        {company.digitalFeatures.mobileApp && (
          <Badge color="gray">App Móvil</Badge>
        )}
        {company.digitalFeatures.whatsappSupport && (
          <Badge color="gray">WhatsApp</Badge>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {crossPagePath && (
          <Link
            href={crossPagePath}
            className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            Ver Detalles
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <Link
          href={companyPath}
          className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--border-default)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-panel)] transition-colors"
        >
          Perfil Completo
        </Link>
      </div>
    </div>
  );
}

export default CompanyCard;
