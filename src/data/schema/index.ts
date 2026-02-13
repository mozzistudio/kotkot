/**
 * Central Schema Export
 * Export all type definitions from a single location
 */

// Insurance types
export type {
  InsuranceType,
  InsuranceProduct,
  InsuranceCompany,
  CrossPageData,
  Coverage,
  ComparisonPoint,
  SEOMetadata,
  CompanyRatings,
  ContactInfo,
  CompanyComparison,
  InsuranceHubData,
} from './insurance.types';

// Loan types
export type {
  LoanType,
  LoanProduct,
  Lender,
  LoanCrossPageData,
  LenderRatings,
  LenderComparison,
  LoanHubData,
} from './loan.types';

// Institution types
export type {
  BaseInstitution,
  DigitalCapabilities,
  GenericRatings,
} from './institution.types';

// Country types
export type {
  CountryData,
} from './country.types';
