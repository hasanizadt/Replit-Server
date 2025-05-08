// داده‌های فیک برای محصولات تا زمان آماده شدن بک‌اند

export interface Product {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  image: string;
  slug: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  attributes?: { name: string; value: string }[];
}

export const products: Product[] = [
  {
    id: 1,
    title: 'گوشی موبایل سامسونگ گلکسی A52',
    price: 12500000,
    discountedPrice: 10990000,
    image: '/placeholder-500.png',
    slug: 'samsung-galaxy-a52',
    description: 'گوشی موبایل سامسونگ مدل Galaxy A52 دو سیم کارت ظرفیت 128 گیگابایت و رم 6 گیگابایت',
    category: 'mobile',
    brand: 'samsung',
    rating: 4.5,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'مشکی' },
      { name: 'حافظه داخلی', value: '128 گیگابایت' },
      { name: 'رم', value: '6 گیگابایت' },
    ],
  },
  {
    id: 2,
    title: 'هدفون بی‌سیم سونی WH-1000XM4',
    price: 8900000,
    discountedPrice: 7390000,
    image: '/placeholder-500.png',
    slug: 'sony-wh-1000xm4',
    description: 'هدفون بی‌سیم سونی مدل WH-1000XM4 با قابلیت حذف نویز و کیفیت صدای فوق‌العاده',
    category: 'audio',
    brand: 'sony',
    rating: 4.8,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'مشکی' },
      { name: 'نوع اتصال', value: 'بی‌سیم' },
      { name: 'مدت زمان باتری', value: '30 ساعت' },
    ],
  },
  {
    id: 3,
    title: 'لپ تاپ ایسوس مدل VivoBook',
    price: 29500000,
    discountedPrice: 26990000,
    image: '/placeholder-500.png',
    slug: 'asus-vivobook',
    description: 'لپ تاپ ایسوس مدل VivoBook با پردازنده Core i7 و 16 گیگابایت رم',
    category: 'laptop',
    brand: 'asus',
    rating: 4.6,
    inStock: true,
    attributes: [
      { name: 'پردازنده', value: 'Core i7' },
      { name: 'رم', value: '16 گیگابایت' },
      { name: 'حافظه', value: '512 گیگابایت SSD' },
    ],
  },
  {
    id: 4,
    title: 'ساعت هوشمند اپل واچ سری 7',
    price: 15800000,
    discountedPrice: 14200000,
    image: '/placeholder-500.png',
    slug: 'apple-watch-series-7',
    description: 'ساعت هوشمند اپل واچ سری 7 با صفحه نمایش بزرگتر و شارژ سریع‌تر',
    category: 'wearable',
    brand: 'apple',
    rating: 4.7,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'نقره‌ای' },
      { name: 'اندازه', value: '45 میلی‌متر' },
      { name: 'اتصال', value: 'GPS' },
    ],
  },
  {
    id: 5,
    title: 'گوشی موبایل اپل iPhone 13 Pro',
    price: 39800000,
    image: '/placeholder-500.png',
    slug: 'apple-iphone-13-pro',
    description: 'گوشی موبایل اپل مدل iPhone 13 Pro با ظرفیت 256 گیگابایت و رم 6 گیگابایت',
    category: 'mobile',
    brand: 'apple',
    rating: 4.8,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'آبی' },
      { name: 'حافظه داخلی', value: '256 گیگابایت' },
      { name: 'رم', value: '6 گیگابایت' },
    ],
  },
  {
    id: 6,
    title: 'لپ تاپ اپل MacBook Pro M1',
    price: 52500000,
    image: '/placeholder-500.png',
    slug: 'apple-macbook-pro-m1',
    description: 'لپ تاپ اپل مدل MacBook Pro با تراشه M1 و 16 گیگابایت رم',
    category: 'laptop',
    brand: 'apple',
    rating: 4.9,
    inStock: true,
    attributes: [
      { name: 'پردازنده', value: 'Apple M1' },
      { name: 'رم', value: '16 گیگابایت' },
      { name: 'حافظه', value: '512 گیگابایت SSD' },
    ],
  },
  {
    id: 7,
    title: 'تبلت سامسونگ Galaxy Tab S7',
    price: 24990000,
    image: '/placeholder-500.png',
    slug: 'samsung-galaxy-tab-s7',
    description: 'تبلت سامسونگ مدل Galaxy Tab S7 با صفحه نمایش 11 اینچی و قلم S Pen',
    category: 'tablet',
    brand: 'samsung',
    rating: 4.7,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'نقره‌ای' },
      { name: 'حافظه داخلی', value: '128 گیگابایت' },
      { name: 'اندازه صفحه نمایش', value: '11 اینچ' },
    ],
  },
  {
    id: 8,
    title: 'هدفون ایرپاد پرو',
    price: 7800000,
    image: '/placeholder-500.png',
    slug: 'airpods-pro',
    description: 'هدفون بی‌سیم اپل مدل AirPods Pro با قابلیت حذف نویز',
    category: 'audio',
    brand: 'apple',
    rating: 4.6,
    inStock: true,
    attributes: [
      { name: 'رنگ', value: 'سفید' },
      { name: 'نوع اتصال', value: 'بی‌سیم' },
      { name: 'مدت زمان باتری', value: '4.5 ساعت' },
    ],
  },
];

// تابع برای دریافت محصولات با پارامترهای مختلف
export function getProducts(params: { limit?: number; page?: number; category?: string; brand?: string } = {}) {
  const { limit = 10, page = 1, category, brand } = params;
  
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (brand) {
    filteredProducts = filteredProducts.filter(product => product.brand === brand);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    products: filteredProducts.slice(startIndex, endIndex),
    totalCount: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limit),
  };
}

// تابع برای دریافت یک محصول با slug
export function getProductBySlug(slug: string) {
  return products.find(product => product.slug === slug);
}

// تابع برای دریافت محصولات تخفیف‌دار
export function getDiscountedProducts(limit = 4) {
  return products
    .filter(product => product.discountedPrice)
    .slice(0, limit);
}

// تابع برای دریافت محصولات پرفروش
export function getFeaturedProducts(limit = 8) {
  return products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

// تابع برای دریافت محصولات مرتبط
export function getRelatedProducts(slug: string, limit = 4) {
  const currentProduct = getProductBySlug(slug);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || product.brand === currentProduct.brand)
    )
    .slice(0, limit);
}