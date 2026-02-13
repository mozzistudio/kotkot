/**
 * Requirements Card Component
 * Displays requirements and eligibility criteria
 */

import React from 'react';
import { Check, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface RequirementsCardProps {
  requiredDocuments?: string[];
  eligibilityCriteria?: string[];
  exclusions?: string[];
  minimumAge?: number;
  maximumAge?: number;
}

export function RequirementsCard({
  requiredDocuments = [],
  eligibilityCriteria = [],
  exclusions = [],
  minimumAge,
  maximumAge,
}: RequirementsCardProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Requisitos y Elegibilidad
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Requirements */}
        <GlassCard className="p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Requisitos</h3>

          {/* Age Requirements */}
          {(minimumAge || maximumAge) && (
            <div className="mb-4 rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-900">
                Edad requerida: {minimumAge || 18} - {maximumAge || 65} años
              </p>
            </div>
          )}

          {/* Documents */}
          {requiredDocuments.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                Documentos Requeridos:
              </h4>
              <ul className="space-y-2">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          {eligibilityCriteria.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                Criterios de Elegibilidad:
              </h4>
              <ul className="space-y-2">
                {eligibilityCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                    <span className="text-sm text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </GlassCard>

        {/* Exclusions */}
        {exclusions.length > 0 && (
          <GlassCard className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Exclusiones</h3>
            <p className="mb-4 text-sm text-gray-600">
              Lo que no está cubierto:
            </p>
            <ul className="space-y-2">
              {exclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                  <span className="text-sm text-gray-700">{exclusion}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        )}
      </div>
    </section>
  );
}

export default RequirementsCard;
