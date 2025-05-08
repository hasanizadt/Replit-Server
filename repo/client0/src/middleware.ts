import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// محافظت از مسیرهایی که نیاز به احراز هویت دارند
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // مسیرهایی که نیاز به احراز هویت دارند
  if (pathname.startsWith('/profile')) {
    // بررسی وجود کاربر در cookie ها
    const userCookie = request.cookies.get('user');
    
    console.log(`[Middleware] Checking auth for path: ${pathname}`);
    console.log(`[Middleware] User cookie exists: ${!!userCookie}`);

    // اگر کاربر لاگین نکرده باشد، به صفحه لاگین هدایت می‌شود
    if (!userCookie) {
      console.log(`[Middleware] Redirecting to login page`);
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('returnUrl', encodeURIComponent(pathname));
      return NextResponse.redirect(url);
    }

    // در غیر این صورت اجازه دسترسی به مسیر را می‌دهد
    console.log(`[Middleware] Access granted to protected route`);
  }

  return NextResponse.next();
}

export const config = {
  // تعیین مسیرهایی که middleware روی آنها اعمال می‌شود
  matcher: ['/profile/:path*', '/dashboard/:path*', '/dashboard']
};