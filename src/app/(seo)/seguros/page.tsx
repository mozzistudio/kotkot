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
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Compara Seguros en Panamá
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
            Encuentra el seguro perfecto para ti comparando coberturas, precios
            y beneficios de las principales aseguradoras de Panamá.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] hover:bg-[var(--action-primary-hover)] transition-colors shadow-lg shadow-[rgba(202,255,4,0.2)]"
          >
            Cotizar Gratis por WhatsApp
          </a>
        </section>

        {/* Product Categories */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">
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
                  <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Price Range */}
                  {product.priceRanges && (
                    <Badge color="lime" className="mb-4">
                      Desde {product.priceRanges.min}
                    </Badge>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)]">
                    Ver Opciones
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(202,255,4,0.08)] to-[rgba(202,255,4,0.04)] opacity-0 transition-opacity group-hover:opacity-100" />
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Companies */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              Mejores Aseguradoras
            </h2>
            <Link
              href="/seguros/aseguradoras"
              className="text-sm font-semibold text-[var(--dark-blue)] hover:text-[var(--text-primary)]"
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
                  <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
                    {company.name}
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-[var(--dark-blue)]">
                      {company.ratings.overall.toFixed(1)}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      / 5.0 ({company.ratings.reviewCount} reseñas)
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {company.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)]">
                    Ver Perfil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(202,255,4,0.08)] to-[rgba(202,255,4,0.04)] opacity-0 transition-opacity group-hover:opacity-100" />
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-[var(--accent)] p-12 text-center text-[var(--text-primary)]">
          <h2 className="mb-4 text-3xl font-bold">
            ¿No estás seguro cuál elegir?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
            Nuestro asistente por WhatsApp te ayuda a encontrar el seguro
            perfecto según tus necesidades y presupuesto.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20necesito%20ayuda%20para%20elegir%20un%20seguro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[var(--text-primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--text-primary)] transition-colors shadow-lg"
          >
            Hablar con un Asesor
          </a>
        </section>
      </div>
    </>
  );
}
