/**
 * Company Profile Component
 * Full company profile display with ratings, pros/cons, and contact info
 */

import React from 'react';
import { Star, Phone, Mail, Globe, MapPin, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { InsuranceCompany } from '@/data/schema';

interface CompanyProfileProps {
  company: InsuranceCompany;
}

export function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <div className="space-y-8">
      {/* Company Header */}
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <div className="mb-6">
          <h1 className="mb-4 text-4xl font-bold text-[#111827]">
            {company.name}
          </h1>
          {company.legalName && (
            <p className="text-sm text-[#6b7280]">{company.legalName}</p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            <span className="text-3xl font-bold text-[#111827]">
              {company.ratings.overall.toFixed(1)}
            </span>
            <span className="text-[#6b7280]">/ 5.0</span>
          </div>
          <span className="text-[#6b7280]">
            ({company.ratings.reviewCount || 0} reseñas)
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-lg text-[#6b7280]">{company.description}</p>

        {/* Key Info */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.foundedYear && (
            <div>
              <span className="text-sm text-[#9ca3af]">Fundada en</span>
              <p className="font-semibold text-[#111827]">
                {company.foundedYear}
              </p>
            </div>
          )}
          {company.headquarters && (
            <div>
              <span className="text-sm text-[#9ca3af]">Sede</span>
              <p className="font-semibold text-[#111827]">
                {company.headquarters}
              </p>
            </div>
          )}
          {company.marketPosition && (
            <div>
              <span className="text-sm text-[#9ca3af]">Posición</span>
              <p className="font-semibold text-[#111827]">
                {company.marketPosition}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">
          Calificaciones Detalladas
        </h2>
        <div className="space-y-4">
          <RatingBar
            label="Servicio al Cliente"
            rating={company.ratings.customerService}
          />
          <RatingBar
            label="Proceso de Reclamaciones"
            rating={company.ratings.claimsProcess}
          />
          <RatingBar
            label="Experiencia Digital"
            rating={company.ratings.digitalExperience}
          />
          <RatingBar
            label="Relación Precio-Valor"
            rating={company.ratings.priceValue}
          />
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pros */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#111827]">Ventajas</h2>
          <ul className="space-y-3">
            {company.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[12px] p-1">
                  <Check className="h-4 w-4 text-[#111827]" />
                </div>
                <span className="text-[#6b7280]">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#111827]">
            Desventajas
          </h2>
          <ul className="space-y-3">
            {company.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span className="text-[#6b7280]">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Digital Features */}
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">
          Capacidades Digitales
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureBadge
            label="Cotizaciones en Línea"
            enabled={company.digitalFeatures.onlineQuotes}
          />
          <FeatureBadge
            label="App Móvil"
            enabled={company.digitalFeatures.mobileApp}
          />
          <FeatureBadge
            label="Reclamaciones en Línea"
            enabled={company.digitalFeatures.onlineClaims}
          />
          <FeatureBadge
            label="Chat en Vivo"
            enabled={company.digitalFeatures.chatSupport}
          />
          <FeatureBadge
            label="Soporte WhatsApp"
            enabled={company.digitalFeatures.whatsappSupport}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">Contacto</h2>
        <div className="space-y-4">
          {company.contact.phone && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[12px] p-2">
                <Phone className="h-5 w-5 text-[#111827]" />
              </div>
              <a
                href={`tel:${company.contact.phone}`}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                {company.contact.phone}
              </a>
            </div>
          )}
          {company.contact.email && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[12px] p-2">
                <Mail className="h-5 w-5 text-[#111827]" />
              </div>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                {company.contact.email}
              </a>
            </div>
          )}
          {company.contact.website && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[12px] p-2">
                <Globe className="h-5 w-5 text-[#111827]" />
              </div>
              <a
                href={company.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b7280] hover:text-[#111827]"
              >
                {company.contact.website}
              </a>
            </div>
          )}
        </div>

        {company.contact.officeLocations &&
          company.contact.officeLocations.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-[#111827]">
                Oficinas
              </h3>
              <div className="space-y-3">
                {company.contact.officeLocations.map((location, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[12px] p-2">
                      <MapPin className="h-4 w-4 text-[#111827]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">
                        {location.city}
                      </p>
                      <p className="text-sm text-[#6b7280]">{location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Products Offered */}
      <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">
          Productos Disponibles
        </h2>
        <div className="flex flex-wrap gap-2">
          {company.productsOffered.map((product) => (
            <Badge key={product} color="success">
              {product.charAt(0).toUpperCase() + product.slice(1).replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Components
function RatingBar({ label, rating }: { label: string; rating: number }) {
  const percentage = (rating / 5) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[#6b7280]">{label}</span>
        <span className="text-sm font-semibold text-[#111827]">
          {rating.toFixed(1)} / 5.0
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-[20px] bg-[#e5e7eb]">
        <div
          className="h-full rounded-[20px] bg-[#CAFF04] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function FeatureBadge({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-[12px] border px-4 py-2 ${
        enabled
          ? 'border-[#e5e7eb] bg-[rgba(202,255,4,0.15)]'
          : 'border-[#e5e7eb] bg-[#f9fafb]'
      }`}
    >
      {enabled ? (
        <Check className="h-5 w-5 text-[#111827]" />
      ) : (
        <X className="h-5 w-5 text-[#9ca3af]" />
      )}
      <span
        className={`text-sm font-medium ${
          enabled ? 'text-[#111827]' : 'text-[#9ca3af]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default CompanyProfile;
