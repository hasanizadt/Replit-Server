// داده‌های فیک برای دسته‌بندی‌ها تا زمان آماده شدن بک‌اند

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: number | null;
  children?: Category[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'موبایل و تبلت',
    slug: 'mobile-tablet',
    image: '/placeholder-300.png',
    description: 'انواع گوشی‌های موبایل و تبلت',
    parentId: null,
    children: [
      {
        id: 11,
        name: 'گوشی موبایل',
        slug: 'mobile',
        image: '/placeholder-300.png',
        description: 'انواع گوشی‌های موبایل هوشمند',
        parentId: 1,
      },
      {
        id: 12,
        name: 'تبلت',
        slug: 'tablet',
        image: '/placeholder-300.png',
        description: 'انواع تبلت‌های هوشمند',
        parentId: 1,
      },
      {
        id: 13,
        name: 'لوازم جانبی موبایل',
        slug: 'mobile-accessories',
        image: '/placeholder-300.png',
        description: 'انواع لوازم جانبی موبایل و تبلت',
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'لپ تاپ و کامپیوتر',
    slug: 'laptop-computer',
    image: '/placeholder-300.png',
    description: 'انواع لپ تاپ، کامپیوتر و قطعات',
    parentId: null,
    children: [
      {
        id: 21,
        name: 'لپ تاپ',
        slug: 'laptop',
        image: '/placeholder-300.png',
        description: 'انواع لپ تاپ',
        parentId: 2,
      },
      {
        id: 22,
        name: 'کامپیوتر',
        slug: 'desktop',
        image: '/placeholder-300.png',
        description: 'انواع کامپیوتر رومیزی',
        parentId: 2,
      },
      {
        id: 23,
        name: 'قطعات کامپیوتر',
        slug: 'computer-parts',
        image: '/placeholder-300.png',
        description: 'انواع قطعات کامپیوتر',
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'لوازم خانگی',
    slug: 'home-appliances',
    image: '/placeholder-300.png',
    description: 'انواع لوازم خانگی',
    parentId: null,
    children: [
      {
        id: 31,
        name: 'یخچال و فریزر',
        slug: 'refrigerator',
        image: '/placeholder-300.png',
        description: 'انواع یخچال و فریزر',
        parentId: 3,
      },
      {
        id: 32,
        name: 'ماشین لباسشویی',
        slug: 'washing-machine',
        image: '/placeholder-300.png',
        description: 'انواع ماشین لباسشویی',
        parentId: 3,
      },
      {
        id: 33,
        name: 'جاروبرقی',
        slug: 'vacuum-cleaner',
        image: '/placeholder-300.png',
        description: 'انواع جاروبرقی',
        parentId: 3,
      },
    ],
  },
  {
    id: 4,
    name: 'مد و پوشاک',
    slug: 'fashion',
    image: '/placeholder-300.png',
    description: 'انواع پوشاک و اکسسوری',
    parentId: null,
    children: [
      {
        id: 41,
        name: 'لباس مردانه',
        slug: 'men-clothes',
        image: '/placeholder-300.png',
        description: 'انواع لباس مردانه',
        parentId: 4,
      },
      {
        id: 42,
        name: 'لباس زنانه',
        slug: 'women-clothes',
        image: '/placeholder-300.png',
        description: 'انواع لباس زنانه',
        parentId: 4,
      },
      {
        id: 43,
        name: 'اکسسوری',
        slug: 'accessories',
        image: '/placeholder-300.png',
        description: 'انواع اکسسوری',
        parentId: 4,
      },
    ],
  },
  {
    id: 5,
    name: 'زیبایی و سلامت',
    slug: 'beauty-health',
    image: '/placeholder-300.png',
    description: 'محصولات زیبایی و سلامت',
    parentId: null,
    children: [
      {
        id: 51,
        name: 'لوازم آرایشی',
        slug: 'cosmetics',
        image: '/placeholder-300.png',
        description: 'انواع لوازم آرایشی',
        parentId: 5,
      },
      {
        id: 52,
        name: 'مراقبت پوست',
        slug: 'skin-care',
        image: '/placeholder-300.png',
        description: 'محصولات مراقبت از پوست',
        parentId: 5,
      },
      {
        id: 53,
        name: 'عطر و ادکلن',
        slug: 'perfume',
        image: '/placeholder-300.png',
        description: 'انواع عطر و ادکلن',
        parentId: 5,
      },
    ],
  },
  {
    id: 6,
    name: 'کتاب و لوازم التحریر',
    slug: 'books',
    image: '/placeholder-300.png',
    description: 'کتاب و لوازم التحریر',
    parentId: null,
    children: [
      {
        id: 61,
        name: 'کتاب',
        slug: 'book',
        image: '/placeholder-300.png',
        description: 'انواع کتاب',
        parentId: 6,
      },
      {
        id: 62,
        name: 'لوازم التحریر',
        slug: 'stationery',
        image: '/placeholder-300.png',
        description: 'انواع لوازم التحریر',
        parentId: 6,
      },
    ],
  },
];

// تابع برای دریافت همه دسته‌بندی‌های اصلی
export function getMainCategories() {
  return categories.filter(category => category.parentId === null);
}

// تابع برای دریافت همه دسته‌بندی‌ها
export function getAllCategories() {
  return categories;
}

// تابع برای دریافت یک دسته‌بندی با slug
export function getCategoryBySlug(slug: string) {
  // جستجو در دسته‌بندی‌های اصلی
  const mainCategory = categories.find(category => category.slug === slug);
  if (mainCategory) return mainCategory;
  
  // جستجو در زیردسته‌ها
  for (const category of categories) {
    if (category.children) {
      const subCategory = category.children.find(child => child.slug === slug);
      if (subCategory) return subCategory;
    }
  }
  
  return null;
}

// تابع برای دریافت زیردسته‌های یک دسته‌بندی
export function getSubcategories(parentId: number) {
  const category = categories.find(cat => cat.id === parentId);
  return category?.children || [];
}

// تابع برای دریافت مسیر دسته‌بندی (برای breadcrumb)
export function getCategoryPath(slug: string): Category[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  
  if (category.parentId) {
    const parent = categories.find(cat => cat.id === category.parentId);
    if (parent) {
      return [parent, category];
    }
  }
  
  return [category];
}