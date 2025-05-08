'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFeaturedProducts } from '@/lib/api';

// تعریف تایپ برای محصولات API
interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  discount: number | string;
  discountUnit?: string;
  quantity: number;
  images: { url: string; id: string; alt?: string }[];
}

// تعریف تایپ برای محصولات نمایشی
interface DisplayProduct {
  id: string | number;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  link: string;
  discount?: number;
  discountUnit?: string;
}

const FeaturedProducts: React.FC = () => {
  const [result] = useFeaturedProducts();
  const { data, fetching, error } = result;
  
  // داده‌های نمونه برای محصولات برتر (به عنوان پشتیبان در صورت عدم اتصال به API)
  const fallbackProducts = [
    {
      id: 1,
      title: 'گوشی موبایل سامسونگ مدل Galaxy S23 Ultra',
      image: '/images/placeholders/product-phone.svg',
      price: 45_500_000,
      rating: 4.7,
      reviewCount: 124,
      link: '/product/samsung-galaxy-s23-ultra'
    },
    {
      id: 2,
      title: 'لپ تاپ اپل مدل MacBook Pro 16 2023',
      image: '/images/placeholders/product-laptop.svg',
      price: 92_000_000,
      rating: 4.9,
      reviewCount: 85,
      link: '/product/macbook-pro-16-2023'
    },
    {
      id: 3,
      title: 'تبلت سامسونگ مدل Galaxy Tab S9 Ultra',
      image: '/images/placeholders/product-tablet.svg',
      price: 35_800_000,
      rating: 4.6,
      reviewCount: 67,
      link: '/product/galaxy-tab-s9-ultra'
    },
    {
      id: 4,
      title: 'ایرپاد پرو نسل دوم',
      image: '/images/placeholders/product-airpods.svg',
      price: 12_500_000,
      rating: 4.8,
      reviewCount: 203,
      link: '/product/airpods-pro-2'
    },
    {
      id: 5,
      title: 'اسپیکر هوشمند Google Nest Audio',
      image: '/images/placeholders/product-speaker-smart.svg',
      price: 4_200_000,
      rating: 4.5,
      reviewCount: 43,
      link: '/product/google-nest-audio'
    },
    {
      id: 6,
      title: 'کنسول بازی PlayStation 5',
      image: '/images/placeholders/product-console.svg',
      price: 25_800_000,
      rating: 4.9,
      reviewCount: 156,
      link: '/product/playstation-5'
    },
    {
      id: 7,
      title: 'دوربین بدون آینه سونی Alpha a7 IV',
      image: '/images/placeholders/product-camera-pro.svg',
      price: 87_500_000,
      rating: 4.8,
      reviewCount: 72,
      link: '/product/sony-alpha-a7-iv'
    },
    {
      id: 8,
      title: 'هدست واقعیت مجازی Meta Quest 3',
      image: '/images/placeholders/product-vr.svg',
      price: 18_900_000,
      rating: 4.6,
      reviewCount: 38,
      link: '/product/meta-quest-3'
    }
  ];

  // استفاده از داده‌های API یا داده‌های پشتیبان
  const products: DisplayProduct[] = data?.featuredProducts?.length > 0 
    ? data.featuredProducts.map((product: ApiProduct): DisplayProduct => ({
        id: product.id,
        title: product.name,
        image: product.images && product.images.length > 0 
          ? product.images[0].url 
          : '/images/placeholders/product-default.svg',
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        discount: typeof product.discount === 'string' ? parseFloat(product.discount) : product.discount,
        discountUnit: product.discountUnit,
        rating: 4.5, // مقدار پیش‌فرض چون در اسکیمای جدید موجود نیست
        reviewCount: 0, // مقدار پیش‌فرض چون در اسکیمای جدید موجود نیست
        link: `/product/${product.slug}`
      }))
    : fallbackProducts;

  // تابع برای فرمت کردن قیمت‌ها به تومان
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  // وضعیت بارگذاری
  if (fetching) {
    return (
      <div className="w-full grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="animate-pulse bg-gray-100 rounded-lg h-80"></div>
        ))}
      </div>
    );
  }

  // وضعیت خطا
  if (error) {
    console.error('خطا در دریافت محصولات ویژه:', error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: DisplayProduct) => (
        <Link
          key={product.id}
          href={product.link}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative pt-[100%]">
            <div className="absolute inset-0 p-6">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-secondary line-clamp-2 h-12">
              {product.title}
            </h3>
            
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm mr-1">{product.rating}</span>
              </div>
              <span className="text-xs text-gray mr-2">
                ({product.reviewCount} نظر)
              </span>
            </div>
            
            <div className="mt-3 font-bold text-lg text-secondary">
              {formatPrice(product.price)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedProducts;