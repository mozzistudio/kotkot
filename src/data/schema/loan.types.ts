/**
 * Loan Domain Type Definitions
 * Core types for the loan comparison platform
 */

import { SEOMetadata, ContactInfo } from './insurance.types';

// Loan categories available in the platform
export type LoanType =
  | 'personal'
  | 'hipotecario'
  | 'auto'
  | 'comercial'
  | 'pyme'
  | 'construccion'
  | 'educativo'
  | 'consolidacion-deudas';

// Loan product metadata
export interface LoanProduct {
  type: LoanType;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon?: string;

  // SEO fields
  seo: SEOMetadata;

  // Content sections
  benefits: string[];
  idealFor: string[];
  useCases: string[];

  // Typical terms (general ranges, not specific quotes)
  typicalTerms?: {
    interestRates: {
      min: string;
      max: string;
    };
    loanAmounts: {
      min: string;
      max: string;
    };
    termLengths: {
      min: string;
      max: string;
    };
    factors: string[]; // What affects rates/terms
  };

  // FAQ specific to this loan type
  faqs: {
    question: string;
    answer: string;
  }[];

  // Related loan types
  relatedProducts?: LoanType[];
}

// Lender ratings structure
export interface LenderRatings {
  overall: number; // 0-5
  approvalSpeed: number;
  customerService: number;
  digitalExperience: number;
  transparencyFees: number;
  flexibilityTerms: number;
  reviewCount?: number;
}

// Lender profile (banks, credit unions, fintechs)
export interface Lender {
  slug: string;
  name: string;
  legalName?: string;
  logo?: string;
  country: string; // ISO code, e.g., "panama"
  type: 'bank' | 'credit-union' | 'fintech' | 'cooperative';

  // SEO fields
  seo: SEOMetadata;

  // Lender info
  description: string;
  foundedYear?: number;
  headquarters?: string;

  // Products offered
  loansOffered: LoanType[];

  // Ratings and reviews
  ratings: LenderRatings;

  // Pros and cons
  pros: string[];
  cons: string[];

  // Contact information
  contact: ContactInfo;

  // Digital capabilities
  digitalFeatures: {
    onlineApplication: boolean;
    instantPreapproval: boolean;
    mobileApp: boolean;
    documentUpload: boolean;
    chatSupport: boolean;
    whatsappSupport: boolean;
  };

  // Licenses and certifications
  licenses?: string[];
  superintendenciaRegistered?: boolean;

  // Additional notes
  specialties?: string[];
  marketPosition?: string; // e.g., "Líder en préstamos hipotecarios"
}

// Product × Lender specific data (for cross pages)
export interface LoanCrossPageData {
  productType: LoanType;
  lenderSlug: string;

  // SEO fields
  seo: SEOMetadata;

  // Specific terms for this loan from this lender
  terms: {
    interestRates: {
      min: string;
      max: string;
      type: 'fixed' | 'variable' | 'mixed';
      notes?: string[];
    };
    loanAmounts: {
      min: string;
      max: string;
      currency: string;
    };
    termLengths: {
      min: string; // e.g., "12 meses"
      max: string; // e.g., "25 años"
    };
    apr?: string; // Annual Percentage Rate
  };

  // Fees structure
  fees: {
    name: string;
    amount: string;
    type: 'one-time' | 'monthly' | 'percentage';
    description?: string;
  }[];

  // Requirements and eligibility
  requirements: {
    minimumAge?: number;
    maximumAge?: number;
    minimumIncome?: string;
    employmentType?: string[];
    creditScoreMinimum?: number;
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
      estimatedTime?: string;
    }[];
    averageApprovalTime?: string;
    averageDisbursementTime?: string;
    preapprovalAvailable: boolean;
  };

  // Key features for this specific combination
  keyFeatures: string[];

  // Special offers or promotions
  promotions?: {
    title: string;
    description: string;
    validUntil?: string;
  }[];

  // Competitor comparison suggestions
  suggestedComparisons?: string[]; // Array of lender slugs
}

// Comparison between two lenders (for VS pages)
export interface LenderComparison {
  slug: string; // e.g., "banco-general-vs-bac"
  lenderA: string; // Lender slug
  lenderB: string; // Lender slug
  productType?: LoanType; // Optional: specific product comparison

  // SEO fields
  seo: SEOMetadata;

  // Comparison matrix
  comparisonPoints: {
    category: string;
    attributes: {
      name: string;
      lenderAValue: string | number | boolean;
      lenderBValue: string | number | boolean;
      winner?: 'A' | 'B' | 'tie';
    }[];
  }[];

  // Summary
  summary: {
    bestFor: {
      lenderA: string[];
      lenderB: string[];
    };
    verdict: string;
  };
}

// Loan hub data
export interface LoanHubData {
  title: string;
  description: string;
  seo: SEOMetadata;
  featuredProducts: LoanType[];
  popularComparisons: string[]; // Array of comparison slugs
  topLenders: string[]; // Array of lender slugs
}
