/**
 * SEO Metadata Generation Utilities
 * Functions to generate Next.js metadata for SEO optimization
 */

import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate comprehensive SEO metadata for Next.js pages
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    image = 'https://kotkot.ai/og-image.png',
    noindex = false,
    nofollow = false,
  } = config;

  return {
    title,
    description,
    keywords: keywords.join(', '),

    // Open Graph
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'kotkot.ai',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_PA',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@kotkot_ai',
      site: '@kotkot_ai',
    },

    // Canonical URL
    alternates: canonical ? {
      canonical,
    } : undefined,

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    },

    // Additional metadata
    authors: [{ name: 'kotkot.ai' }],
    category: 'Insurance & Finance',
  };
}

/**
 * Generate metadata for insurance product pages
 */
export function generateInsuranceProductMetadata(
  productName: string,
  productType: string,
  description: string
): Metadata {
  return generateSEOMetadata({
    title: `${productName} en Panamá 2026 - Compara y Ahorra | kotkot.ai`,
    description,
    keywords: [
      `seguro ${productType} panama`,
      `${productName.toLowerCase()}`,
      `cotizar ${productType}`,
      `mejor seguro ${productType}`,
      `seguro ${productType} barato`,
      'comparar seguros panama',
    ],
    canonical: `https://kotkot.ai/seguros/${productType}`,
  });
}

/**
 * Generate metadata for insurance company pages
 */
export function generateInsuranceCompanyMetadata(
  companyName: string,
  companySlug: string,
  description: string
): Metadata {
  return generateSEOMetadata({
    title: `${companyName} Panamá 2026 - Seguros y Coberturas | kotkot.ai`,
    description,
    keywords: [
      `${companyName.toLowerCase()} panama`,
      `${companyName.toLowerCase()} seguros`,
      `seguros ${companyName.toLowerCase()}`,
      'aseguradora panama',
    ],
    canonical: `https://kotkot.ai/seguros/aseguradoras/${companySlug}`,
  });
}

/**
 * Generate metadata for cross pages (product × company)
 */
export function generateCrossPageMetadata(
  productName: string,
  productSlug: string,
  companyName: string,
  companySlug: string
): Metadata {
  return generateSEOMetadata({
    title: `${productName} ${companyName} Panamá 2026 - Cobertura y Precios | kotkot.ai`,
    description: `Todo sobre el ${productName.toLowerCase()} de ${companyName} en Panamá: coberturas, precios, requisitos y proceso. Compara con otras opciones y cotiza gratis.`,
    keywords: [
      `${productName.toLowerCase()} ${companyName.toLowerCase()}`,
      `${companyName.toLowerCase()} ${productSlug}`,
      `cotizar ${productSlug} ${companySlug}`,
      `precio ${productSlug} ${companyName.toLowerCase()}`,
    ],
    canonical: `https://kotkot.ai/seguros/${productSlug}/${companySlug}`,
  });
}

/**
 * Generate metadata for comparison pages (company A vs company B)
 */
export function generateComparisonMetadata(
  companyA: string,
  companyB: string,
  comparisonSlug: string,
  productType?: string
): Metadata {
  const productContext = productType ? ` en ${productType}` : '';

  return generateSEOMetadata({
    title: `${companyA} vs ${companyB}${productContext} - Comparación 2026 | kotkot.ai`,
    description: `Compara ${companyA} vs ${companyB}${productContext} en Panamá: precios, coberturas, servicio y más. ¿Cuál es mejor para ti? Análisis completo y objetivo.`,
    keywords: [
      `${companyA.toLowerCase()} vs ${companyB.toLowerCase()}`,
      `comparar ${companyA.toLowerCase()} ${companyB.toLowerCase()}`,
      `diferencia ${companyA.toLowerCase()} ${companyB.toLowerCase()}`,
      'comparacion seguros panama',
    ],
    canonical: `https://kotkot.ai/seguros/comparar/${comparisonSlug}`,
  });
}

/**
 * Generate metadata for loan product pages
 */
export function generateLoanProductMetadata(
  productName: string,
  productType: string,
  description: string
): Metadata {
  return generateSEOMetadata({
    title: `${productName} en Panamá 2026 - Compara Tasas y Bancos | kotkot.ai`,
    description,
    keywords: [
      `${productType} panama`,
      `${productName.toLowerCase()}`,
      `tasa ${productType}`,
      `mejor ${productType} panama`,
      'comparar prestamos panama',
    ],
    canonical: `https://kotkot.ai/prestamos/${productType}`,
  });
}

/**
 * Generate metadata for lender pages
 */
export function generateLenderMetadata(
  lenderName: string,
  lenderSlug: string,
  description: string
): Metadata {
  return generateSEOMetadata({
    title: `${lenderName} Panamá 2026 - Préstamos y Tasas | kotkot.ai`,
    description,
    keywords: [
      `${lenderName.toLowerCase()} panama`,
      `prestamos ${lenderName.toLowerCase()}`,
      `tasa ${lenderName.toLowerCase()}`,
      'banco panama prestamos',
    ],
    canonical: `https://kotkot.ai/prestamos/bancos/${lenderSlug}`,
  });
}

/**
 * Generate metadata for loan cross pages (product × lender)
 */
export function generateLoanCrossPageMetadata(
  productName: string,
  productSlug: string,
  lenderName: string,
  lenderSlug: string
): Metadata {
  return generateSEOMetadata({
    title: `${productName} ${lenderName} Panamá 2026 - Tasas y Requisitos | kotkot.ai`,
    description: `${productName} de ${lenderName} en Panamá: tasas de interés, montos, plazos, requisitos y proceso de solicitud. Compara y solicita en línea.`,
    keywords: [
      `${productName.toLowerCase()} ${lenderName.toLowerCase()}`,
      `tasa ${productSlug} ${lenderName.toLowerCase()}`,
      `solicitar ${productSlug} ${lenderSlug}`,
    ],
    canonical: `https://kotkot.ai/prestamos/${productSlug}/${lenderSlug}`,
  });
}
