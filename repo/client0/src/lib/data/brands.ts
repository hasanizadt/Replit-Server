// داده‌های فیک برای برندها تا زمان آماده شدن بک‌اند

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export const brands: Brand[] = [
  {
    id: 1,
    name: 'اپل',
    slug: 'apple',
    image: '/placeholder-300.png',
    description: 'شرکت اپل، سازنده محصولات با کیفیت در زمینه گوشی، لپ تاپ و گجت‌های هوشمند',
  },
  {
    id: 2,
    name: 'سامسونگ',
    slug: 'samsung',
    image: '/placeholder-300.png',
    description: 'شرکت سامسونگ، تولیدکننده انواع محصولات الکترونیکی و دیجیتال',
  },
  {
    id: 3,
    name: 'شیائومی',
    slug: 'xiaomi',
    image: '/placeholder-300.png',
    description: 'شرکت شیائومی، تولیدکننده محصولات با کیفیت و قیمت مناسب',
  },
  {
    id: 4,
    name: 'هوآوی',
    slug: 'huawei',
    image: '/placeholder-300.png',
    description: 'شرکت هوآوی، تولیدکننده گوشی‌های هوشمند و تجهیزات ارتباطی',
  },
  {
    id: 5,
    name: 'سونی',
    slug: 'sony',
    image: '/placeholder-300.png',
    description: 'شرکت سونی، تولیدکننده محصولات صوتی و تصویری و گجت‌های هوشمند',
  },
  {
    id: 6,
    name: 'ایسوس',
    slug: 'asus',
    image: '/placeholder-300.png',
    description: 'شرکت ایسوس، تولیدکننده لپ تاپ و قطعات کامپیوتری',
  },
  {
    id: 7,
    name: 'نوکیا',
    slug: 'nokia',
    image: '/placeholder-300.png',
    description: 'شرکت نوکیا، تولیدکننده گوشی‌های هوشمند و تجهیزات ارتباطی',
  },
  {
    id: 8,
    name: 'ال جی',
    slug: 'lg',
    image: '/placeholder-300.png',
    description: 'شرکت ال جی، تولیدکننده لوازم خانگی و محصولات الکترونیکی',
  },
];

// تابع برای دریافت همه برندها
export function getAllBrands() {
  return brands;
}

// تابع برای دریافت برند با slug
export function getBrandBySlug(slug: string) {
  return brands.find(brand => brand.slug === slug);
}

// تابع برای دریافت برندهای یک دسته‌بندی
export function getBrandsByCategory(categorySlug: string) {
  // این تابع در نسخه واقعی باید برندهای مرتبط با یک دسته‌بندی را برگرداند
  // فعلاً همه برندها را برمی‌گرداند
  return brands;
}