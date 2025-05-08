'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { formatPrice } from '@/lib/utils';
import { BiChevronLeft, BiSort, BiFilter, BiGridAlt, BiListUl } from 'react-icons/bi';

// این یک نمونه داده است - در پروژه واقعی از API استفاده می‌شود
const categories = {
  'mobile-tablets': {
    id: 1,
    name: 'موبایل و تبلت',
    description: 'گوشی‌های هوشمند و تبلت‌ها با برندهای مختلف',
    image: '/images/placeholders/product.svg',
    products: [
      {
        id: 1,
        title: 'گوشی موبایل اپل آیفون 14 پرو',
        image: '/images/placeholders/product.svg',
        price: 58900000,
        originalPrice: 62500000,
        discount: 6,
        slug: 'apple-iphone-14-pro',
        rating: 4.8,
        reviewCount: 124
      },
      {
        id: 2,
        title: 'گوشی موبایل سامسونگ گلکسی S23 Ultra',
        image: '/images/placeholders/product.svg',
        price: 48700000,
        originalPrice: 52100000,
        discount: 7,
        slug: 'samsung-galaxy-s23-ultra',
        rating: 4.7,
        reviewCount: 98
      },
      {
        id: 3,
        title: 'گوشی موبایل شیائومی Redmi Note 12 Pro',
        image: '/images/placeholders/product.svg',
        price: 12900000,
        originalPrice: 14200000,
        discount: 9,
        slug: 'xiaomi-redmi-note-12-pro',
        rating: 4.5,
        reviewCount: 53
      },
      {
        id: 4,
        title: 'تبلت اپل iPad Pro 12.9 اینچ 2022',
        image: '/images/placeholders/product.svg',
        price: 43800000,
        originalPrice: 48200000,
        discount: 9,
        slug: 'apple-ipad-pro-2022',
        rating: 4.9,
        reviewCount: 42
      },
      {
        id: 5,
        title: 'تبلت سامسونگ Galaxy Tab S8 Ultra',
        image: '/images/placeholders/product.svg',
        price: 32600000,
        originalPrice: 35800000,
        discount: 9,
        slug: 'samsung-galaxy-tab-s8-ultra',
        rating: 4.6,
        reviewCount: 35
      },
      {
        id: 6,
        title: 'گوشی موبایل گوگل Pixel 7 Pro',
        image: '/images/placeholders/product.svg',
        price: 37500000,
        originalPrice: 39800000,
        discount: 6,
        slug: 'google-pixel-7-pro',
        rating: 4.7,
        reviewCount: 29
      }
    ],
    filters: [
      {
        name: 'برند',
        options: ['اپل', 'سامسونگ', 'شیائومی', 'هوآوی', 'گوگل']
      },
      {
        name: 'محدوده قیمت',
        options: ['زیر 10 میلیون', '10 تا 20 میلیون', '20 تا 40 میلیون', 'بالای 40 میلیون']
      },
      {
        name: 'حافظه داخلی',
        options: ['64 گیگابایت', '128 گیگابایت', '256 گیگابایت', '512 گیگابایت', '1 ترابایت']
      },
      {
        name: 'رم',
        options: ['4 گیگابایت', '6 گیگابایت', '8 گیگابایت', '12 گیگابایت']
      }
    ]
  }
};

const sortOptions = [
  { id: 'newest', name: 'جدیدترین' },
  { id: 'popular', name: 'محبوب‌ترین' },
  { id: 'cheapest', name: 'ارزان‌ترین' },
  { id: 'expensive', name: 'گران‌ترین' },
  { id: 'discount', name: 'بیشترین تخفیف' }
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categories[slug as keyof typeof categories];
  
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  
  if (!category) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">دسته‌بندی مورد نظر یافت نشد</h1>
          <Link href="/" className="text-primary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray">{category.description}</p>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
            <h3 className="font-bold mb-4 pb-2 border-b border-gray-100">فیلترها</h3>
            
            {category.filters.map((filter, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-medium mb-3">{filter.name}</h4>
                <div className="space-y-2">
                  {filter.options.map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="ml-2" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Tools Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                className="lg:hidden flex items-center text-gray-700 hover:text-primary"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <BiFilter className="ml-1 text-xl" />
                فیلترها
              </button>
              
              <div className="hidden sm:flex items-center">
                <span className="text-gray ml-2">مرتب‌سازی:</span>
                <select 
                  className="bg-transparent border-none focus:ring-0"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button 
                className={`p-2 rounded ${isGridView ? 'bg-gray-100 text-primary' : 'text-gray'}`}
                onClick={() => setIsGridView(true)}
              >
                <BiGridAlt className="text-xl" />
              </button>
              <button 
                className={`p-2 rounded ${!isGridView ? 'bg-gray-100 text-primary' : 'text-gray'}`}
                onClick={() => setIsGridView(false)}
              >
                <BiListUl className="text-xl" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">فیلترها</h3>
                <button 
                  className="text-gray-500"
                  onClick={() => setIsFilterOpen(false)}
                >
                  بستن
                </button>
              </div>
              
              {category.filters.map((filter, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-medium mb-3">{filter.name}</h4>
                  <div className="space-y-2">
                    {filter.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="ml-2" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Grid/List */}
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <Link href={`/product/${product.slug}`} className="block relative">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% تخفیف
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/product/${product.slug}`} className="block">
                      <h3 className="font-semibold text-secondary line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="mb-2 flex items-center">
                      <div className="flex items-center text-yellow-400">
                        <span className="text-xs">★</span>
                        <span className="text-xs mr-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray mr-2">({product.reviewCount} نظر)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-primary font-bold">{formatPrice(product.price)}</div>
                        {product.discount > 0 && (
                          <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </div>
                      
                      <Link 
                        href={`/product/${product.slug}`} 
                        className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        خرید
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {category.products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <Link href={`/product/${product.slug}`} className="sm:w-1/3 relative">
                    <div className="aspect-square sm:aspect-auto sm:h-full relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% تخفیف
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-4 sm:p-6 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${product.slug}`} className="block">
                        <h3 className="font-semibold text-lg text-secondary mb-2 hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="mb-4 flex items-center">
                        <div className="flex items-center text-yellow-400">
                          <span>★</span>
                          <span className="text-sm mr-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray mr-2">({product.reviewCount} نظر)</span>
                      </div>
                      
                      <p className="text-gray mb-4 hidden sm:block">
                        ویژگی‌های کلیدی: صفحه‌نمایش با کیفیت، دوربین حرفه‌ای، پردازنده قدرتمند، باتری با دوام.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-primary font-bold text-lg">{formatPrice(product.price)}</div>
                        {product.discount > 0 && (
                          <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </div>
                      
                      <Link 
                        href={`/product/${product.slug}`} 
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
                      >
                        مشاهده و خرید
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}