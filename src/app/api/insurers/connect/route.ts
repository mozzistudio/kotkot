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
 * POST /api/insurers/connect
 *
 * Save insurer API credentials for a broker. Before saving, the endpoint
 * tests the connection to verify the credentials are valid.
 *
 * Input:
 *   - insurerId: string (required) — the insurer UUID from the insurers table
 *   - credentials: Record<string, string> (required) — API keys, tokens, etc.
 *
 * Flow:
 * 1. Verify authenticated broker
 * 2. Look up the insurer and its adapter type
 * 3. Test the connection with the provided credentials
 * 4. If successful, save (or update) the insurer_connections record
 * 5. Return the connection record
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

    // 1. Verify authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: broker } = await supabase
      .from('brokers')
      .select('id, country_code')
      .eq('auth_user_id', user.id)
      .single();

    if (!broker) {
      return NextResponse.json({ error: 'Broker not found' }, { status: 404 });
    }

    // 2. Look up the insurer
    const { data: insurer } = await supabase
      .from('insurers')
      .select('*')
      .eq('id', insurerId)
      .single();

    if (!insurer) {
      return NextResponse.json({ error: 'Insurer not found' }, { status: 404 });
    }

    // Verify insurer is available in broker's country
    if (insurer.country_code !== broker.country_code) {
      return NextResponse.json(
        { error: 'This insurer is not available in your country' },
        { status: 400 }
      );
    }

    // 3. Test the connection before saving
    const adapterFactory = ADAPTER_REGISTRY[insurer.api_adapter_type];
    let connectionValid = false;

    if (adapterFactory) {
      const adapter = adapterFactory();
      try {
        connectionValid = await adapter.testConnection(credentials);
      } catch (testError) {
        console.error(`[Insurer Connect] Test failed for ${insurer.slug}:`, testError);
        connectionValid = false;
      }
    } else {
      // For manual-rates type or unknown adapters, connection is always valid
      connectionValid = true;
    }

    if (!connectionValid) {
      return NextResponse.json(
        {
          error: 'Connection test failed. Please verify your credentials.',
          testResult: false,
        },
        { status: 400 }
      );
    }

    // 4. Upsert the insurer connection
    // Check if a connection already exists for this broker + insurer
    const { data: existing } = await supabase
      .from('insurer_connections')
      .select('id')
      .eq('broker_id', broker.id)
      .eq('insurer_id', insurerId)
      .single();

    let connection;
    if (existing) {
      // Update existing connection
      const { data: updated, error } = await supabase
        .from('insurer_connections')
        .update({
          credentials,
          is_active: true,
          last_tested_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('[Insurer Connect] Update error:', error);
        return NextResponse.json({ error: 'Failed to update connection' }, { status: 500 });
      }
      connection = updated;
    } else {
      // Create new connection
      const { data: created, error } = await supabase
        .from('insurer_connections')
        .insert({
          broker_id: broker.id,
          insurer_id: insurerId,
          credentials,
          is_active: true,
          last_tested_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('[Insurer Connect] Insert error:', error);
        return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
      }
      connection = created;
    }

    return NextResponse.json({
      connection,
      testResult: true,
      message: `Successfully connected to ${insurer.name}`,
    });
  } catch (error) {
    console.error('[Insurer Connect] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
