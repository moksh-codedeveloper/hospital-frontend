import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Tokens from cookies
  const adminToken = request.cookies.get('adminToken')?.value;
  const doctorToken = request.cookies.get('doctorToken')?.value;
  const userToken = request.cookies.get('token')?.value;

  const isLoggedIn = adminToken || doctorToken || userToken;

  const isAdminLoggedIn = !!adminToken;
  const isDoctorLoggedIn = !!doctorToken;
  const isUserLoggedIn = !!userToken;

  const isPublicPath =
    path === '/login' ||
    path === '/register' ||
    path === '/doctor/login' ||
    path === '/admin/login';

  // Block switching roles
  if (isDoctorLoggedIn && (path === '/admin/login' || path === '/login')) {
    return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
  }

  if (isAdminLoggedIn && (path === '/doctor/login' || path === '/login')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isUserLoggedIn && (path === '/doctor/login' || path === '/admin/login')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Prevent logged-in users from visiting login/register
  if (isPublicPath && isLoggedIn) {
    if (isAdminLoggedIn)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (isDoctorLoggedIn)
      return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
    if (isUserLoggedIn)
      return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Protected routes
  const isProtectedAdmin = path.startsWith('/admin');
  const isProtectedDoctor = path.startsWith('/doctor');
  const isProtectedUser = path.startsWith('/profile');

  if (isProtectedAdmin && !isAdminLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isProtectedDoctor && !isDoctorLoggedIn) {
    return NextResponse.redirect(new URL('/doctor/login', request.url));
  }

  if (isProtectedUser && !isUserLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/profile',
    '/admin/:path*',
    '/doctor/:path*',
  ],
};
