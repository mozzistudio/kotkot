/**
 * Loans Hub Page
 * Main landing page for loan products
 */

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebPageSchema } from '@/lib/seo/schema';
import { SchemaMarkup } from '@/components/seo/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/seo/layout/Breadcrumbs';
import { GlassCard } from '@/components/ui/GlassCard';

const loanProducts = [
  {
    slug: 'personal',
    name: 'Préstamo Personal',
    icon: '💳',
    description: 'Financiamiento flexible para tus proyectos personales. Desde consolidación de deudas hasta viajes y emergencias.',
    rate: 'Desde 7.5% anual',
    amount: '$1,000 - $50,000',
    term: '12 - 84 meses',
  },
  {
    slug: 'hipotecario',
    name: 'Préstamo Hipotecario',
    icon: '🏡',
    description: 'Haz realidad el sueño de tu casa propia. Las mejores tasas del mercado con plazos de hasta 30 años.',
    rate: 'Desde 4.75% anual',
    amount: '$30,000 - $500,000',
    term: '5 - 30 años',
  },
  {
    slug: 'auto',
    name: 'Préstamo de Auto',
    icon: '🚙',
    description: 'Financia tu vehículo nuevo o usado con tasas competitivas y aprobación rápida.',
    rate: 'Desde 5.5% anual',
    amount: '$5,000 - $100,000',
    term: '12 - 84 meses',
  },
  {
    slug: 'empresarial',
    name: 'Préstamo Empresarial',
    icon: '💼',
    description: 'Capital de trabajo, expansión y equipamiento para hacer crecer tu negocio.',
    rate: 'Desde 8.0% anual',
    amount: '$10,000 - $500,000',
    term: '12 - 120 meses',
  },
];

const topBanks = [
  { name: 'Banco General', description: 'Líder del mercado panameño', slug: 'banco-general' },
  { name: 'BAC Credomatic', description: 'Innovación en banca digital', slug: 'bac-credomatic' },
  { name: 'Banistmo', description: 'Soluciones financieras completas', slug: 'banistmo' },
  { name: 'Banco Nacional', description: 'Banca al servicio del país', slug: 'banco-nacional' },
  { name: 'Global Bank', description: 'Banca personalizada', slug: 'global-bank' },
  { name: 'Multibank', description: 'Créditos ágiles y flexibles', slug: 'multibank' },
];

export const metadata: Metadata = generateSEOMetadata({
  title: 'Préstamos en Panamá 2026 - Compara Tasas y Bancos | kotkot.ai',
  description:
    'Compara préstamos personales, hipotecarios, de auto y empresariales en Panamá. Encuentra las mejores tasas de interés de Banco General, BAC, Banistmo y más. Solicita en línea.',
  keywords: [
    'prestamos panama',
    'comparar prestamos',
    'prestamo personal panama',
    'prestamo hipotecario panama',
    'prestamo auto panama',
    'bancos panama',
    'tasas de interes panama',
  ],
  canonical: 'https://kotkot.ai/prestamos',
});

export default function LoansHubPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          generateOrganizationSchema(),
          generateWebPageSchema(
            'Préstamos en Panamá - Comparador',
            'Compara préstamos en Panamá: personal, hipotecario, auto y más',
            'https://kotkot.ai/prestamos',
            [{ name: 'Préstamos', url: 'https://kotkot.ai/prestamos' }]
          ),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ name: 'Préstamos', url: 'https://kotkot.ai/prestamos' }]}
          className="mb-8"
        />

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Compara Préstamos en Panamá
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
            Encuentra el préstamo ideal comparando tasas de interés, plazos
            y condiciones de los principales bancos de Panamá.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20quiero%20comparar%20pr%C3%A9stamos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] hover:bg-[var(--action-primary-hover)] transition-colors border border-[rgba(202,255,4,0.40)]"
          >
            Comparar Gratis por WhatsApp
          </a>
        </section>

        {/* Loan Types */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">
            Tipos de Préstamos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {loanProducts.map((product) => (
              <Link key={product.slug} href={`/prestamos/${product.slug}`}>
                <GlassCard className="group relative h-full overflow-hidden p-6 transition-all hover:scale-[1.02]">
                  <div className="mb-4 text-4xl">{product.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--text-secondary)]">
                    {product.description}
                  </p>
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Tasa</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{product.rate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Monto</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{product.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Plazo</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{product.term}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--dark-blue)]">
                    Comparar Opciones
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 -z-10 bg-[rgba(202,255,4,0.04)] opacity-0 transition-opacity group-hover:opacity-100" />
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Banks */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[var(--text-primary)]">
            Principales Bancos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topBanks.map((bank) => (
              <GlassCard key={bank.slug} className="p-6">
                <h3 className="mb-1 text-lg font-bold text-[var(--text-primary)]">
                  {bank.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{bank.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-[var(--accent)] p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">
            ¿No sabes cuál préstamo elegir?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
            Nuestro asistente por WhatsApp te ayuda a encontrar el préstamo
            perfecto según tus necesidades y capacidad de pago.
          </p>
          <a
            href="https://wa.me/50760000000?text=Hola%2C%20necesito%20ayuda%20para%20elegir%20un%20pr%C3%A9stamo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[var(--text-primary)] px-8 py-4 text-lg font-semibold text-white hover:bg-[var(--text-primary)] transition-colors"
          >
            Hablar con un Asesor
          </a>
        </section>
      </div>
    </>
  );
}
