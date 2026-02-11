import { InsurerAdapter, QuoteRequest, QuoteResult } from './adapter';

export class ManualRatesAdapter implements InsurerAdapter {
  name: string;
  slug: string;

  constructor(name: string, slug: string) {
    this.name = name;
    this.slug = slug;
  }

  async testConnection(): Promise<boolean> {
    return true; // Manual rates are always "connected"
  }

  async getQuote(_credentials: Record<string, string>, request: QuoteRequest): Promise<QuoteResult> {
    // This would look up from the rate_tables in Supabase
    // For now, return a placeholder
    return {
      insurerName: this.name,
      insurerSlug: this.slug,
      price: 0,
      currency: 'USD',
      coverageDetails: { note: 'Rate table lookup required' },
      isRealtime: false,
    };
  }
}
