/**
 * Insurance Cross-Page Template (Product × Company)
 * Generates pages for each valid product-company combination (~90 pages)
 * Example URLs: /seguros/auto/assa, /seguros/salud/mapfre, etc.
 */

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  generateInsuranceCrossPages,
  getInsuranceProduct,
  getInsuranceCompany,
  getInsuranceCompaniesByCountry,
} from '@/data';
import { generateCrossPageMetadata } from '@/lib/seo/metadata';
import { generateWebPageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Star, Check, Phone } from 'lucide-react';

// Generate static params for all valid cross-page combinations
export async function generateStaticParams() {
  const crossPages = generateInsuranceCrossPages('panama');
  return crossPages.map((page) => ({
    tipo: page.productSlug,
    aseguradora: page.companySlug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string; aseguradora: string }>;
}): Promise<Metadata> {
  const { tipo, aseguradora } = await params;
  const product = getInsuranceProduct(tipo);
  const company = getInsuranceCompany('panama', aseguradora);

  if (!product || !company) {
    return {
      title: 'Página no encontrada',
      description: 'La combinación que buscas no existe.',
    };
  }

  return generateCrossPageMetadata(
    product.name,
    product.slug,
    company.name,
    company.slug
  );
}

export default async function InsuranceCrossPage({
  params,
}: {
  params: Promise<{ tipo: string; aseguradora: string }>;
}) {
  const { tipo, aseguradora } = await params;
  const product = getInsuranceProduct(tipo);
  const company = getInsuranceCompany('panama', aseguradora);

  // Validate that company offers this product
  if (
    !product ||
    !company ||
    !company.productsOffered.includes(product.type)
  ) {
    notFound();
  }

  // Get other companies offering this product for comparison
  const allCompanies = getInsuranceCompaniesByCountry('panama');
  const competingCompanies = allCompanies
    .filter(
      (c) =>
        c.slug !== company.slug && c.productsOffered.includes(product.type)
    )
    .slice(0, 3);

  return (
    <>
      <SchemaMarkup
        schema={generateWebPageSchema(
          `${product.name} ${company.name} en Panamá`,
          `Todo sobre el ${product.name.toLowerCase()} de ${company.name}`,
          `https://kotkot.ai/seguros/${product.slug}/${company.slug}`,
          [
            { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
            {
              name: product.name,
              url: `https://kotkot.ai/seguros/${product.slug}`,
            },
            {
              name: company.name,
              url: `https://kotkot.ai/seguros/${product.slug}/${company.slug}`,
            },
          ]
        )}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
            {
              name: product.name,
              url: `https://kotkot.ai/seguros/${product.slug}`,
            },
            {
              name: company.name,
              url: `https://kotkot.ai/seguros/${product.slug}/${company.slug}`,
            },
          ]}
          className="mb-8"
        />

        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              {product.icon && (
                <span className="text-2xl">{product.icon}</span>
              )}
              <span>→</span>
              <span className="font-semibold">{company.name}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {product.name} {company.name}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Toda la información sobre el {product.name.toLowerCase()} de{' '}
              {company.name} en Panamá: coberturas, precios, requisitos y cómo
              contratarlo.
            </p>

            {/* Company Rating */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-gray-900">
                  {company.ratings.overall.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600">
                ({company.ratings.reviewCount || 0} reseñas)
              </span>
            </div>

            {/* CTA Button */}
            <a
              href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20${encodeURIComponent(
                product.name
              )}%20con%20${encodeURIComponent(company.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <Phone className="h-5 w-5" />
              Cotizar por WhatsApp
            </a>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            ¿Por qué elegir {company.name}?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {company.pros.slice(0, 6).map((pro, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 flex-shrink-0 text-emerald-600 mt-1" />
                  <p className="text-gray-700">{pro}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Coverage Details */}
        <section className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            ¿Qué cubre?
          </h2>
          <GlassCard className="p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {product.coverageTypes.slice(0, 6).map((coverage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 flex-shrink-0 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {coverage.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {coverage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Pricing Section */}
        {product.priceRanges && (
          <section className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Precios y Factores
            </h2>
            <GlassCard className="p-8">
              <div className="mb-6">
                <p className="mb-4 text-gray-700">
                  El costo del {product.name.toLowerCase()} en {company.name}{' '}
                  varía según tus necesidades:
                </p>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-emerald-600">
                    {product.priceRanges.min}
                  </span>
                  <span className="text-xl text-gray-600">a</span>
                  <span className="text-3xl font-bold text-emerald-600">
                    {product.priceRanges.max}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900">
                  Factores que afectan el precio:
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.priceRanges.factors.slice(0, 8).map((factor, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge color="gray" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <span className="text-sm text-gray-700">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </section>
        )}

        {/* Company Comparison */}
        {competingCompanies.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Comparar con Otras Opciones
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {competingCompanies.map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/seguros/${product.slug}/${competitor.slug}`}
                >
                  <GlassCard className="group h-full p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-emerald-600">
                      {competitor.name}
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {competitor.ratings.overall.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {competitor.description}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {product.faqs.slice(0, 3).map((faq, index) => (
                <GlassCard key={index} className="p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Company Profile Link */}
        <section className="mb-12">
          <GlassCard className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Más sobre {company.name}
            </h2>
            <p className="mb-6 text-gray-600">
              Conoce más detalles sobre esta aseguradora, sus otros productos y
              opiniones de clientes.
            </p>
            <Link
              href={`/seguros/aseguradoras/${company.slug}`}
              className="inline-flex items-center rounded-xl border-2 border-emerald-600 px-6 py-3 font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Ver Perfil Completo de {company.name}
            </Link>
          </GlassCard>
        </section>

        {/* Final CTA */}
        <section>
          <GlassCard className="bg-gradient-to-br from-emerald-600 to-teal-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">
              ¿Listo para contratar con {company.name}?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-emerald-50">
              Obtén tu cotización personalizada en minutos. Sin compromiso.
            </p>
            <a
              href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20${encodeURIComponent(
                product.name
              )}%20con%20${encodeURIComponent(company.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 hover:bg-gray-50 transition-colors shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Cotizar Ahora por WhatsApp
            </a>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
