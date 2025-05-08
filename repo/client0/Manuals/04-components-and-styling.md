# راهنمای کامپوننت‌ها و استایل‌دهی

## ساختار کامپوننت‌ها
کامپوننت‌های پروژه در پوشه `src/components` قرار دارند و به صورت زیر سازماندهی شده‌اند:

- `Account`: کامپوننت‌های مربوط به ورود، ثبت‌نام و بازیابی رمز عبور
- `Category`: کامپوننت‌های مربوط به دسته‌بندی‌ها
- `FlashDeals`: کامپوننت‌های مربوط به پیشنهادات ویژه
- `home`: کامپوننت‌های مورد استفاده در صفحه اصلی
- `layout`: کامپوننت‌های مربوط به لایوت سایت (هدر، فوتر و...)
- `products`: کامپوننت‌های مربوط به نمایش محصولات
- `profile`: کامپوننت‌های مربوط به پروفایل کاربری
- `providers`: کامپوننت‌های Provider برای مدیریت حالت و کانتکست
- `ui`: کامپوننت‌های پایه‌ای UI

## سیستم استایل‌دهی
برای استایل‌دهی در این پروژه از TailwindCSS همراه با کامپوننت‌های Shadcn UI استفاده شده است. فایل‌های مرتبط با تنظیمات استایل:

- `tailwind.config.ts`: تنظیمات TailwindCSS
- `src/index.css`: استایل‌های سراسری و تنظیمات CSS
- `components.json`: تنظیمات کامپوننت‌های Shadcn UI

## تنظیمات فونت
برای نمایش متون فارسی از فونت ویژیر (Vazirmatn) استفاده شده است:

```tsx
// src/lib/fonts.ts
import { Vazirmatn } from 'next/font/google';

export const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
});
```

## فانکشن‌های کمکی استایل‌دهی
فانکشن `cn` برای ترکیب کلاس‌های TailwindCSS:

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## نمونه استفاده از کامپوننت‌های Shadcn UI
نمونه استفاده از دکمه:

```tsx
import { Button } from "@/components/ui/button";

function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      ثبت سفارش
    </Button>
  );
}
```

نمونه استفاده از فرم:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ورود به حساب کاربری</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="phone">شماره موبایل</Label>
          <Input id="phone" placeholder="09123456789" />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">رمز عبور</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">ورود</Button>
      </CardContent>
    </Card>
  );
}
```

## استفاده از آیکون‌ها
برای آیکون‌های UI از `lucide-react` و برای لوگوها از `react-icons/si` استفاده می‌شود:

```tsx
import { ShoppingCart, User } from "lucide-react";
import { SiGoogle } from "react-icons/si";

function IconsExample() {
  return (
    <div>
      <ShoppingCart className="w-5 h-5" />
      <User className="w-5 h-5" />
      <SiGoogle className="w-5 h-5" />
    </div>
  );
}
```

## نکات مهم در استایل‌دهی
1. دایرکشن پیش‌فرض صفحات RTL است
2. از CSS Grid و Flexbox برای لایوت‌ها استفاده کنید
3. برای پاسخگویی از کلاس‌های responsive تیلویند استفاده کنید (sm:, md:, lg:)
4. در نوشتن کلاس‌های TailwindCSS از ترتیب منطقی استفاده کنید (لایوت، اندازه، رنگ، حالت‌ها)