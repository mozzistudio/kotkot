import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function DELETE(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    // Get user from cookies
    const cookieStore = await cookies();
    const supabaseAccessToken = cookieStore.get('sb-access-token')?.value;

    if (!supabaseAccessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client with service key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get user from access token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(supabaseAccessToken);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update account status to disconnected
    const { error: updateError } = await supabase
      .from('whatsapp_accounts')
      .update({
        status: 'disconnected',
        access_token: '', // Clear the token
      })
      .eq('id', accountId)
      .eq('broker_id', user.id); // Ensure user owns this account

    if (updateError) {
      console.error('Disconnect error:', updateError);
      return NextResponse.json(
        { error: 'Failed to disconnect account' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account disconnected successfully',
    });
  } catch (error) {
    console.error('Disconnect error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
