import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname.startsWith('/login');
  const isAuthCallback = pathname.startsWith('/auth');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isDeviceApi = pathname.startsWith('/api/devices');
  const isApiRoute = pathname.startsWith('/api');

  if (!user && !isLoginPage && !isAuthCallback && !isApiRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (isAdminRoute || isAdminApi) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      if (isAdminApi) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
      }
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (user && !isAdminRoute && !isAdminApi && !isAuthCallback && !isLoginPage && !isApiRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_active, subscription_status')
      .eq('id', user.id)
      .single();

    if (profile && !profile.is_active) {
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', 'account_disabled');
      return NextResponse.redirect(url);
    }

    if (profile && profile.subscription_status === 'inactive' && !pathname.startsWith('/payment')) {
      const url = request.nextUrl.clone();
      url.pathname = '/payment';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
