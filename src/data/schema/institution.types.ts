/**
 * Institution and Organization Type Definitions
 * Shared types for companies, lenders, and other organizations
 */

// Base institution type
export interface BaseInstitution {
  slug: string;
  name: string;
  legalName?: string;
  logo?: string;
  country: string;
  description: string;
  foundedYear?: number;
  headquarters?: string;
}

// Contact information (re-export for convenience)
export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website: string;
  officeLocations?: {
    city: string;
    address: string;
    phone?: string;
  }[];
}

// Digital capabilities (common across institutions)
export interface DigitalCapabilities {
  onlineServices: boolean;
  mobileApp: boolean;
  chatSupport: boolean;
  whatsappSupport: boolean;
  emailSupport: boolean;
}

// Ratings structure (generic)
export interface GenericRatings {
  overall: number; // 0-5
  reviewCount?: number;
  lastUpdated?: string;
}
