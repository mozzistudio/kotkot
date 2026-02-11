import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { QuoteRequest, InsurerAdapter } from '@/lib/insurers/adapter';
import { AssaAdapter } from '@/lib/insurers/assa';
import { ManualRatesAdapter } from '@/lib/insurers/manual-rates';

// ─── Adapter Registry ────────────────────────────────────────────────────────
// Maps adapter_type slugs to their implementations
const ADAPTER_REGISTRY: Record<string, () => InsurerAdapter> = {
  'assa-pa': () => new AssaAdapter(),
  'manual-rates': () => new ManualRatesAdapter('Manual', 'manual-rates'),
};

function getAdapter(adapterType: string, name: string, slug: string): InsurerAdapter {
  const factory = ADAPTER_REGISTRY[adapterType];
  if (factory) return factory();
  // Fallback to manual rates for unknown adapter types
  return new ManualRatesAdapter(name, slug);
}

// ─── GET: List Quotes ────────────────────────────────────────────────────────
/**
 * GET /api/quotes
 *
 * List quotes for the authenticated broker with optional filters.
 *
 * Query parameters:
 *   - status: 'pending' | 'completed' | 'expired' (optional)
 *   - insuranceType: 'auto' | 'health' | 'home' | 'travel' | 'business' (optional)
 *   - conversationId: string (optional) — filter by conversation
 *   - limit: number (optional, default 50)
 *   - offset: number (optional, default 0)
 */
export async function GET(request: NextRequest) {
  try {
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

    // Parse query params
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const insuranceType = searchParams.get('insuranceType');
    const conversationId = searchParams.get('conversationId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);

    // Build query
    let query = supabase
      .from('quotes')
      .select('*, quote_results(*)', { count: 'exact' })
      .eq('broker_id', broker.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }
    if (insuranceType) {
      query = query.eq('insurance_type', insuranceType);
    }
    if (conversationId) {
      query = query.eq('conversation_id', conversationId);
    }

    const { data: quotes, count, error } = await query;

    if (error) {
      console.error('[Quotes GET] Query error:', error);
      return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
    }

    return NextResponse.json({
      quotes: quotes ?? [],
      total: count ?? 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('[Quotes GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── POST: Create New Quote ──────────────────────────────────────────────────
/**
 * POST /api/quotes
 *
 * Create a new quote by fanning out to all connected insurers.
 *
 * Input:
 *   - insuranceType: 'auto' | 'health' | 'home' | 'travel' | 'business'
 *   - data: Record<string, unknown> — the input data for the quote
 *   - coverageTier: 'basic' | 'intermediate' | 'comprehensive' (optional)
 *   - conversationId: string (optional) — link to a conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { insuranceType, data, coverageTier, conversationId } = body;

    if (!insuranceType || !data) {
      return NextResponse.json(
        { error: 'insuranceType and data are required' },
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
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (!broker) {
      return NextResponse.json({ error: 'Broker not found' }, { status: 404 });
    }

    // 1. Create the quote record
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        broker_id: broker.id,
        conversation_id: conversationId ?? null,
        insurance_type: insuranceType,
        input_data: data,
        coverage_tier: coverageTier ?? 'basic',
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (quoteError || !quote) {
      console.error('[Quotes POST] Failed to create quote:', quoteError);
      return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
    }

    // 2. Load all active insurer connections for this broker that support this product
    const { data: connections } = await supabase
      .from('insurer_connections')
      .select('*, insurers(*)')
      .eq('broker_id', broker.id)
      .eq('is_active', true);

    // Filter to insurers that support this insurance type
    const relevantConnections = (connections ?? []).filter((conn: Record<string, unknown>) => {
      const insurer = conn.insurers as { supported_products: string[] } | null;
      return insurer?.supported_products?.includes(insuranceType);
    });

    if (relevantConnections.length === 0) {
      // Update quote status — no insurers available
      await supabase
        .from('quotes')
        .update({ status: 'no_insurers' })
        .eq('id', quote.id);

      return NextResponse.json({
        quoteId: quote.id,
        results: [],
        message: 'No insurers connected for this insurance type',
      });
    }

    // 3. Fan out to all connected insurers in parallel
    const quoteRequest: QuoteRequest = {
      insuranceType,
      data,
      coverageTier: coverageTier ?? 'basic',
    };

    const quotePromises = relevantConnections.map(async (conn: Record<string, unknown>) => {
      const insurer = conn.insurers as {
        name: string;
        slug: string;
        api_adapter_type: string;
      };
      const credentials = (conn.credentials as Record<string, string>) ?? {};

      try {
        const adapter = getAdapter(insurer.api_adapter_type, insurer.name, insurer.slug);
        const result = await adapter.getQuote(credentials, quoteRequest);

        // Save successful result
        const { data: savedResult } = await supabase
          .from('quote_results')
          .insert({
            quote_id: quote.id,
            insurer_connection_id: conn.id as string,
            insurer_name: result.insurerName,
            insurer_slug: result.insurerSlug,
            price: result.price,
            currency: result.currency,
            coverage_details: result.coverageDetails,
            deductible: result.deductible ?? null,
            is_realtime: result.isRealtime,
            status: 'available',
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        return { success: true, result: savedResult };
      } catch (adapterError) {
        console.error(`[Quotes POST] Adapter error for ${insurer.slug}:`, adapterError);

        // Save failed result
        await supabase
          .from('quote_results')
          .insert({
            quote_id: quote.id,
            insurer_connection_id: conn.id as string,
            insurer_name: insurer.name,
            insurer_slug: insurer.slug,
            price: 0,
            currency: 'USD',
            coverage_details: {},
            is_realtime: false,
            status: 'error',
            error_message: adapterError instanceof Error ? adapterError.message : 'Unknown error',
            created_at: new Date().toISOString(),
          });

        return { success: false, insurerSlug: insurer.slug, error: 'Quote request failed' };
      }
    });

    const results = await Promise.allSettled(quotePromises);

    // 4. Collect successful results
    const successfulResults = results
      .filter(r => r.status === 'fulfilled' && r.value.success)
      .map(r => (r as PromiseFulfilledResult<{ success: boolean; result?: Record<string, unknown> }>).value.result);

    // 5. Update quote status
    const finalStatus = successfulResults.length > 0 ? 'completed' : 'error';
    await supabase
      .from('quotes')
      .update({ status: finalStatus, updated_at: new Date().toISOString() })
      .eq('id', quote.id);

    // 6. Return comparison
    return NextResponse.json({
      quoteId: quote.id,
      status: finalStatus,
      results: successfulResults,
      totalInsurersQueried: relevantConnections.length,
      successfulQuotes: successfulResults.length,
    });
  } catch (error) {
    console.error('[Quotes POST] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
