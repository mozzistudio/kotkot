/**
 * Insurance Hub Page
 * Main landing page for insurance products
 */

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllInsuranceProducts, getInsuranceCompaniesByCountry } from '@/data';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebPageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Seguros en Panamá 2026 - Compara y Ahorra hasta 40% | kotkot.ai',
  description:
    'Compara seguros de auto, salud, vida, hogar y más en Panamá. Encuentra las mejores coberturas y precios de ASSA, MAPFRE, Sura y más aseguradoras. Cotiza gratis en minutos.',
  keywords: [
    'seguros panama',
    'comparar seguros',
    'seguro auto panama',
    'seguro salud panama',
    'seguro vida panama',
    'aseguradoras panama',
    'cotizar seguro',
  ],
  canonical: 'https://kotkot.ai/seguros',
});

export default function InsuranceHubPage() {
  const products = getAllInsuranceProducts();
  const companies = getInsuranceCompaniesByCountry('panama');

  // Top companies by rating
  const topCompanies = companies
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, 6);

  return (
    <>
      <SchemaMarkup
        schema={[
          generateOrganizationSchema(),
          generateWebPageSchema(
            'Seguros en Panamá - Comparador',
            'Compara seguros en Panamá: auto, salud, vida y más',
            'https://kotkot.ai/seguros',
            [{ name: 'Seguros', url: 'https://kotkot.ai/seguros' }]
          ),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: 'Seguros', url: 'https://kotkot.ai/seguros' }]}
          className="mb-8"
        />

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Compara Seguros en Panamá
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Encuentra el seguro perfecto para ti comparando coberturas, precios
            y beneficios de las principales aseguradoras de Panamá.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
          >
            Cotizar Gratis por WhatsApp
          </a>
        </section>

        {/* Product Categories */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Tipos de Seguros
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link key={product.slug} href={`/seguros/${product.slug}`}>
                <GlassCard className="group relative h-full overflow-hidden p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                  {/* Icon */}
                  {product.icon && (
                    <div className="mb-4 text-4xl">{product.icon}</div>
                  )}

                  {/* Name */}
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Price Range */}
                  {product.priceRanges && (
                    <Badge color="emerald" className="mb-4">
                      Desde {product.priceRanges.min}
                    </Badge>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    Ver Opciones
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Companies */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              Mejores Aseguradoras
            </h2>
            <Link
              href="/seguros/aseguradoras"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topCompanies.map((company) => (
              <Link
                key={company.slug}
                href={`/seguros/aseguradoras/${company.slug}`}
              >
                <GlassCard className="group relative h-full overflow-hidden p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {company.name}
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      {company.ratings.overall.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                      / 5.0 ({company.ratings.reviewCount} reseñas)
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {company.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    Ver Perfil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            ¿No estás seguro cuál elegir?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-emerald-50">
            Nuestro asistente por WhatsApp te ayuda a encontrar el seguro
            perfecto según tus necesidades y presupuesto.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20necesito%20ayuda%20para%20elegir%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-colors shadow-lg"
          >
            Hablar con un Asesor
          </a>
        </section>
      </div>
    </>
  );
}
