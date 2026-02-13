/**
 * Schema.org Markup Generation Utilities
 * Functions to generate structured data for rich search results
 */

import type {
  InsuranceProduct,
  InsuranceCompany,
  LoanProduct,
  Lender,
} from '@/data/schema';

/**
 * Generate Organization schema for the site
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'kotkot.ai',
    legalName: 'kotkot.ai Inc.',
    url: 'https://kotkot.ai',
    logo: 'https://kotkot.ai/logo.png',
    description:
      'Plataforma de comparación de seguros y préstamos en Panamá y Latinoamérica.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PA',
      addressLocality: 'Ciudad de Panamá',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://www.facebook.com/kotkotai',
      'https://www.instagram.com/kotkotai',
      'https://www.linkedin.com/company/kotkotai',
    ],
  };
}

/**
 * Generate FinancialProduct schema for insurance products
 */
export function generateInsuranceProductSchema(
  product: InsuranceProduct,
  companies?: InsuranceCompany[]
) {
  const offers = companies?.map((company) => ({
    '@type': 'Offer',
    name: `${product.name} - ${company.name}`,
    seller: {
      '@type': 'Organization',
      name: company.name,
      url: company.contact.website,
    },
    availability: 'https://schema.org/InStock',
    url: `https://kotkot.ai/seguros/${product.slug}/${company.slug}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: product.name,
    description: product.longDescription,
    url: `https://kotkot.ai/seguros/${product.slug}`,
    category: 'Insurance',
    featureList: product.benefits,
    offers: offers || [],
    provider: {
      '@type': 'Organization',
      name: 'kotkot.ai',
      url: 'https://kotkot.ai',
    },
  };
}

/**
 * Generate Organization schema for insurance companies
 */
export function generateInsuranceCompanySchema(company: InsuranceCompany) {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: company.name,
    legalName: company.legalName,
    description: company.description,
    url: company.contact.website,
    telephone: company.contact.phone,
    email: company.contact.email,
    address: company.contact.officeLocations?.map((location) => ({
      '@type': 'PostalAddress',
      addressLocality: location.city,
      streetAddress: location.address,
      addressCountry: 'PA',
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: company.ratings.overall,
      bestRating: 5,
      worstRating: 0,
      reviewCount: company.ratings.reviewCount,
    },
    foundingDate: company.foundedYear?.toString(),
    areaServed: {
      '@type': 'Country',
      name: 'Panama',
    },
    sameAs: [company.contact.website],
  };
}

/**
 * Generate LoanOrCredit schema for loan products
 */
export function generateLoanProductSchema(product: LoanProduct, lenders?: Lender[]) {
  const offers = lenders?.map((lender) => ({
    '@type': 'Offer',
    name: `${product.name} - ${lender.name}`,
    seller: {
      '@type': 'FinancialService',
      name: lender.name,
      url: lender.contact.website,
    },
    availability: 'https://schema.org/InStock',
    url: `https://kotkot.ai/prestamos/${product.slug}/${lender.slug}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.name,
    description: product.longDescription,
    url: `https://kotkot.ai/prestamos/${product.slug}`,
    category: 'Loan',
    featureList: product.benefits,
    offers: offers || [],
    ...(product.typicalTerms && {
      amount: {
        '@type': 'MonetaryAmount',
        minValue: product.typicalTerms.loanAmounts?.min,
        maxValue: product.typicalTerms.loanAmounts?.max,
        currency: 'USD',
      },
      loanTerm: {
        '@type': 'QuantitativeValue',
        minValue: product.typicalTerms.termLengths?.min,
        maxValue: product.typicalTerms.termLengths?.max,
      },
    }),
  };
}

/**
 * Generate FinancialService schema for lenders
 */
export function generateLenderSchema(lender: Lender) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: lender.name,
    legalName: lender.legalName,
    description: lender.description,
    url: lender.contact.website,
    telephone: lender.contact.phone,
    email: lender.contact.email,
    address: lender.contact.officeLocations?.map((location) => ({
      '@type': 'PostalAddress',
      addressLocality: location.city,
      streetAddress: location.address,
      addressCountry: 'PA',
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: lender.ratings.overall,
      bestRating: 5,
      worstRating: 0,
      reviewCount: lender.ratings.reviewCount,
    },
    foundingDate: lender.foundedYear?.toString(),
    areaServed: {
      '@type': 'Country',
      name: 'Panama',
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebPage schema with breadcrumbs
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  breadcrumbs?: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'es-PA',
    ...(breadcrumbs && {
      breadcrumb: generateBreadcrumbSchema(breadcrumbs),
    }),
    publisher: {
      '@type': 'Organization',
      name: 'kotkot.ai',
      url: 'https://kotkot.ai',
    },
  };
}

/**
 * Generate HowTo schema for process steps
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ title: string; description: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

/**
 * Generate ComparisonTable schema (using Table schema)
 */
export function generateComparisonSchema(
  name: string,
  description: string,
  companyA: InsuranceCompany | Lender,
  companyB: InsuranceCompany | Lender
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: name,
    description,
    about: [
      {
        '@type': 'Organization',
        name: companyA.name,
        url: companyA.contact.website,
      },
      {
        '@type': 'Organization',
        name: companyB.name,
        url: companyB.contact.website,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'kotkot.ai',
      url: 'https://kotkot.ai',
    },
  };
}
