import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { QuoteRequest, InsurerAdapter } from '@/lib/insurers/adapter';
import { AssaAdapter } from '@/lib/insurers/assa';
import { ManualRatesAdapter } from '@/lib/insurers/manual-rates';

// ─── Adapter Registry ────────────────────────────────────────────────────────
const ADAPTER_REGISTRY: Record<string, () => InsurerAdapter> = {
  'assa-pa': () => new AssaAdapter(),
  'manual-rates': () => new ManualRatesAdapter('Manual', 'manual-rates'),
};

function getAdapter(adapterType: string, name: string, slug: string): InsurerAdapter {
  const factory = ADAPTER_REGISTRY[adapterType];
  if (factory) return factory();
  return new ManualRatesAdapter(name, slug);
}

/**
 * POST /api/insurers/quote
 *
 * Get a quote from a specific insurer using the broker's saved connection.
 * Unlike /api/quotes which fans out to all insurers, this targets a single one.
 *
 * Input:
 *   - insurerConnectionId: string (required) — the insurer_connections UUID
 *   - insuranceType: 'auto' | 'health' | 'home' | 'travel' | 'business'
 *   - data: Record<string, unknown> — the input data for the quote
 *   - coverageTier: 'basic' | 'intermediate' | 'comprehensive' (optional)
 *
 * Returns:
 *   - result: QuoteResult from the adapter
 *   - latencyMs: number — how long the quote took
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { insurerConnectionId, insuranceType, data, coverageTier } = body;

    if (!insurerConnectionId || !insuranceType || !data) {
      return NextResponse.json(
        { error: 'insurerConnectionId, insuranceType, and data are required' },
        { status: 400 }
      );
    }

    const validTypes = ['auto', 'health', 'home', 'travel', 'business'];
    if (!validTypes.includes(insuranceType)) {
      return NextResponse.json(
        { error: `insuranceType must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: broker } = await supabase
      .from('brokers')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!broker) {
      return NextResponse.json({ error: 'Broker not found' }, { status: 404 });
    }

    // Load the insurer connection (verify broker ownership)
    const { data: connection } = await supabase
      .from('insurer_connections')
      .select('*, insurers(*)')
      .eq('id', insurerConnectionId)
      .eq('broker_id', broker.id)
      .single();

    if (!connection) {
      return NextResponse.json(
        { error: 'Insurer connection not found or does not belong to you' },
        { status: 404 }
      );
    }

    if (!connection.is_active) {
      return NextResponse.json(
        { error: 'This insurer connection is inactive. Please reconnect.' },
        { status: 400 }
      );
    }

    const insurer = connection.insurers as {
      name: string;
      slug: string;
      api_adapter_type: string;
      supported_products: string[];
    };

    // Verify the insurer supports this product type
    if (!insurer.supported_products.includes(insuranceType)) {
      return NextResponse.json(
        { error: `${insurer.name} does not support ${insuranceType} insurance` },
        { status: 400 }
      );
    }

    // Build the quote request
    const quoteRequest: QuoteRequest = {
      insuranceType,
      data,
      coverageTier: coverageTier ?? 'basic',
    };

    const credentials = (connection.credentials as Record<string, string>) ?? {};
    const adapter = getAdapter(insurer.api_adapter_type, insurer.name, insurer.slug);

    // Execute the quote and measure latency
    const startTime = Date.now();

    try {
      const result = await adapter.getQuote(credentials, quoteRequest);
      const latencyMs = Date.now() - startTime;

      return NextResponse.json({
        result,
        latencyMs,
        insurerName: insurer.name,
        insurerSlug: insurer.slug,
      });
    } catch (quoteError) {
      const latencyMs = Date.now() - startTime;
      const errorMessage = quoteError instanceof Error ? quoteError.message : 'Unknown error';
      console.error(`[Insurer Quote] Error from ${insurer.slug}:`, quoteError);

      return NextResponse.json(
        {
          error: `Quote request failed: ${errorMessage}`,
          latencyMs,
          insurerName: insurer.name,
          insurerSlug: insurer.slug,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('[Insurer Quote] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
