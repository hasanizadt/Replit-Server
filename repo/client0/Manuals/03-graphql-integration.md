# راهنمای ارتباط با GraphQL

## تنظیمات اتصال به سرور GraphQL
در این پروژه، برای ارتباط با سرور GraphQL از کتابخانه urql استفاده شده است. تنظیمات اصلی در فایل‌های زیر قرار دارد:

- `src/lib/urql/client.ts`: پیکربندی اصلی کلاینت urql
- `src/components/providers/UrqlProvider.tsx`: کامپوننت Provider برای دسترسی به کلاینت در سراسر برنامه
- `src/lib/graphql-fetch.ts`: کلاینت جایگزین برای ارسال درخواست‌های GraphQL با استفاده از fetch

## آدرس سرور GraphQL
```
https://37a855e9-cbad-47b1-aaee-e725b592ee4b-00-25qsdfa2j9uuc.spock.replit.dev/graphql
```

## ساختار کوئری‌ها و میوتیشن‌ها
کوئری‌ها و میوتیشن‌های GraphQL در پوشه `src/lib/urql/Query` به صورت زیر سازماندهی شده‌اند:

- `Account`: کوئری‌های مربوط به حساب کاربری و احراز هویت
- `Products`: کوئری‌های مربوط به محصولات
- `Cart`: کوئری‌های مربوط به سبد خرید

## نمونه کوئری‌های GraphQL

### 1. کوئری محصولات ویژه
```graphql
query {
  featuredProducts {
    id
    name
    slug
    price
    discount
    discountUnit
    quantity
    images {
      url
      id
    }
  }
}
```

### 2. میوتیشن لاگین
```graphql
mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
    user {
      id
      name
      email
      phone
      role
      avatarUrl
    }
  }
}
```

### 3. میوتیشن ثبت‌نام
```graphql
mutation signup($signupInput: SignupInput!) {
  signup(signupInput: $signupInput) {
    token
    user {
      id
      name
      email
      phone
      role
      avatarUrl
    }
  }
}
```

### 4. کوئری سبد خرید
```graphql
query {
  getCartSummary {
    totalItems
    subtotal
    discount
    tax
    shipping
    total
  }
}
```

## نحوه استفاده از urql در کامپوننت‌ها

### استفاده از هوک useQuery
```tsx
import { useQuery } from 'urql';
import { FEATURED_PRODUCTS_QUERY } from '@/lib/urql/Query/Products/product.query';

function ProductsComponent() {
  const [result] = useQuery({
    query: FEATURED_PRODUCTS_QUERY
  });

  const { data, fetching, error } = result;

  if (fetching) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error.message}</div>;
  
  return (
    <div>
      {data.featuredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### استفاده از هوک useMutation
```tsx
import { useMutation } from 'urql';
import { LOGIN_MUTATION } from '@/lib/urql/Query/Account/auth.query';

function LoginComponent() {
  const [loginResult, login] = useMutation(LOGIN_MUTATION);

  const handleLogin = () => {
    login({
      loginInput: {
        phone: '09123456789',
        password: 'password123'
      }
    });
  };
  
  return (
    <button onClick={handleLogin}>
      ورود
    </button>
  );
}
```

## نکات مهم در ارتباط با GraphQL
1. نام‌های فیلدها باید دقیقاً با اسکیما‌ی بک‌اند مطابقت داشته باشد (مثلاً استفاده از phone به جای username)
2. برای افزودن هدر Authorization به درخواست‌ها، از رویکرد زیر استفاده کنید:
```ts
const client = new Client({
  url: GRAPHQL_URL,
  fetchOptions: () => {
    const token = localStorage.getItem('auth_token');
    return {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
```
3. برای دیباگ مشکلات GraphQL، از console.log در errorExchange استفاده کنید