'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { formatPrice } from '@/lib/utils';
import { BiChevronLeft, BiSort, BiFilter, BiGridAlt, BiListUl } from 'react-icons/bi';

// این یک نمونه داده است - در پروژه واقعی از API استفاده می‌شود
const brands = {
  'apple': {
    id: 1,
    name: 'اپل',
    description: 'شرکت اپل یکی از بزرگترین تولیدکنندگان گوشی‌های هوشمند، کامپیوترها، تبلت‌ها و ساعت‌های هوشمند در جهان است. این شرکت آمریکایی با نوآوری‌های خود همواره پیشگام در صنعت فناوری بوده است.',
    logo: '/images/placeholders/brand.svg',
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
        reviewCount: 124,
        category: 'گوشی موبایل'
      },
      {
        id: 2,
        title: 'لپ تاپ مک بوک ایر M2',
        image: '/images/placeholders/product.svg',
        price: 62400000,
        originalPrice: 67800000,
        discount: 8,
        slug: 'macbook-air-m2',
        rating: 4.9,
        reviewCount: 89,
        category: 'لپ تاپ'
      },
      {
        id: 3,
        title: 'هدفون بی سیم ایرپاد پرو',
        image: '/images/placeholders/product.svg',
        price: 9700000,
        originalPrice: 11200000,
        discount: 13,
        slug: 'airpods-pro',
        rating: 4.7,
        reviewCount: 237,
        category: 'هدفون و هندزفری'
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
        reviewCount: 42,
        category: 'تبلت'
      },
      {
        id: 5,
        title: 'ساعت هوشمند اپل واچ سری 8',
        image: '/images/placeholders/product.svg',
        price: 19800000,
        originalPrice: 22500000,
        discount: 12,
        slug: 'apple-watch-series-8',
        rating: 4.8,
        reviewCount: 76,
        category: 'ساعت هوشمند'
      },
      {
        id: 6,
        title: 'اپل TV نسل 4K',
        image: '/images/placeholders/product.svg',
        price: 14500000,
        originalPrice: 15800000,
        discount: 8,
        slug: 'apple-tv-4k',
        rating: 4.6,
        reviewCount: 31,
        category: 'لوازم جانبی'
      }
    ],
    filters: [
      {
        name: 'دسته‌بندی',
        options: ['گوشی موبایل', 'لپ تاپ', 'تبلت', 'ساعت هوشمند', 'هدفون و هندزفری', 'لوازم جانبی']
      },
      {
        name: 'محدوده قیمت',
        options: ['زیر 10 میلیون', '10 تا 20 میلیون', '20 تا 40 میلیون', 'بالای 40 میلیون']
      },
      {
        name: 'مدل',
        options: ['آیفون', 'آیپد', 'مک', 'اپل واچ', 'ایرپاد']
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

export default function BrandPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const brand = brands[slug as keyof typeof brands];
  
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  
  if (!brand) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">برند مورد نظر یافت نشد</h1>
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
        <Link href="/brands" className="hover:text-primary">
          برندها
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">{brand.name}</span>
      </div>

      {/* Brand Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center">
        <div className="w-32 h-32 bg-white rounded-lg border border-gray-200 p-4 mb-4 md:mb-0 md:ml-6 flex-shrink-0">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{brand.name}</h1>
          <p className="text-gray">{brand.description}</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
            <h3 className="font-bold mb-4 pb-2 border-b border-gray-100">فیلترها</h3>
            
            {brand.filters.map((filter, index) => (
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
              
              {brand.filters.map((filter, index) => (
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
              {brand.products.map(product => (
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
                    <span className="text-xs text-gray mb-2 block">{product.category}</span>
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
              {brand.products.map(product => (
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
                      <span className="text-xs text-gray mb-1 block">{product.category}</span>
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
                        محصول با کیفیت از برند {brand.name} با امکانات پیشرفته و طراحی زیبا. گارانتی ۱۸ ماهه.
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