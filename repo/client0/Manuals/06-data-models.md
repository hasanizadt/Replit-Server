# راهنمای مدل‌های داده

## مدل‌های اصلی داده
در این پروژه، مدل‌های داده اصلی به شرح زیر است:

### کاربر (User)
```typescript
export interface User {
  id: string;
  username: string; // در بک‌اند به عنوان phone استفاده می‌شود
  fullName: string; // در بک‌اند به عنوان name استفاده می‌شود
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string; // در بک‌اند به عنوان avatarUrl استفاده می‌شود
}
```

### محصول (Product)
```typescript
export interface Product {
  id: number | string;
  title: string; // در بک‌اند به عنوان name استفاده می‌شود
  price: number;
  discountedPrice?: number; // محاسبه شده از price و discount
  image: string; // اولین تصویر از آرایه images.url
  slug: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  inStock?: boolean; // بر اساس quantity > 0
  attributes?: { name: string; value: string }[];
  images: { url: string; id: string; alt?: string }[];
  discount?: number;
  discountUnit?: string;
  quantity: number;
}
```

### دسته‌بندی (Category)
```typescript
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: number | null;
  children?: Category[];
}
```

### برند (Brand)
```typescript
export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
}
```

### سبد خرید (Cart)
```typescript
export interface CartItem {
  id: string;
  productId: string;
  sellerId: string;
  reserved: number;
  attributes: string; // JSON string
  createdAt: string;
  updatedAt: string;
}

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
}
```

## مدل‌های GraphQL

### کوئری‌های GraphQL

#### کوئری محصولات ویژه
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

#### کوئری سبد خرید
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

### میوتیشن‌های GraphQL

#### میوتیشن ورود
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

# ورودی
input LoginInput {
  phone: String!
  password: String!
}
```

#### میوتیشن ثبت‌نام
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

# ورودی
input SignupInput {
  name: String!
  email: String!
  phone: String!
  password: String!
}
```

#### میوتیشن افزودن به سبد خرید
```graphql
mutation addToCart($addToCartInput: AddToCartInput!) {
  addToCart(addToCartInput: $addToCartInput) {
    id
    reserved
    attributes
    productId
    sellerId
    createdAt
    updatedAt
  }
}

# ورودی
input AddToCartInput {
  productId: String!
  sellerId: String!
  reserved: Int!
  attributes: String
}
```

## نکات مهم در کار با مدل‌های داده
1. به تفاوت‌های نام فیلدها بین فرانت‌اند و بک‌اند توجه کنید (مانند username در فرانت‌اند و phone در بک‌اند)
2. قبل از استفاده از داده‌های دریافتی از API، آن‌ها را با ساختار مورد نیاز فرانت‌اند مپ کنید
3. قبل از ارسال داده به API، فیلدها را با ساختار مورد نیاز بک‌اند مپ کنید
4. برای تبدیل بین ساختارهای داده، از توابع کمکی استفاده کنید