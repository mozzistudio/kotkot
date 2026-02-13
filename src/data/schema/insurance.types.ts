/**
 * Insurance Domain Type Definitions
 * Core types for the insurance comparison platform
 */

// Insurance categories available in the platform
export type InsuranceType =
  | 'auto'
  | 'salud'
  | 'vida'
  | 'hogar'
  | 'viaje'
  | 'mascota'
  | 'empresarial'
  | 'responsabilidad-civil'
  | 'accidentes-personales'
  | 'ahorro';

// Coverage details structure
export interface Coverage {
  name: string;
  description: string;
  included: boolean;
  limit?: string; // e.g., "$50,000", "Ilimitado"
  deductible?: string; // e.g., "$500", "10% del reclamo"
  notes?: string[];
}

// Comparison attribute structure
export interface ComparisonPoint {
  attribute: string;
  label: string;
  description?: string;
}

// SEO metadata structure
export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  canonicalUrl?: string;
}

// Insurance product metadata
export interface InsuranceProduct {
  type: InsuranceType;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon?: string;

  // SEO fields
  seo: SEOMetadata;

  // Content sections
  benefits: string[];
  whoNeedsIt: string[];
  coverageTypes: {
    name: string;
    description: string;
  }[];

  // Pricing context (general ranges, not specific quotes)
  priceRanges?: {
    min: string;
    max: string;
    factors: string[];
  };

  // FAQ specific to this product type
  faqs: {
    question: string;
    answer: string;
  }[];

  // Related products
  relatedProducts?: InsuranceType[];
}

// Company ratings structure
export interface CompanyRatings {
  overall: number; // 0-5
  customerService: number;
  claimsProcess: number;
  digitalExperience: number;
  priceValue: number;
  reviewCount?: number;
}

// Contact information
export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website: string;
  officeLocations?: {
    city: string;
    address: string;
  }[];
}

// Insurance company profile
export interface InsuranceCompany {
  slug: string;
  name: string;
  legalName?: string;
  logo?: string;
  country: string; // ISO code, e.g., "panama"

  // SEO fields
  seo: SEOMetadata;

  // Company info
  description: string;
  foundedYear?: number;
  headquarters?: string;

  // Products offered
  productsOffered: InsuranceType[];

  // Ratings and reviews
  ratings: CompanyRatings;

  // Pros and cons
  pros: string[];
  cons: string[];

  // Contact information
  contact: ContactInfo;

  // Digital capabilities
  digitalFeatures: {
    onlineQuotes: boolean;
    mobileApp: boolean;
    onlineClaims: boolean;
    chatSupport: boolean;
    whatsappSupport: boolean;
  };

  // Licenses and certifications
  licenses?: string[];

  // Additional notes
  specialties?: string[];
  marketPosition?: string; // e.g., "Líder en seguros de auto"
}

// Product × Company specific data (for cross pages)
export interface CrossPageData {
  productType: InsuranceType;
  companySlug: string;

  // SEO fields
  seo: SEOMetadata;

  // Specific coverages for this product from this company
  coverages: Coverage[];

  // Pricing details
  pricing: {
    startingPrice?: string;
    pricingFactors: string[];
    discountsAvailable: string[];
    paymentOptions: string[];
  };

  // Requirements and eligibility
  requirements: {
    minimumAge?: number;
    maximumAge?: number;
    requiredDocuments: string[];
    eligibilityCriteria: string[];
    exclusions: string[];
  };

  // Process information
  process: {
    applicationSteps: {
      step: number;
      title: string;
      description: string;
    }[];
    claimsSteps: {
      step: number;
      title: string;
      description: string;
    }[];
    averageApprovalTime?: string;
    averageClaimsTime?: string;
  };

  // Key features for this specific combination
  keyFeatures: string[];

  // Competitor comparison suggestions
  suggestedComparisons?: string[]; // Array of company slugs
}

// Comparison between two companies (for VS pages)
export interface CompanyComparison {
  slug: string; // e.g., "assa-vs-mapfre"
  companyA: string; // Company slug
  companyB: string; // Company slug
  productType?: InsuranceType; // Optional: specific product comparison

  // SEO fields
  seo: SEOMetadata;

  // Comparison matrix
  comparisonPoints: {
    category: string;
    attributes: {
      name: string;
      companyAValue: string | number | boolean;
      companyBValue: string | number | boolean;
      winner?: 'A' | 'B' | 'tie';
    }[];
  }[];

  // Summary
  summary: {
    bestFor: {
      companyA: string[];
      companyB: string[];
    };
    verdict: string;
  };
}

// Insurance hub data
export interface InsuranceHubData {
  title: string;
  description: string;
  seo: SEOMetadata;
  featuredProducts: InsuranceType[];
  popularComparisons: string[]; // Array of comparison slugs
  topCompanies: string[]; // Array of company slugs
}
