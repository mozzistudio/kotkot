/**
 * Company Profile Component
 * Full company profile display with ratings, pros/cons, and contact info
 */

import React from 'react';
import { Star, Phone, Mail, Globe, MapPin, Check, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import type { InsuranceCompany } from '@/data/schema';

interface CompanyProfileProps {
  company: InsuranceCompany;
}

export function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <div className="space-y-8">
      {/* Company Header */}
      <GlassCard className="p-8">
        <div className="mb-6">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {company.name}
          </h1>
          {company.legalName && (
            <p className="text-sm text-gray-600">{company.legalName}</p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            <span className="text-3xl font-bold text-gray-900">
              {company.ratings.overall.toFixed(1)}
            </span>
            <span className="text-gray-600">/ 5.0</span>
          </div>
          <span className="text-gray-600">
            ({company.ratings.reviewCount || 0} reseñas)
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-lg text-gray-700">{company.description}</p>

        {/* Key Info */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.foundedYear && (
            <div>
              <span className="text-sm text-gray-600">Fundada en</span>
              <p className="font-semibold text-gray-900">
                {company.foundedYear}
              </p>
            </div>
          )}
          {company.headquarters && (
            <div>
              <span className="text-sm text-gray-600">Sede</span>
              <p className="font-semibold text-gray-900">
                {company.headquarters}
              </p>
            </div>
          )}
          {company.marketPosition && (
            <div>
              <span className="text-sm text-gray-600">Posición</span>
              <p className="font-semibold text-gray-900">
                {company.marketPosition}
              </p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Detailed Ratings */}
      <GlassCard className="p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
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
      </GlassCard>

      {/* Pros and Cons */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pros */}
        <GlassCard className="p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Ventajas</h2>
          <ul className="space-y-3">
            {company.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Cons */}
        <GlassCard className="p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Desventajas
          </h2>
          <ul className="space-y-3">
            {company.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Digital Features */}
      <GlassCard className="p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
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
      </GlassCard>

      {/* Contact Information */}
      <GlassCard className="p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Contacto</h2>
        <div className="space-y-4">
          {company.contact.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <a
                href={`tel:${company.contact.phone}`}
                className="text-gray-700 hover:text-emerald-600"
              >
                {company.contact.phone}
              </a>
            </div>
          )}
          {company.contact.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <a
                href={`mailto:${company.contact.email}`}
                className="text-gray-700 hover:text-emerald-600"
              >
                {company.contact.email}
              </a>
            </div>
          )}
          {company.contact.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-emerald-600" />
              <a
                href={company.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-emerald-600"
              >
                {company.contact.website}
              </a>
            </div>
          )}
        </div>

        {company.contact.officeLocations &&
          company.contact.officeLocations.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Oficinas
              </h3>
              <div className="space-y-3">
                {company.contact.officeLocations.map((location, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {location.city}
                      </p>
                      <p className="text-sm text-gray-600">{location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </GlassCard>

      {/* Products Offered */}
      <GlassCard className="p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Productos Disponibles
        </h2>
        <div className="flex flex-wrap gap-2">
          {company.productsOffered.map((product) => (
            <Badge key={product} color="emerald">
              {product.charAt(0).toUpperCase() + product.slice(1).replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// Helper Components
function RatingBar({ label, rating }: { label: string; rating: number }) {
  const percentage = (rating / 5) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {rating.toFixed(1)} / 5.0
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function FeatureBadge({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 ${
        enabled
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      {enabled ? (
        <Check className="h-5 w-5 text-emerald-600" />
      ) : (
        <X className="h-5 w-5 text-gray-400" />
      )}
      <span
        className={`text-sm font-medium ${
          enabled ? 'text-emerald-900' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default CompanyProfile;
