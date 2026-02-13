/**
 * Requirements Card Component
 * Displays requirements and eligibility criteria
 */

import React from 'react';
import { Check, X } from 'lucide-react';

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
      <h2 className="mb-8 text-3xl font-bold text-[#111827]">
        Requisitos y Elegibilidad
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Requirements */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-6">
          <h3 className="mb-4 text-xl font-bold text-[#111827]">Requisitos</h3>

          {/* Age Requirements */}
          {(minimumAge || maximumAge) && (
            <div className="mb-4 rounded-[12px] bg-[rgba(202,255,4,0.15)] p-4">
              <p className="text-sm font-medium text-[#111827]">
                Edad requerida: {minimumAge || 18} - {maximumAge || 65} años
              </p>
            </div>
          )}

          {/* Documents */}
          {requiredDocuments.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-[#111827]">
                Documentos Requeridos:
              </h4>
              <ul className="space-y-2">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[12px] p-1">
                      <Check className="h-4 w-4 text-[#111827]" />
                    </div>
                    <span className="text-sm text-[#6b7280]">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          {eligibilityCriteria.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[#111827]">
                Criterios de Elegibilidad:
              </h4>
              <ul className="space-y-2">
                {eligibilityCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5 bg-[rgba(202,255,4,0.15)] rounded-[12px] p-1">
                      <Check className="h-4 w-4 text-[#111827]" />
                    </div>
                    <span className="text-sm text-[#6b7280]">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Exclusions */}
        {exclusions.length > 0 && (
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-6">
            <h3 className="mb-4 text-xl font-bold text-[#111827]">Exclusiones</h3>
            <p className="mb-4 text-sm text-[#6b7280]">
              Lo que no está cubierto:
            </p>
            <ul className="space-y-2">
              {exclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
                  <span className="text-sm text-[#6b7280]">{exclusion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default RequirementsCard;
