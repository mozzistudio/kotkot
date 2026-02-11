import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/dashboard/:path*', '/conversations/:path*', '/quotes/:path*', '/clients/:path*', '/bot/:path*', '/apis/:path*', '/whatsapp/:path*', '/analytics/:path*', '/settings/:path*'],
};
