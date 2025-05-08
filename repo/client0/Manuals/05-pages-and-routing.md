# راهنمای صفحات و مسیریابی

## ساختار صفحات
صفحات پروژه با استفاده از App Router در Next.js 13 در پوشه `src/app` قرار دارند. برخی از صفحات اصلی پروژه:

- `src/app/page.tsx`: صفحه اصلی
- `src/app/auth/login/page.tsx`: صفحه ورود
- `src/app/auth/register/page.tsx`: صفحه ثبت‌نام
- `src/app/products/page.tsx`: صفحه محصولات
- `src/app/profile/page.tsx`: صفحه پروفایل کاربر
- `src/app/dashboard/page.tsx`: داشبورد مدیریت
- `src/app/cart/page.tsx`: سبد خرید
- `src/app/checkout/page.tsx`: صفحه تکمیل خرید

## لایوت‌ها
لایوت اصلی پروژه در `src/app/layout.tsx` قرار دارد که شامل:
- تنظیمات متادیتا
- Provider‌های اصلی
- هدر و فوتر سایت

## مسیریابی
در Next.js با App Router، مسیریابی به صورت فایل‌محور است. هر فولدر در مسیر `src/app` به یک مسیر در URL تبدیل می‌شود:

```
src/app/products/page.tsx -> /products
src/app/profile/orders/page.tsx -> /profile/orders
```

## محافظت از مسیرها
برای محافظت از مسیرهایی که نیاز به احراز هویت دارند، از میدل‌ویر Next.js استفاده شده است:

```ts
// src/middleware.ts
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // مسیرهایی که نیاز به احراز هویت دارند
  const isPrivatePath = path.startsWith('/profile') || 
                        path.startsWith('/dashboard') || 
                        path.startsWith('/checkout');
  
  const token = request.cookies.get('auth_token')?.value || '';
  
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // اگر کاربر لاگین کرده و به صفحه لاگین می‌رود، به صفحه اصلی ریدایرکت شود
  if (path.startsWith('/auth/login') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
```

## صفحه 404 (Not Found)
برای مدیریت مسیرهای نامعتبر، از صفحه 404 استفاده شده است:

```tsx
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">صفحه مورد نظر یافت نشد</p>
      <Link href="/" className="btn-primary">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
```

## مدیریت پارامترها در URL
برای مدیریت پارامترها در URL، از فولدرهای داینامیک در App Router استفاده می‌شود:

```
src/app/products/[slug]/page.tsx -> /products/:slug
```

و در کامپوننت، پارامترها به صورت زیر دریافت می‌شوند:

```tsx
// src/app/products/[slug]/page.tsx
export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  return (
    <div>
      <h1>صفحه محصول: {slug}</h1>
      {/* محتوای صفحه */}
    </div>
  );
}
```

## نکات مهم در مسیریابی
1. برای لینک‌ها از کامپوننت `Link` از `next/link` استفاده کنید
2. برای ریدایرکت برنامه‌ای از `useRouter` از `next/navigation` استفاده کنید
3. برای دسترسی به پارامترهای کوئری از `useSearchParams` از `next/navigation` استفاده کنید
4. برای تغییر عنوان صفحات از `metadata` استفاده کنید