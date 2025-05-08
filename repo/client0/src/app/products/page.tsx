'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import ProductCard from '@/components/products/ProductCard';
import Filters from '@/components/products/Filters';
import { BiChevronLeft, BiGrid, BiListUl, BiFilterAlt, BiSort, BiSearch, BiX } from 'react-icons/bi';

// این دیتا تنها برای نمایش است و در نسخه واقعی از API دریافت می‌شود
const mockProducts = [
  {
    id: 1,
    title: 'گوشی موبایل اپل آیفون 14 پرو مکس',
    slug: 'apple-iphone-14-pro-max',
    price: 65800000,
    originalPrice: 69500000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.9,
    reviewCount: 253,
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    title: 'لپ تاپ اپل مک‌بوک پرو ۱۴ اینچ M2 پرو',
    slug: 'apple-macbook-pro-14-m2-pro',
    price: 85400000,
    originalPrice: 92000000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.8,
    reviewCount: 124,
    inStock: true
  },
  {
    id: 3,
    title: 'ساعت هوشمند اپل واچ سری ۸',
    slug: 'apple-watch-series-8',
    price: 23950000,
    originalPrice: 25800000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.7,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 4,
    title: 'گوشی موبایل سامسونگ گلکسی S23 اولترا',
    slug: 'samsung-galaxy-s23-ultra',
    price: 53500000,
    originalPrice: 58900000,
    image: '/images/placeholders/product.svg',
    brand: 'سامسونگ',
    brandSlug: 'samsung',
    rating: 4.8,
    reviewCount: 201,
    inStock: true,
    isNew: true
  },
  {
    id: 5,
    title: 'لپ تاپ گیمینگ ایسوس مدل ROG Strix G15',
    slug: 'asus-rog-strix-g15-gaming-laptop',
    price: 62400000,
    originalPrice: 68300000,
    image: '/images/placeholders/product.svg',
    brand: 'ایسوس',
    brandSlug: 'asus',
    rating: 4.6,
    reviewCount: 76,
    inStock: true
  },
  {
    id: 6,
    title: 'هدفون بی‌سیم سونی WH-1000XM4',
    slug: 'sony-wh-1000xm4-wireless-headphones',
    price: 12800000,
    originalPrice: 14500000,
    image: '/images/placeholders/product.svg',
    brand: 'سونی',
    brandSlug: 'sony',
    rating: 4.9,
    reviewCount: 312,
    inStock: true
  },
  {
    id: 7,
    title: 'تلویزیون QLED سامسونگ ۶۵ اینچ',
    slug: 'samsung-65-qled-tv',
    price: 45800000,
    originalPrice: 49900000,
    image: '/images/placeholders/product.svg',
    brand: 'سامسونگ',
    brandSlug: 'samsung',
    rating: 4.7,
    reviewCount: 93,
    inStock: false
  },
  {
    id: 8,
    title: 'کنسول بازی سونی PlayStation 5',
    slug: 'sony-playstation-5',
    price: 28400000,
    originalPrice: 30200000,
    image: '/images/placeholders/product.svg',
    brand: 'سونی',
    brandSlug: 'sony',
    rating: 4.8,
    reviewCount: 258,
    inStock: false
  },
  {
    id: 9,
    title: 'دوربین بدون آینه کانن EOS R6',
    slug: 'canon-eos-r6-mirrorless-camera',
    price: 97500000,
    originalPrice: 105000000,
    image: '/images/placeholders/product.svg',
    brand: 'کانن',
    brandSlug: 'canon',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    isNew: true
  },
  {
    id: 10,
    title: 'تبلت سامسونگ گلکسی تب S8 اولترا',
    slug: 'samsung-galaxy-tab-s8-ultra',
    price: 37900000,
    originalPrice: 42500000,
    image: '/images/placeholders/product.svg',
    brand: 'سامسونگ',
    brandSlug: 'samsung',
    rating: 4.6,
    reviewCount: 41,
    inStock: true
  },
  {
    id: 11,
    title: 'اسپیکر هوشمند اپل هوم‌پاد مینی',
    slug: 'apple-homepod-mini-smart-speaker',
    price: 8450000,
    originalPrice: 9200000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.5,
    reviewCount: 29,
    inStock: true
  },
  {
    id: 12,
    title: 'هدفون بلوتوثی اپل AirPods Pro 2',
    slug: 'apple-airpods-pro-2',
    price: 11900000,
    originalPrice: 13200000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.8,
    reviewCount: 178,
    inStock: true
  },
];

// فیلترهای در دسترس
const filterGroups = [
  {
    title: 'دسته‌بندی',
    name: 'category',
    options: [
      { id: 'mobile', label: 'گوشی موبایل', count: 143 },
      { id: 'laptop', label: 'لپ تاپ', count: 86 },
      { id: 'tablet', label: 'تبلت', count: 42 },
      { id: 'headphone', label: 'هدفون و هندزفری', count: 78 },
      { id: 'tv', label: 'تلویزیون', count: 65 },
      { id: 'camera', label: 'دوربین', count: 37 },
    ]
  },
  {
    title: 'برند',
    name: 'brand',
    options: [
      { id: 'apple', label: 'اپل', count: 57 },
      { id: 'samsung', label: 'سامسونگ', count: 72 },
      { id: 'xiaomi', label: 'شیائومی', count: 41 },
      { id: 'sony', label: 'سونی', count: 38 },
      { id: 'huawei', label: 'هواوی', count: 25 },
      { id: 'asus', label: 'ایسوس', count: 29 },
      { id: 'lg', label: 'ال جی', count: 18 },
      { id: 'canon', label: 'کانن', count: 15 },
    ]
  },
  {
    title: 'وضعیت کالا',
    name: 'status',
    options: [
      { id: 'original', label: 'اصل', count: 458 },
      { id: 'ready', label: 'آماده ارسال', count: 382 },
      { id: 'available', label: 'موجود در انبار', count: 301 },
      { id: 'special-offer', label: 'پیشنهاد ویژه', count: 85 },
      { id: 'new', label: 'کالای جدید', count: 124 },
    ]
  },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 150000000
  });
  
  // تغییر فیلترها
  const handleFilterChange = (name: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[name] || [];
      
      if (checked) {
        return {
          ...prev,
          [name]: [...currentFilters, value]
        };
      } else {
        return {
          ...prev,
          [name]: currentFilters.filter(item => item !== value)
        };
      }
    });
  };
  
  // تغییر محدوده قیمت
  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setPriceRange({
      min: minPrice,
      max: maxPrice
    });
  };
  
  // حذف همه فیلترها
  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange({
      min: 0,
      max: 150000000
    });
  };
  
  // تأثیر فیلترها و مرتب‌سازی روی محصولات
  useEffect(() => {
    // در اینجا به جای فیلتر کردن دیتای مجازی، در واقع یک درخواست API با پارامترهای فیلتر ارسال می‌شود
    
    // مرتب‌سازی محصولات
    let sorted = [...mockProducts];
    
    if (sortOption === 'newest') {
      // فرض می‌کنیم محصولات از قبل بر اساس جدیدترین مرتب شده‌اند
    } else if (sortOption === 'price-low-to-high') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-to-low') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'most-popular') {
      sorted = sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === 'highest-rated') {
      sorted = sorted.sort((a, b) => b.rating - a.rating);
    }
    
    // اعمال فیلتر قیمت
    const priceFiltered = sorted.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    setFilteredProducts(priceFiltered);
  }, [sortOption, selectedFilters, priceRange]);
  
  // شمارش تعداد نتایج
  const resultCount = filteredProducts.length;

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">محصولات</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block">
          <Filters 
            filterGroups={filterGroups}
            priceRange={priceRange}
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
            selectedFilters={selectedFilters}
            onClearFilters={clearAllFilters}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Top Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-y-3 justify-between items-center">
            <div className="flex items-center">
              <h1 className="font-bold ml-4">محصولات</h1>
              <span className="text-sm text-gray">({resultCount} محصول)</span>
            </div>
            
            <div className="flex items-center flex-wrap gap-3">
              {/* Mobile Filter Button */}
              <button 
                className="lg:hidden flex items-center border border-gray-200 rounded-lg px-3 py-2 hover:border-primary"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <BiFilterAlt className="ml-2" />
                فیلترها
              </button>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="most-popular">محبوب‌ترین</option>
                  <option value="highest-rated">بیشترین امتیاز</option>
                  <option value="price-low-to-high">ارزان‌ترین</option>
                  <option value="price-high-to-low">گران‌ترین</option>
                </select>
                <BiSort className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              
              {/* View Mode Switcher */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  aria-label="نمایش شبکه‌ای"
                >
                  <BiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  aria-label="نمایش لیستی"
                >
                  <BiListUl />
                </button>
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          <div className="my-4">
            {(Object.keys(selectedFilters).length > 0 || priceRange.min > 0 || priceRange.max < 150000000) && (
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-sm">فیلترهای فعال:</span>
                
                {/* نمایش فیلترهای انتخاب شده */}
                {Object.entries(selectedFilters).map(([name, values]) => 
                  values.map(value => {
                    // پیدا کردن عنوان برای نمایش
                    const filterGroup = filterGroups.find(group => group.name === name);
                    const option = filterGroup?.options.find(opt => opt.id === value);
                    
                    return (
                      <div 
                        key={`${name}-${value}`} 
                        className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                      >
                        <span>{filterGroup?.title}: {option?.label}</span>
                        <button 
                          onClick={() => handleFilterChange(name, value, false)}
                          className="mr-1 text-gray-500 hover:text-red-500"
                        >
                          <BiX />
                        </button>
                      </div>
                    );
                  })
                )}
                
                {/* نمایش فیلتر قیمت */}
                {(priceRange.min > 0 || priceRange.max < 150000000) && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>
                      محدوده قیمت: از {priceRange.min.toLocaleString('fa-IR')} تا {priceRange.max.toLocaleString('fa-IR')} تومان
                    </span>
                    <button 
                      onClick={() => setPriceRange({ min: 0, max: 150000000 })}
                      className="mr-1 text-gray-500 hover:text-red-500"
                    >
                      <BiX />
                    </button>
                  </div>
                )}
                
                {/* دکمه حذف همه فیلترها */}
                <button 
                  onClick={clearAllFilters}
                  className="text-red-500 text-sm hover:underline"
                >
                  حذف همه
                </button>
              </div>
            )}
          </div>
          
          {/* Product Results */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">محصولی یافت نشد</h3>
              <p className="text-gray mb-6">با معیارهای انتخابی شما محصولی یافت نشد. لطفاً فیلترهای خود را تغییر دهید.</p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
              >
                حذف فیلترها
              </button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      {...product}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      {...product}
                      variant="horizontal"
                    />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <ul className="flex">
                  <li>
                    <button 
                      className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-r-lg hover:bg-gray-50"
                      aria-label="Previous Page"
                      disabled
                    >
                      <BiChevronLeft />
                    </button>
                  </li>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <li key={page}>
                      <button 
                        className={`inline-flex items-center justify-center w-10 h-10 border-t border-b border-gray-200 ${
                          page === 1 ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button 
                      className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-l-lg hover:bg-gray-50"
                      aria-label="Next Page"
                    >
                      <BiChevronLeft className="transform rotate-180" />
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex lg:hidden">
          <div className="bg-white w-4/5 max-w-md h-full overflow-auto ml-auto animate-slide-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold">فیلترها</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <BiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-4">
              <Filters 
                filterGroups={filterGroups}
                priceRange={priceRange}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
                selectedFilters={selectedFilters}
                onClearFilters={clearAllFilters}
              />
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg transition-colors"
              >
                مشاهده {resultCount} محصول
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}