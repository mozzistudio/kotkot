import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { InsurerAdapter } from '@/lib/insurers/adapter';
import { AssaAdapter } from '@/lib/insurers/assa';
import { ManualRatesAdapter } from '@/lib/insurers/manual-rates';

// ─── Adapter Registry ────────────────────────────────────────────────────────
const ADAPTER_REGISTRY: Record<string, () => InsurerAdapter> = {
  'assa-pa': () => new AssaAdapter(),
  'manual-rates': () => new ManualRatesAdapter('Manual', 'manual-rates'),
};

/**
 * POST /api/insurers/test
 *
 * Test an insurer API connection without saving credentials.
 * Used for the "Test Connection" button in the dashboard before committing.
 *
 * Input:
 *   - insurerId: string (required) — the insurer UUID
 *   - credentials: Record<string, string> (required) — the credentials to test
 *
 * Returns:
 *   - success: boolean
 *   - message: string — human-readable result
 *   - latencyMs: number — how long the test took
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { insurerId, credentials } = body;

    if (!insurerId || !credentials || typeof credentials !== 'object') {
      return NextResponse.json(
        { error: 'insurerId and credentials object are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Look up the insurer to get its adapter type
    const { data: insurer } = await supabase
      .from('insurers')
      .select('id, name, slug, api_adapter_type')
      .eq('id', insurerId)
      .single();

    if (!insurer) {
      return NextResponse.json({ error: 'Insurer not found' }, { status: 404 });
    }

    // Get the appropriate adapter
    const adapterFactory = ADAPTER_REGISTRY[insurer.api_adapter_type];

    if (!adapterFactory) {
      // Manual rates or unknown — always succeeds
      return NextResponse.json({
        success: true,
        message: `${insurer.name} uses manual rate tables. No API connection needed.`,
        latencyMs: 0,
      });
    }

    // Test the connection and measure latency
    const adapter = adapterFactory();
    const startTime = Date.now();

    try {
      const isConnected = await adapter.testConnection(credentials);
      const latencyMs = Date.now() - startTime;

      if (isConnected) {
        return NextResponse.json({
          success: true,
          message: `Successfully connected to ${insurer.name} API`,
          latencyMs,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: `Connection to ${insurer.name} API failed. Please check your credentials.`,
          latencyMs,
        });
      }
    } catch (testError) {
      const latencyMs = Date.now() - startTime;
      const errorMessage = testError instanceof Error ? testError.message : 'Unknown error';
      console.error(`[Insurer Test] Error testing ${insurer.slug}:`, testError);

      return NextResponse.json({
        success: false,
        message: `Connection test error: ${errorMessage}`,
        latencyMs,
      });
    }
  } catch (error) {
    console.error('[Insurer Test] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
