import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET!;

function parseSignedRequest(signedRequest: string): { user_id: string } | null {
  try {
    const [encodedSig, payload] = signedRequest.split('.');

    const sig = Buffer.from(encodedSig.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    const data = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');

    const expectedSig = crypto
      .createHmac('sha256', facebookAppSecret)
      .update(payload)
      .digest();

    if (!crypto.timingSafeEqual(sig, expectedSig)) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const signedRequest = body.get('signed_request') as string;

    if (!signedRequest) {
      return NextResponse.json({ error: 'Missing signed_request' }, { status: 400 });
    }

    const payload = parseSignedRequest(signedRequest);

    if (!payload || !payload.user_id) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { data: identities, error: identitiesError } = await supabase
      .from('identities')
      .select('user_id')
      .eq('provider', 'facebook')
      .eq('provider_id', payload.user_id)
      .limit(1);

    if (identitiesError) {
      console.error('Error querying identities:', identitiesError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (identities && identities.length > 0) {
      const userId = identities[0].user_id;

      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

      if (deleteError) {
        console.error('Error deleting user:', deleteError);
      }
    }

    const confirmationCode = crypto.randomUUID();

    return NextResponse.json({
      url: 'https://kotkot.studio/data-deletion-confirmed',
      confirmation_code: confirmationCode
    }, { status: 200 });
  } catch (error) {
    console.error('Delete data error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
