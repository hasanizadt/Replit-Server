'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { formatPrice } from '@/lib/utils';
import { BiChevronLeft, BiX, BiTrash, BiPlus, BiShoppingBag } from 'react-icons/bi';

// این یک نمونه داده است - در پروژه واقعی از API استفاده می‌شود
const initialProducts = [
  {
    id: 1,
    title: 'گوشی موبایل اپل آیفون 14 پرو',
    image: '/images/placeholders/product.svg',
    price: 58900000,
    originalPrice: 62500000,
    discount: 6,
    slug: 'apple-iphone-14-pro',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    specs: [
      { name: 'حافظه داخلی', value: '256 گیگابایت' },
      { name: 'رم', value: '6 گیگابایت' },
      { name: 'رزولوشن دوربین', value: '48 مگاپیکسل' },
      { name: 'اندازه صفحه نمایش', value: '6.1 اینچ' },
      { name: 'نوع پردازنده', value: 'A16 Bionic' },
      { name: 'ظرفیت باتری', value: '3200 میلی‌آمپر ساعت' },
      { name: 'سیستم عامل', value: 'iOS 16' },
      { name: 'رنگ‌ها', value: 'مشکی، نقره‌ای، طلایی' },
    ]
  },
  {
    id: 2,
    title: 'گوشی موبایل سامسونگ گلکسی S23 اولترا',
    image: '/images/placeholders/product.svg',
    price: 48600000,
    originalPrice: 52900000,
    discount: 8,
    slug: 'samsung-galaxy-s23-ultra',
    brand: 'سامسونگ',
    brandSlug: 'samsung',
    rating: 4.8,
    reviewCount: 116,
    inStock: true,
    specs: [
      { name: 'حافظه داخلی', value: '256 گیگابایت' },
      { name: 'رم', value: '12 گیگابایت' },
      { name: 'رزولوشن دوربین', value: '108 مگاپیکسل' },
      { name: 'اندازه صفحه نمایش', value: '6.8 اینچ' },
      { name: 'نوع پردازنده', value: 'Snapdragon 8 Gen 2' },
      { name: 'ظرفیت باتری', value: '5000 میلی‌آمپر ساعت' },
      { name: 'سیستم عامل', value: 'Android 13' },
      { name: 'رنگ‌ها', value: 'مشکی، سبز، کرم، بنفش' },
    ]
  },
  {
    id: 3,
    title: 'گوشی موبایل شیائومی Redmi Note 12 Pro',
    image: '/images/placeholders/product.svg',
    price: 12900000,
    originalPrice: 14200000,
    discount: 9,
    slug: 'xiaomi-redmi-note-12-pro',
    brand: 'شیائومی',
    brandSlug: 'xiaomi',
    rating: 4.5,
    reviewCount: 53,
    inStock: true,
    specs: [
      { name: 'حافظه داخلی', value: '128 گیگابایت' },
      { name: 'رم', value: '8 گیگابایت' },
      { name: 'رزولوشن دوربین', value: '50 مگاپیکسل' },
      { name: 'اندازه صفحه نمایش', value: '6.67 اینچ' },
      { name: 'نوع پردازنده', value: 'Dimensity 1080' },
      { name: 'ظرفیت باتری', value: '5000 میلی‌آمپر ساعت' },
      { name: 'سیستم عامل', value: 'Android 12' },
      { name: 'رنگ‌ها', value: 'مشکی، سفید، آبی' },
    ]
  }
];

// محصولات دیگر برای افزودن به مقایسه
const availableProducts = [
  {
    id: 4,
    title: 'گوشی موبایل گوگل Pixel 7 Pro',
    image: '/images/placeholders/product.svg',
    price: 37500000,
    originalPrice: 39800000,
    discount: 6,
    slug: 'google-pixel-7-pro',
    brand: 'گوگل',
    brandSlug: 'google',
  },
  {
    id: 5,
    title: 'گوشی موبایل وان پلاس 10 پرو',
    image: '/images/placeholders/product.svg',
    price: 32300000,
    originalPrice: 35100000,
    discount: 8,
    slug: 'oneplus-10-pro',
    brand: 'وان پلاس',
    brandSlug: 'oneplus',
  },
  {
    id: 6,
    title: 'گوشی موبایل هواوی P50 Pro',
    image: '/images/placeholders/product.svg',
    price: 29900000,
    originalPrice: 32500000,
    discount: 8,
    slug: 'huawei-p50-pro',
    brand: 'هواوی',
    brandSlug: 'huawei',
  }
];

export default function ComparePage() {
  const [products, setProducts] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // همه ویژگی‌های موجود برای مقایسه
  const allSpecs = [
    'حافظه داخلی',
    'رم',
    'رزولوشن دوربین',
    'اندازه صفحه نمایش',
    'نوع پردازنده',
    'ظرفیت باتری',
    'سیستم عامل',
    'رنگ‌ها'
  ];
  
  // پیدا کردن مقدار ویژگی برای هر محصول
  const getSpecValue = (product: typeof initialProducts[0], specName: string) => {
    const spec = product.specs.find(s => s.name === specName);
    return spec ? spec.value : '-';
  };
  
  // حذف محصول از لیست مقایسه
  const removeProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // افزودن محصول به لیست مقایسه
  const addProduct = (productId: number) => {
    const productToAdd = availableProducts.find(p => p.id === productId);
    if (productToAdd) {
      // در حالت واقعی، اطلاعات کامل محصول از API دریافت می‌شود
      const completeProduct = {
        ...productToAdd,
        rating: 4.5,
        reviewCount: 42,
        inStock: true,
        specs: [
          { name: 'حافظه داخلی', value: '128 گیگابایت' },
          { name: 'رم', value: '8 گیگابایت' },
          { name: 'رزولوشن دوربین', value: '50 مگاپیکسل' },
          { name: 'اندازه صفحه نمایش', value: '6.5 اینچ' },
          { name: 'نوع پردازنده', value: 'Snapdragon 8 Gen 1' },
          { name: 'ظرفیت باتری', value: '4500 میلی‌آمپر ساعت' },
          { name: 'سیستم عامل', value: 'Android 12' },
          { name: 'رنگ‌ها', value: 'مشکی، سفید، آبی' },
        ]
      };
      
      setProducts([...products, completeProduct]);
      setShowAddModal(false);
    }
  };
  
  // نمایش/مخفی کردن مدال افزودن محصول
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">مقایسه محصولات</span>
      </div>
      
      <h1 className="text-2xl font-bold mb-8">مقایسه محصولات</h1>
      
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">محصولی برای مقایسه وجود ندارد</h3>
          <p className="text-gray mb-6">لطفاً محصولاتی را برای مقایسه انتخاب کنید.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="p-4 text-right border-b border-r border-gray-100 bg-gray-50 min-w-[200px]">
                  <span className="font-bold">مشخصات محصول</span>
                </th>
                
                {products.map(product => (
                  <th key={product.id} className="p-4 text-center border-b border-r border-gray-100 min-w-[250px]">
                    <div className="relative">
                      <button 
                        onClick={() => removeProduct(product.id)}
                        className="absolute top-0 left-0 text-gray-400 hover:text-red-500"
                        title="حذف از مقایسه"
                      >
                        <BiX className="text-xl" />
                      </button>
                      
                      <div className="mb-4">
                        <Link href={`/product/${product.slug}`}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={150}
                            height={150}
                            className="mx-auto"
                          />
                        </Link>
                      </div>
                      
                      <Link 
                        href={`/product/${product.slug}`}
                        className="font-medium text-lg hover:text-primary line-clamp-2 h-14 block"
                      >
                        {product.title}
                      </Link>
                      
                      <div className="mt-2">
                        <Link 
                          href={`/brand/${product.brandSlug}`}
                          className="text-gray text-sm hover:text-primary"
                        >
                          {product.brand}
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-center mt-2">
                        <div className="flex items-center text-yellow-400">
                          <span>★</span>
                          <span className="text-sm mr-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray mr-2">({product.reviewCount} نظر)</span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="font-bold text-primary">{formatPrice(product.price)}</div>
                        {product.discount > 0 && (
                          <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        {product.inStock ? (
                          <Link 
                            href={`/product/${product.slug}`}
                            className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            <BiShoppingBag className="ml-1" />
                            افزودن به سبد
                          </Link>
                        ) : (
                          <button 
                            disabled
                            className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed w-full"
                          >
                            ناموجود
                          </button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                
                {/* Column for adding new product */}
                {products.length < 4 && (
                  <th className="p-4 text-center border-b border-r border-gray-100 min-w-[250px]">
                    <button 
                      onClick={toggleAddModal}
                      className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-primary transition-colors"
                    >
                      <BiPlus className="text-4xl text-gray-400 mb-3" />
                      <span className="text-gray-600">افزودن محصول برای مقایسه</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            
            <tbody>
              {/* ویژگی‌ها */}
              {allSpecs.map(specName => (
                <tr key={specName} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium border-r border-gray-100 bg-gray-50">
                    {specName}
                  </td>
                  
                  {products.map(product => (
                    <td key={`${product.id}-${specName}`} className="p-4 text-center border-r border-gray-100">
                      {getSpecValue(product, specName)}
                    </td>
                  ))}
                  
                  {/* Empty cell for add button column */}
                  {products.length < 4 && (
                    <td className="p-4 border-r border-gray-100"></td>
                  )}
                </tr>
              ))}
              
              {/* قیمت */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium border-r border-gray-100 bg-gray-50">
                  قیمت
                </td>
                
                {products.map(product => (
                  <td key={`${product.id}-price`} className="p-4 text-center border-r border-gray-100">
                    <div className="font-bold text-primary">{formatPrice(product.price)}</div>
                    {product.discount > 0 && (
                      <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
                    )}
                  </td>
                ))}
                
                {/* Empty cell for add button column */}
                {products.length < 4 && (
                  <td className="p-4 border-r border-gray-100"></td>
                )}
              </tr>
              
              {/* دکمه خرید */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium border-r border-gray-100 bg-gray-50">
                  خرید
                </td>
                
                {products.map(product => (
                  <td key={`${product.id}-buy`} className="p-4 text-center border-r border-gray-100">
                    {product.inStock ? (
                      <Link 
                        href={`/product/${product.slug}`}
                        className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        مشاهده و خرید
                      </Link>
                    ) : (
                      <button 
                        disabled
                        className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed w-full"
                      >
                        ناموجود
                      </button>
                    )}
                  </td>
                ))}
                
                {/* Empty cell for add button column */}
                {products.length < 4 && (
                  <td className="p-4 border-r border-gray-100"></td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal for adding products to compare */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">افزودن محصول به مقایسه</h2>
              <button 
                onClick={toggleAddModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <BiX className="text-2xl" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableProducts
                  .filter(p => !products.some(existingP => existingP.id === p.id))
                  .map(product => (
                    <div 
                      key={product.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => addProduct(product.id)}
                    >
                      <div className="mb-3">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={100}
                          height={100}
                          className="mx-auto"
                        />
                      </div>
                      
                      <h3 className="font-medium line-clamp-2 h-12 mb-2">{product.title}</h3>
                      
                      <div className="text-sm text-gray mb-2">{product.brand}</div>
                      
                      <div>
                        <div className="font-bold text-primary">{formatPrice(product.price)}</div>
                        {product.discount > 0 && (
                          <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
                        )}
                      </div>
                      
                      <button 
                        className="w-full mt-3 border border-primary text-primary hover:bg-primary/5 rounded-lg py-1 text-sm transition-colors"
                      >
                        افزودن به مقایسه
                      </button>
                    </div>
                  ))}
              </div>
              
              {availableProducts.filter(p => !products.some(existingP => existingP.id === p.id)).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray">محصول دیگری برای افزودن به مقایسه وجود ندارد.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}