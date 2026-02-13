/**
 * Country and Market Type Definitions
 * Geographic and market-specific data
 */

// Country/market data
export interface CountryData {
  code: string; // ISO code, e.g., "panama", "colombia"
  name: string; // e.g., "Panamá"
  currency: string; // e.g., "USD", "COP"
  currencySymbol: string; // e.g., "$", "COP$"
  locale: string; // e.g., "es-PA", "es-CO"

  // Market information
  market: {
    insuranceCompaniesCount: number;
    lendersCount: number;
    regulatoryBody?: string; // e.g., "Superintendencia de Seguros de Panamá"
    marketSize?: string;
  };

  // Localization
  languageCode: string; // e.g., "es"
  timezone: string; // e.g., "America/Panama"

  // SEO
  urlPrefix?: string; // Optional country prefix for URLs, e.g., "/panama"
}
