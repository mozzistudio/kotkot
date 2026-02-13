/**
 * Insurance Product Page Template
 * Generates individual pages for each insurance type (10 pages total)
 * Example URLs: /seguros/auto, /seguros/salud, /seguros/vida, etc.
 */

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllInsuranceProducts,
  getInsuranceProduct,
  getInsuranceCompaniesByCountry,
} from '@/data';
import { generateInsuranceProductMetadata } from '@/lib/seo/metadata';
import {
  generateInsuranceProductSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { ProductHero } from '@/components/seo/product/ProductHero';
import { BenefitsSection } from '@/components/seo/product/BenefitsSection';
import { CompanyCard } from '@/components/seo/institution/CompanyCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

// Generate static params for all insurance types
export async function generateStaticParams() {
  const products = getAllInsuranceProducts();
  return products.map((product) => ({
    tipo: product.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string }>;
}): Promise<Metadata> {
  const { tipo } = await params;
  const product = getInsuranceProduct(tipo);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto de seguro que buscas no existe.',
    };
  }

  return generateInsuranceProductMetadata(
    product.name,
    product.slug,
    product.seo.metaDescription
  );
}

export default async function InsuranceProductPage({
  params,
}: {
  params: Promise<{ tipo: string }>;
}) {
  const { tipo } = await params;
  const product = getInsuranceProduct(tipo);

  if (!product) {
    notFound();
  }

  // Get companies that offer this product
  const allCompanies = getInsuranceCompaniesByCountry('panama');
  const companies = allCompanies.filter((company) =>
    company.productsOffered.includes(product.type)
  );

  return (
    <>
      <SchemaMarkup
        schema={[
          generateInsuranceProductSchema(product, companies),
          generateFAQSchema(product.faqs),
          generateWebPageSchema(
            product.seo.metaTitle,
            product.seo.metaDescription,
            `https://kotkot.ai/seguros/${product.slug}`,
            [
              { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
              {
                name: product.name,
                url: `https://kotkot.ai/seguros/${product.slug}`,
              },
            ]
          ),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
            {
              name: product.name,
              url: `https://kotkot.ai/seguros/${product.slug}`,
            },
          ]}
          className="mb-8"
        />

        {/* Hero Section */}
        <ProductHero product={product} />

        {/* Benefits Section */}
        <BenefitsSection
          title="¿Qué cubre?"
          benefits={product.benefits}
          whoNeedsIt={product.whoNeedsIt}
        />

        {/* Coverage Types */}
        {product.coverageTypes && product.coverageTypes.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Tipos de Cobertura
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.coverageTypes.map((coverage, index) => (
                <GlassCard key={index} className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {coverage.name}
                  </h3>
                  <p className="text-gray-600">{coverage.description}</p>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Price Ranges */}
        {product.priceRanges && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              ¿Cuánto cuesta?
            </h2>
            <GlassCard className="p-8">
              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#059669]">
                  {product.priceRanges.min}
                </span>
                <span className="text-xl text-gray-600">a</span>
                <span className="text-4xl font-bold text-[#059669]">
                  {product.priceRanges.max}
                </span>
              </div>
              <p className="mb-6 text-gray-600">
                El precio depende de varios factores:
              </p>
              <ul className="space-y-2">
                {product.priceRanges.factors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge color="gray" className="mt-1">
                      {index + 1}
                    </Badge>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </section>
        )}

        {/* Companies Offering This Product */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Compara Aseguradoras
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            {companies.length} aseguradoras ofrecen {product.name.toLowerCase()}{' '}
            en Panamá
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard
                key={company.slug}
                company={company}
                productType={product.slug}
                basePath="seguros"
              />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {product.faqs.map((faq, index) => (
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

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              También te puede interesar
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.relatedProducts.map((relatedType) => {
                const relatedProduct = getInsuranceProduct(relatedType);
                if (!relatedProduct) return null;

                return (
                  <Link
                    key={relatedType}
                    href={`/seguros/${relatedType}`}
                    className="group"
                  >
                    <GlassCard className="p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                      {relatedProduct.icon && (
                        <div className="mb-3 text-3xl">
                          {relatedProduct.icon}
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-[#059669]">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedProduct.shortDescription}
                      </p>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <GlassCard className="bg-[#CAFF04] p-12 text-center text-[#111827]">
            <h2 className="mb-4 text-3xl font-bold">
              ¿Listo para cotizar tu {product.name.toLowerCase()}?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
              Recibe cotizaciones personalizadas de las mejores aseguradoras en
              minutos por WhatsApp.
            </p>
            <a
              href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20${encodeURIComponent(
                product.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#111827] px-8 py-4 text-lg font-semibold text-white hover:bg-gray-50 transition-colors shadow-lg"
            >
              Cotizar Ahora por WhatsApp
            </a>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
