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
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <div className="mb-6">
          <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)]">
            {company.name}
          </h1>
          {company.legalName && (
            <p className="text-sm text-[var(--text-secondary)]">{company.legalName}</p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            <span className="text-3xl font-bold text-[var(--text-primary)]">
              {company.ratings.overall.toFixed(1)}
            </span>
            <span className="text-[var(--text-secondary)]">/ 5.0</span>
          </div>
          <span className="text-[var(--text-secondary)]">
            ({company.ratings.reviewCount || 0} reseñas)
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-lg text-[var(--text-secondary)]">{company.description}</p>

        {/* Key Info */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.foundedYear && (
            <div>
              <span className="text-sm text-[var(--text-muted)]">Fundada en</span>
              <p className="font-semibold text-[var(--text-primary)]">
                {company.foundedYear}
              </p>
            </div>
          )}
          {company.headquarters && (
            <div>
              <span className="text-sm text-[var(--text-muted)]">Sede</span>
              <p className="font-semibold text-[var(--text-primary)]">
                {company.headquarters}
              </p>
            </div>
          )}
          {company.marketPosition && (
            <div>
              <span className="text-sm text-[var(--text-muted)]">Posición</span>
              <p className="font-semibold text-[var(--text-primary)]">
                {company.marketPosition}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
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
        <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Ventajas</h2>
          <ul className="space-y-3">
            {company.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-1">
                  <Check className="h-4 w-4 text-[var(--text-primary)]" />
                </div>
                <span className="text-[var(--text-secondary)]">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
            Desventajas
          </h2>
          <ul className="space-y-3">
            {company.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                <span className="text-[var(--text-secondary)]">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Digital Features */}
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
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
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Contacto</h2>
        <div className="space-y-4">
          {company.contact.phone && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-2">
                <Phone className="h-5 w-5 text-[var(--text-primary)]" />
              </div>
              <a
                href={`tel:${company.contact.phone}`}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {company.contact.phone}
              </a>
            </div>
          )}
          {company.contact.email && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-2">
                <Mail className="h-5 w-5 text-[var(--text-primary)]" />
              </div>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {company.contact.email}
              </a>
            </div>
          )}
          {company.contact.website && (
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-2">
                <Globe className="h-5 w-5 text-[var(--text-primary)]" />
              </div>
              <a
                href={company.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {company.contact.website}
              </a>
            </div>
          )}
        </div>

        {company.contact.officeLocations &&
          company.contact.officeLocations.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
                Oficinas
              </h3>
              <div className="space-y-3">
                {company.contact.officeLocations.map((location, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[var(--radius-md)] p-2">
                      <MapPin className="h-4 w-4 text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {location.city}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">{location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Products Offered */}
      <div className="bg-white border border-[var(--border-default)] rounded-[var(--radius-card)] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
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
        <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {rating.toFixed(1)} / 5.0
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--border-default)]">
        <div
          className="h-full rounded-[var(--radius-pill)] bg-[var(--accent)] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function FeatureBadge({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-2 ${
        enabled
          ? 'border-[var(--border-default)] bg-[rgba(202,255,4,0.15)]'
          : 'border-[var(--border-default)] bg-[var(--surface-panel)]'
      }`}
    >
      {enabled ? (
        <Check className="h-5 w-5 text-[var(--text-primary)]" />
      ) : (
        <X className="h-5 w-5 text-[var(--text-muted)]" />
      )}
      <span
        className={`text-sm font-medium ${
          enabled ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default CompanyProfile;
