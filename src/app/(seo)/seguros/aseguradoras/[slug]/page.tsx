/**
 * Insurance Company Profile Page Template
 * Generates individual pages for each company (10 pages total)
 * Example URLs: /seguros/aseguradoras/assa, /seguros/aseguradoras/mapfre, etc.
 */

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getInsuranceCompaniesByCountry,
  getInsuranceCompany,
  getInsuranceProduct,
} from '@/data';
import { generateInsuranceCompanyMetadata } from '@/lib/seo/metadata';
import {
  generateInsuranceCompanySchema,
  generateWebPageSchema,
} from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { CompanyProfile } from '@/components/seo/institution/CompanyProfile';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight } from 'lucide-react';

// Generate static params for all companies
export async function generateStaticParams() {
  const companies = getInsuranceCompaniesByCountry('panama');
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getInsuranceCompany('panama', slug);

  if (!company) {
    return {
      title: 'Aseguradora no encontrada',
      description: 'La aseguradora que buscas no existe.',
    };
  }

  return generateInsuranceCompanyMetadata(
    company.name,
    company.slug,
    company.seo.metaDescription
  );
}

export default async function InsuranceCompanyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getInsuranceCompany('panama', slug);

  if (!company) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup
        schema={[
          generateInsuranceCompanySchema(company),
          generateWebPageSchema(
            company.seo.metaTitle,
            company.seo.metaDescription,
            `https://kotkot.ai/seguros/aseguradoras/${company.slug}`,
            [
              { name: 'Seguros', url: 'https://kotkot.ai/seguros' },
              {
                name: 'Aseguradoras',
                url: 'https://kotkot.ai/seguros/aseguradoras',
              },
              {
                name: company.name,
                url: `https://kotkot.ai/seguros/aseguradoras/${company.slug}`,
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
              name: 'Aseguradoras',
              url: 'https://kotkot.ai/seguros/aseguradoras',
            },
            {
              name: company.name,
              url: `https://kotkot.ai/seguros/aseguradoras/${company.slug}`,
            },
          ]}
          className="mb-8"
        />

        {/* Company Profile */}
        <CompanyProfile company={company} />

        {/* Products Grid */}
        <section className="mt-12">
          <h2 className="mb-8 text-3xl font-bold text-[#111827]">
            Productos de {company.name}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {company.productsOffered.map((productType) => {
              const product = getInsuranceProduct(productType);
              if (!product) return null;

              return (
                <Link
                  key={productType}
                  href={`/seguros/${product.slug}/${company.slug}`}
                >
                  <GlassCard className="group relative h-full overflow-hidden p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                    {product.icon && (
                      <div className="mb-3 text-3xl">{product.icon}</div>
                    )}
                    <h3 className="mb-2 text-lg font-bold text-[#111827] group-hover:text-[#111827]">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-[#6b7280] line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0C1E35]">
                      Ver Detalles
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(202,255,4,0.08)] to-[rgba(202,255,4,0.04)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto mt-16 max-w-4xl">
          <GlassCard className="bg-[#CAFF04] p-12 text-center text-[#111827]">
            <h2 className="mb-4 text-3xl font-bold">
              ¿Quieres cotizar con {company.name}?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#6b7280]">
              Obtén una cotización personalizada en minutos por WhatsApp.
            </p>
            <a
              href={`https://wa.me/50760000000?text=Hola%2C%20quiero%20cotizar%20con%20${encodeURIComponent(
                company.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-[#111827] px-8 py-4 text-lg font-semibold text-white hover:bg-[#1f2937] transition-colors shadow-lg"
            >
              Cotizar Ahora
            </a>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
