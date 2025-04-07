import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from './utils/getToken'; // adjust path if needed

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register';
  const token = getToken(request);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
export const config = {
    matcher: [
      '/',
      '/profile',
      '/login',
      '/register',
    ]
  }