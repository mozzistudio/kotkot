export interface QuoteRequest {
  insuranceType: 'auto' | 'health' | 'home' | 'travel' | 'business';
  data: Record<string, unknown>;
  coverageTier?: 'basic' | 'intermediate' | 'comprehensive';
}

export interface QuoteResult {
  insurerName: string;
  insurerSlug: string;
  price: number;
  currency: string;
  coverageDetails: Record<string, unknown>;
  deductible?: number;
  isRealtime: boolean;
}

export interface InsurerAdapter {
  name: string;
  slug: string;
  testConnection(credentials: Record<string, string>): Promise<boolean>;
  getQuote(credentials: Record<string, string>, request: QuoteRequest): Promise<QuoteResult>;
}
