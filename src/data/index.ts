/**
 * Data Loaders with In-Memory Caching
 * Central data loading functions for all products, companies, and lenders
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import type {
  InsuranceType,
  InsuranceProduct,
  InsuranceCompany,
  CrossPageData,
  CompanyComparison,
  LoanType,
  LoanProduct,
  Lender,
  LoanCrossPageData,
  LenderComparison,
  CountryData,
} from './schema';

// In-memory cache
const cache = new Map<string, any>();

// Cache helper
function getFromCache<T>(key: string, loader: () => T): T {
  if (cache.has(key)) {
    return cache.get(key) as T;
  }
  const data = loader();
  cache.set(key, data);
  return data;
}

// Path helper
function getDataPath(...segments: string[]): string {
  return join(process.cwd(), 'src', 'data', ...segments);
}

// Safe JSON loader with error handling
function loadJSON<T>(filePath: string): T | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error loading JSON from ${filePath}:`, error);
    return null;
  }
}

// ============================================================================
// INSURANCE DATA LOADERS
// ============================================================================

/**
 * Get all insurance products
 */
export function getAllInsuranceProducts(): InsuranceProduct[] {
  return getFromCache('insurance:products:all', () => {
    const productTypes: InsuranceType[] = [
      'auto',
      'salud',
      'vida',
      'hogar',
      'viaje',
      'mascota',
      'empresarial',
      'responsabilidad-civil',
      'accidentes-personales',
      'ahorro',
    ];

    const products: InsuranceProduct[] = [];
    for (const type of productTypes) {
      const product = loadJSON<InsuranceProduct>(
        getDataPath('insurance', 'products', `${type}.json`)
      );
      if (product) {
        products.push(product);
      }
    }
    return products;
  });
}

/**
 * Get a specific insurance product by type
 */
export function getInsuranceProduct(type: string): InsuranceProduct | null {
  return getFromCache(`insurance:product:${type}`, () => {
    return loadJSON<InsuranceProduct>(
      getDataPath('insurance', 'products', `${type}.json`)
    );
  });
}

/**
 * Get all insurance companies for a country
 */
export function getInsuranceCompaniesByCountry(country: string): InsuranceCompany[] {
  return getFromCache(`insurance:companies:${country}`, () => {
    const companySlugs = [
      'assa',
      'mapfre',
      'sura',
      'acerta',
      'fedpa',
      'bupa',
      'vivir-seguros',
      'atlas',
      'banistmo-seguros',
      'generali',
    ];

    const companies: InsuranceCompany[] = [];
    for (const slug of companySlugs) {
      const company = loadJSON<InsuranceCompany>(
        getDataPath('insurance', 'companies', country, `${slug}.json`)
      );
      if (company) {
        companies.push(company);
      }
    }
    return companies;
  });
}

/**
 * Get a specific insurance company by country and slug
 */
export function getInsuranceCompany(country: string, slug: string): InsuranceCompany | null {
  return getFromCache(`insurance:company:${country}:${slug}`, () => {
    return loadJSON<InsuranceCompany>(
      getDataPath('insurance', 'companies', country, `${slug}.json`)
    );
  });
}

/**
 * Get cross-page data for a specific product and company
 */
export function getInsuranceCrossPageData(
  country: string,
  productType: string,
  companySlug: string
): CrossPageData | null {
  const company = getInsuranceCompany(country, companySlug);
  if (!company) return null;

  // Check if company offers this product
  if (!company.productsOffered.includes(productType as InsuranceType)) {
    return null;
  }

  // Load cross-page data if it exists as a separate file
  // For MVP, we'll generate it from company data
  return getFromCache(`insurance:cross:${country}:${productType}:${companySlug}`, () => {
    return loadJSON<CrossPageData>(
      getDataPath('insurance', 'companies', country, `${companySlug}-${productType}.json`)
    );
  });
}

/**
 * Generate all valid insurance cross-page combinations for a country
 */
export function generateInsuranceCrossPages(country: string): Array<{
  product: string;
  company: string;
  productSlug: string;
  companySlug: string;
}> {
  return getFromCache(`insurance:cross-pages:${country}`, () => {
    const products = getAllInsuranceProducts();
    const companies = getInsuranceCompaniesByCountry(country);
    const crossPages: Array<{
      product: string;
      company: string;
      productSlug: string;
      companySlug: string;
    }> = [];

    for (const product of products) {
      for (const company of companies) {
        // Only create cross page if company offers this product
        if (company.productsOffered.includes(product.type)) {
          crossPages.push({
            product: product.name,
            company: company.name,
            productSlug: product.slug,
            companySlug: company.slug,
          });
        }
      }
    }

    return crossPages;
  });
}

/**
 * Generate all valid insurance company comparisons for a country
 */
export function generateInsuranceComparisons(country: string): Array<{
  slug: string;
  companyA: string;
  companyB: string;
}> {
  return getFromCache(`insurance:comparisons:${country}`, () => {
    const companies = getInsuranceCompaniesByCountry(country);
    const comparisons: Array<{
      slug: string;
      companyA: string;
      companyB: string;
    }> = [];

    // Generate all unique pairs
    for (let i = 0; i < companies.length; i++) {
      for (let j = i + 1; j < companies.length; j++) {
        const companyA = companies[i];
        const companyB = companies[j];
        comparisons.push({
          slug: `${companyA.slug}-vs-${companyB.slug}`,
          companyA: companyA.slug,
          companyB: companyB.slug,
        });
      }
    }

    return comparisons;
  });
}

// ============================================================================
// LOAN DATA LOADERS
// ============================================================================

/**
 * Get all loan products
 */
export function getAllLoanProducts(): LoanProduct[] {
  return getFromCache('loans:products:all', () => {
    const productTypes: LoanType[] = [
      'personal',
      'hipotecario',
      'auto',
      'comercial',
      'pyme',
      'construccion',
      'educativo',
      'consolidacion-deudas',
    ];

    const products: LoanProduct[] = [];
    for (const type of productTypes) {
      const product = loadJSON<LoanProduct>(
        getDataPath('loans', 'products', `${type}.json`)
      );
      if (product) {
        products.push(product);
      }
    }
    return products;
  });
}

/**
 * Get a specific loan product by type
 */
export function getLoanProduct(type: string): LoanProduct | null {
  return getFromCache(`loans:product:${type}`, () => {
    return loadJSON<LoanProduct>(
      getDataPath('loans', 'products', `${type}.json`)
    );
  });
}

/**
 * Get all lenders for a country
 */
export function getLendersByCountry(country: string): Lender[] {
  return getFromCache(`loans:lenders:${country}`, () => {
    const lenderSlugs = [
      'banco-general',
      'bac-credomatic',
      'banistmo',
      'banco-nacional',
      'global-bank',
      'credicorp-bank',
      'multibank',
      'scotiabank',
      'citibank',
      'bcv-banco',
      'towerbank',
      'banco-delta',
      'banesco',
      'banco-lafise',
    ];

    const lenders: Lender[] = [];
    for (const slug of lenderSlugs) {
      const lender = loadJSON<Lender>(
        getDataPath('loans', 'lenders', country, `${slug}.json`)
      );
      if (lender) {
        lenders.push(lender);
      }
    }
    return lenders;
  });
}

/**
 * Get a specific lender by country and slug
 */
export function getLender(country: string, slug: string): Lender | null {
  return getFromCache(`loans:lender:${country}:${slug}`, () => {
    return loadJSON<Lender>(
      getDataPath('loans', 'lenders', country, `${slug}.json`)
    );
  });
}

/**
 * Get cross-page data for a specific loan product and lender
 */
export function getLoanCrossPageData(
  country: string,
  productType: string,
  lenderSlug: string
): LoanCrossPageData | null {
  const lender = getLender(country, lenderSlug);
  if (!lender) return null;

  // Check if lender offers this product
  if (!lender.loansOffered.includes(productType as LoanType)) {
    return null;
  }

  return getFromCache(`loans:cross:${country}:${productType}:${lenderSlug}`, () => {
    return loadJSON<LoanCrossPageData>(
      getDataPath('loans', 'lenders', country, `${lenderSlug}-${productType}.json`)
    );
  });
}

/**
 * Generate all valid loan cross-page combinations for a country
 */
export function generateLoanCrossPages(country: string): Array<{
  product: string;
  lender: string;
  productSlug: string;
  lenderSlug: string;
}> {
  return getFromCache(`loans:cross-pages:${country}`, () => {
    const products = getAllLoanProducts();
    const lenders = getLendersByCountry(country);
    const crossPages: Array<{
      product: string;
      lender: string;
      productSlug: string;
      lenderSlug: string;
    }> = [];

    for (const product of products) {
      for (const lender of lenders) {
        // Only create cross page if lender offers this product
        if (lender.loansOffered.includes(product.type)) {
          crossPages.push({
            product: product.name,
            lender: lender.name,
            productSlug: product.slug,
            lenderSlug: lender.slug,
          });
        }
      }
    }

    return crossPages;
  });
}

/**
 * Generate all valid lender comparisons for a country
 */
export function generateLoanComparisons(country: string): Array<{
  slug: string;
  lenderA: string;
  lenderB: string;
}> {
  return getFromCache(`loans:comparisons:${country}`, () => {
    const lenders = getLendersByCountry(country);
    const comparisons: Array<{
      slug: string;
      lenderA: string;
      lenderB: string;
    }> = [];

    // Generate all unique pairs
    for (let i = 0; i < lenders.length; i++) {
      for (let j = i + 1; j < lenders.length; j++) {
        const lenderA = lenders[i];
        const lenderB = lenders[j];
        comparisons.push({
          slug: `${lenderA.slug}-vs-${lenderB.slug}`,
          lenderA: lenderA.slug,
          lenderB: lenderB.slug,
        });
      }
    }

    return comparisons;
  });
}

// ============================================================================
// COUNTRY DATA LOADERS
// ============================================================================

/**
 * Get country data
 */
export function getCountryData(countryCode: string): CountryData | null {
  return getFromCache(`country:${countryCode}`, () => {
    return loadJSON<CountryData>(
      getDataPath('countries', `${countryCode}.json`)
    );
  });
}

// ============================================================================
// CACHE MANAGEMENT
// ============================================================================

/**
 * Clear all cached data (useful for development)
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
