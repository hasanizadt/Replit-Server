# راهنمای دیباگ و رفع مشکلات

## ابزارهای دیباگ
برای دیباگ این پروژه می‌توانید از ابزارهای زیر استفاده کنید:

1. **کنسول مرورگر**: برای بررسی خطاهای جاوااسکریپت و لاگ‌ها
2. **React Developer Tools**: برای بررسی کامپوننت‌ها و props ها
3. **Network Tab**: برای بررسی درخواست‌های HTTP و GraphQL
4. **GraphQL Playground**: برای تست مستقیم کوئری‌های GraphQL

## خطاهای رایج و راه‌حل آن‌ها

### 1. خطای NetworkError در urql
این خطا معمولاً به دلیل عدم دسترسی به سرور GraphQL یا مشکلات CORS رخ می‌دهد:

```
CombinedError: "NetworkError: [object Object]"
```

راه‌حل‌ها:
- بررسی دسترسی به آدرس سرور GraphQL با ابزارهایی مانند cURL یا Postman
- اضافه کردن هدرهای CORS مناسب به کلاینت urql:
```ts
const client = new Client({
  url: GRAPHQL_URL,
  fetchOptions: {
    credentials: "include",
    mode: "cors",
  },
});
```
- استفاده از fetch عادی به جای urql برای تست ارتباط با سرور

### 2. خطای عدم دسترسی به داده‌ها
اگر مشکل دسترسی به داده‌های GraphQL دارید، موارد زیر را بررسی کنید:

- ساختار کوئری GraphQL را با اسکیمای سرور مطابقت دهید
- نام‌های فیلدها را بررسی کنید (مثلاً username در فرانت‌اند، phone در بک‌اند)
- خطاهای validation را در پاسخ GraphQL بررسی کنید

### 3. خطاهای احراز هویت
در صورت بروز مشکل در سیستم احراز هویت:

- توکن JWT را در localStorage و cookies بررسی کنید
- قالب توکن ارسالی در هدر Authorization را بررسی کنید
- از صحت اطلاعات ارسالی در درخواست‌های login/signup اطمینان حاصل کنید

### 4. خطاهای لایوت و استایل
برای رفع مشکلات مربوط به لایوت و استایل:

- از DevTools مرورگر برای بررسی استایل‌های اعمال شده استفاده کنید
- کلاس‌های TailwindCSS را بررسی کنید
- دایرکشن RTL را در المان‌های مورد نظر بررسی کنید

## نحوه دیباگ GraphQL

### استفاده از Postman برای تست GraphQL
1. یک درخواست POST به آدرس سرور GraphQL ایجاد کنید
2. هدر `Content-Type: application/json` را اضافه کنید
3. در بدنه درخواست، کوئری GraphQL را به صورت زیر وارد کنید:
```json
{
  "query": "query { __typename }"
}
```
4. برای تست احراز هویت، هدر `Authorization: Bearer <token>` را اضافه کنید

### لاگ کردن خطاهای GraphQL
برای لاگ کردن خطاهای GraphQL در کلاینت urql:

```ts
errorExchange({
  onError: (error) => {
    console.error("GraphQL Error:", error);
    console.error("Network Error:", error.networkError);
    console.error("GraphQL Errors:", error.graphQLErrors);
  }
})
```

### استفاده از fetchGraphQL به جای urql
برای دیباگ بهتر می‌توانید از تابع `fetchGraphQL` استفاده کنید:

```ts
async function fetchGraphQL(query, variables) {
  try {
    console.log('GraphQL Request:', { query, variables });
    
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    
    const result = await response.json();
    console.log('GraphQL Response:', result);
    
    return result;
  } catch (error) {
    console.error('GraphQL Error:', error);
    return { errors: [{ message: error.message }] };
  }
}
```

## بررسی مسیریابی و میدل‌ویر
برای دیباگ مشکلات مربوط به مسیریابی و میدل‌ویر، موارد زیر را بررسی کنید:

1. توکن JWT را در cookies بررسی کنید
2. لاگ‌های سرور Next.js را برای بررسی عملکرد میدل‌ویر چک کنید
3. از `console.log` در میدل‌ویر برای بررسی مقادیر استفاده کنید
4. برای تست ریدایرکت، از مرورگر Incognito استفاده کنید