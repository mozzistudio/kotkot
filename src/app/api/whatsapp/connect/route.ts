import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { accessToken: providedAccessToken, code } = await request.json();

    if (!providedAccessToken && !code) {
      return NextResponse.json(
        { error: 'Access token or authorization code is required' },
        { status: 400 }
      );
    }

    let accessToken = providedAccessToken;

    // If code is provided, exchange it for an access token
    if (code && !accessToken) {
      const tokenResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}` +
        `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
        `&code=${code}`
      );

      if (!tokenResponse.ok) {
        const error = await tokenResponse.json();
        console.error('Token exchange error:', error);
        return NextResponse.json(
          { error: 'Failed to exchange code for access token' },
          { status: 400 }
        );
      }

      const tokenData = await tokenResponse.json();
      accessToken = tokenData.access_token;

      if (!accessToken) {
        return NextResponse.json(
          { error: 'No access token received from Meta' },
          { status: 400 }
        );
      }
    }

    // Get user from cookies
    const cookieStore = await cookies();
    const supabaseAccessToken = cookieStore.get('sb-access-token')?.value;
    const supabaseRefreshToken = cookieStore.get('sb-refresh-token')?.value;

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

    // Step 1: Get WhatsApp Business Accounts from Meta Graph API
    const wabaResponse = await fetch(
      `https://graph.facebook.com/v21.0/me/businesses?fields=whatsapp_business_accounts{id,name,phone_numbers}&access_token=${accessToken}`
    );

    if (!wabaResponse.ok) {
      const error = await wabaResponse.json();
      console.error('Meta API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch WhatsApp accounts from Meta' },
        { status: 400 }
      );
    }

    const wabaData = await wabaResponse.json();

    // Extract the first WABA and phone number
    const businesses = wabaData.data || [];
    let waba = null;
    let phoneNumber = null;

    for (const business of businesses) {
      const wabas = business.whatsapp_business_accounts?.data || [];
      if (wabas.length > 0) {
        waba = wabas[0];
        const phoneNumbers = waba.phone_numbers?.data || [];
        if (phoneNumbers.length > 0) {
          phoneNumber = phoneNumbers[0];
          break;
        }
      }
    }

    if (!waba || !phoneNumber) {
      return NextResponse.json(
        { error: 'No WhatsApp Business Account or phone number found' },
        { status: 404 }
      );
    }

    // Step 2: Store in database
    const { data: existingAccount } = await supabase
      .from('whatsapp_accounts')
      .select('id')
      .eq('phone_number_id', phoneNumber.id)
      .single();

    if (existingAccount) {
      // Update existing account
      const { error: updateError } = await supabase
        .from('whatsapp_accounts')
        .update({
          access_token: accessToken,
          status: 'active',
          connected_at: new Date().toISOString(),
        })
        .eq('id', existingAccount.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update account' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        account: existingAccount,
      });
    } else {
      // Create new account
      const { data: newAccount, error: insertError } = await supabase
        .from('whatsapp_accounts')
        .insert({
          broker_id: user.id,
          waba_id: waba.id,
          phone_number_id: phoneNumber.id,
          phone_number: phoneNumber.display_phone_number || phoneNumber.verified_name,
          access_token: accessToken,
          status: 'active',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to save account' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        account: newAccount,
      });
    }
  } catch (error) {
    console.error('Connect error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
