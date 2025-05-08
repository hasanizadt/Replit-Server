# راهنمای سیستم احراز هویت

## معماری احراز هویت
سیستم احراز هویت پروژه بر اساس JWT و ذخیره‌سازی اطلاعات کاربر در localStorage و cookies است. این سیستم از طریق GraphQL API با بک‌اند ارتباط برقرار می‌کند.

## ساختار فایل‌های مرتبط با احراز هویت
- `src/contexts/AuthContext.tsx`: کانتکست مدیریت احراز هویت
- `src/components/auth/ProtectedRoute.tsx`: کامپوننت محافظت از مسیرهای خصوصی
- `src/middleware.ts`: میدل‌ویر Next.js برای بررسی احراز هویت در سمت سرور
- `src/lib/urql/Query/Account/auth.query.ts`: کوئری‌های GraphQL مربوط به احراز هویت

## گردش کار احراز هویت
1. کاربر از طریق فرم ورود، اطلاعات (phone و password) را وارد می‌کند
2. درخواست به API بک‌اند ارسال می‌شود
3. در صورت صحت اطلاعات، توکن JWT و اطلاعات کاربر دریافت می‌شود
4. توکن در localStorage ذخیره می‌شود
5. اطلاعات کاربر در state مدیریت شده توسط AuthContext ذخیره می‌شود
6. کاربر به صفحه اصلی یا صفحه مورد نظر هدایت می‌شود

## نحوه استفاده از سیستم احراز هویت
برای استفاده از سیستم احراز هویت در کامپوننت‌ها می‌توانید از هوک `useAuth` استفاده کنید:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // استفاده از اطلاعات کاربر
  if (isAuthenticated) {
    return <div>سلام {user.name}</div>;
  }
  
  return <div>لطفا وارد شوید</div>;
}
```

## محافظت از مسیرها
برای محافظت از مسیرهایی که نیاز به احراز هویت دارند، می‌توانید از کامپوننت `ProtectedRoute` استفاده کنید:

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

<Route path="/profile">
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
</Route>
```

## نکات مهم در استفاده از سیستم احراز هویت
1. فیلد نام کاربری در بک‌اند به صورت `phone` است (نه username)
2. توکن در localStorage با کلید `auth_token` ذخیره می‌شود
3. اطلاعات کاربر در localStorage با کلید `user_info` ذخیره می‌شود
4. در هنگام ارسال درخواست‌های GraphQL، توکن در هدر Authorization اضافه می‌شود