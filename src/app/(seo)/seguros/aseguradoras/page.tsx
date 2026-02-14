/**
 * Insurance Companies Directory Page
 * Lists all insurance companies in Panama
 */

import React from 'react';
import type { Metadata } from 'next';
import { getInsuranceCompaniesByCountry } from '@/data';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateWebPageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { CompanyCard } from '@/components/seo/institution/CompanyCard';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Aseguradoras en Panamá 2026 - Directorio Completo | kotkot.ai',
  description:
    'Directorio de aseguradoras en Panamá. Compara ASSA, MAPFRE, Sura, Bupa y más. Calificaciones, reseñas y contacto de todas las compañías de seguros.',
  keywords: [
    'aseguradoras panama',
    'compañias de seguros panama',
    'seguros panama lista',
    'mejores aseguradoras panama',
  ],
  canonical: 'https://kotkot.ai/seguros/aseguradoras',
});

export default function InsuranceCompaniesDirectoryPage() {
  const companies = getInsuranceCompaniesByCountry('panama');

  // Sort by rating
  const sortedCompanies = [...companies].sort(
    (a, b) => b.ratings.overall - a.ratings.overall
  );

  return (
    <>
      <SchemaMarkup
        schema={generateWebPageSchema(
          'Aseguradoras en Panamá',
          'Directorio completo de aseguradoras en Panamá',
          'https://kotkot.ai/seguros/aseguradoras',
          [
            { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
            {
              name: 'Aseguradoras',
              url: 'https://kotkot.ai/seguros/aseguradoras',
            },
          ]
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
            {
              name: 'Aseguradoras',
              url: 'https://kotkot.ai/seguros/aseguradoras',
            },
          ]}
          className="mb-8"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            Aseguradoras en Panamá
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#6b7280]">
            Directorio completo de {companies.length} compañías de seguros
            autorizadas en Panamá. Compara calificaciones, productos y
            servicios.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedCompanies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>

        {/* CTA Section */}
        <section className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl bg-[#CAFF04] p-12 text-center text-[#111827]">
            <h2 className="mb-4 text-3xl font-bold">
              ¿No sabes cuál elegir?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
              Nuestro asistente te ayuda a encontrar la mejor aseguradora según
              tus necesidades.
            </p>
            <a
              href="https://wa.me/50760000000?text=Hola%2C%20necesito%20ayuda%20para%20elegir%20una%20aseguradora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#111827] px-8 py-4 text-lg font-semibold text-white hover:bg-[#1f2937] transition-colors shadow-lg"
            >
              Hablar con un Asesor
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
