import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/app/dashboard/:path*',
    '/app/conversations/:path*',
    '/app/quotes/:path*',
    '/app/ingresos/:path*',
    '/app/clients/:path*',
    '/app/bot/:path*',
    '/app/apis/:path*',
    '/app/whatsapp/:path*',
    '/app/analytics/:path*',
    '/app/settings/:path*',
  ],
};
