'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import ProductCard from '@/components/products/ProductCard';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils';
import { 
  BiChevronLeft, 
  BiMinus, 
  BiPlus, 
  BiHeart, 
  BiShareAlt, 
  BiCheck, 
  BiDetail,
  BiShoppingBag,
  BiChat,
  BiStar,
  BiStore,
  BiShield,
  BiPackage,
  BiCreditCard
} from 'react-icons/bi';

// نمونه داده (در پروژه واقعی از API دریافت می‌شود)
const mockProduct = {
  id: 1,
  title: 'گوشی موبایل اپل مدل iPhone 14 Pro Max دو سیم کارت ظرفیت 256 گیگابایت و رم 6 گیگابایت',
  slug: 'apple-iphone-14-pro-max',
  price: 65800000,
  originalPrice: 69500000,
  description: 'آیفون ۱۴ پرو مکس، پرچمدار جدید اپل با نمایشگر ۶.۷ اینچی Super Retina XDR و فناوری پرومکشن برای رفرش ریت ۱۲۰ هرتز، دارای سیستم دوربین حرفه‌ای با سنسور اصلی ۴۸ مگاپیکسلی، پردازنده قدرتمند A16 Bionic، باتری با طول عمر بالا و قابلیت شارژ سریع است. این گوشی با سیستم عامل iOS 16 و قابلیت‌های امنیتی پیشرفته، یک انتخاب ایده‌آل برای کاربران حرفه‌ای است.',
  brand: 'اپل',
  brandSlug: 'apple',
  category: 'گوشی موبایل',
  categorySlug: 'mobile-phones',
  rating: 4.9,
  reviewCount: 253,
  inStock: true,
  images: [
    '/images/placeholders/product.svg',
    '/images/placeholders/product.svg',
    '/images/placeholders/product.svg',
    '/images/placeholders/product.svg',
  ],
  colors: [
    { id: 1, name: 'مشکی', code: '#000000' },
    { id: 2, name: 'نقره‌ای', code: '#C0C0C0' },
    { id: 3, name: 'طلایی', code: '#FFD700' },
    { id: 4, name: 'آبی', code: '#0000FF' },
  ],
  storage: [
    { id: 1, name: '128 گیگابایت', extraPrice: -5000000 },
    { id: 2, name: '256 گیگابایت', extraPrice: 0 },
    { id: 3, name: '512 گیگابایت', extraPrice: 8500000 },
    { id: 4, name: '1 ترابایت', extraPrice: 18000000 },
  ],
  warranty: [
    { id: 1, name: 'گارانتی 18 ماهه شرکتی' },
    { id: 2, name: 'گارانتی 24 ماهه' },
  ],
  features: [
    { title: 'پردازنده', value: 'A16 Bionic' },
    { title: 'حافظه داخلی', value: '256 گیگابایت' },
    { title: 'رم', value: '6 گیگابایت' },
    { title: 'دوربین اصلی', value: '48 مگاپیکسل' },
    { title: 'دوربین سلفی', value: '12 مگاپیکسل' },
    { title: 'باتری', value: '4323 میلی‌آمپر ساعت' },
  ],
  tags: ['گوشی موبایل', 'اپل', 'آیفون', 'پرچمدار', 'دوربین حرفه‌ای']
};

// محصولات مشابه
const relatedProducts = [
  {
    id: 2,
    title: 'گوشی موبایل اپل مدل iPhone 14 Pro دو سیم کارت',
    slug: 'apple-iphone-14-pro',
    price: 58900000,
    originalPrice: 62500000,
    image: '/images/placeholders/product.svg',
    brand: 'اپل',
    brandSlug: 'apple',
    rating: 4.8,
    reviewCount: 124,
    inStock: true
  },
  {
    id: 3,
    title: 'گوشی موبایل سامسونگ مدل Galaxy S23 Ultra دو سیم کارت',
    slug: 'samsung-galaxy-s23-ultra',
    price: 53500000,
    originalPrice: 58900000,
    image: '/images/placeholders/product.svg',
    brand: 'سامسونگ',
    brandSlug: 'samsung',
    rating: 4.8,
    reviewCount: 201,
    inStock: true
  },
  {
    id: 4,
    title: 'گوشی موبایل شیائومی مدل 13 Ultra دو سیم کارت',
    slug: 'xiaomi-13-ultra',
    price: 48700000,
    originalPrice: 52300000,
    image: '/images/placeholders/product.svg',
    brand: 'شیائومی',
    brandSlug: 'xiaomi',
    rating: 4.6,
    reviewCount: 72,
    inStock: true
  },
  {
    id: 5,
    title: 'گوشی موبایل گوگل مدل Pixel 7 Pro دو سیم کارت',
    slug: 'google-pixel-7-pro',
    price: 38500000,
    originalPrice: 42800000,
    image: '/images/placeholders/product.svg',
    brand: 'گوگل',
    brandSlug: 'google',
    rating: 4.7,
    reviewCount: 53,
    inStock: false
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  // استخراج اسلاگ محصول از پارامترهای URL
  const { slug } = params;
  
  // در پروژه واقعی، از اسلاگ برای دریافت اطلاعات محصول از API استفاده می‌شود
  // برای نمایش، از داده‌های نمونه استفاده می‌کنیم
  const product = mockProduct;
  
  // وضعیت برای مدیریت گالری تصاویر
  const [activeImage, setActiveImage] = useState(0);
  
  // وضعیت برای مدیریت انتخاب‌های کاربر
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(2); // پیش‌فرض: 256 گیگابایت
  const [selectedWarranty, setSelectedWarranty] = useState<number | null>(1);
  
  // وضعیت برای تب‌های محصول
  const [activeTab, setActiveTab] = useState('description');
  
  // محاسبه قیمت نهایی با توجه به گزینه‌های انتخاب شده
  const calculateFinalPrice = () => {
    let finalPrice = product.price;
    
    // اضافه کردن قیمت حافظه
    if (selectedStorage) {
      const storage = product.storage.find(s => s.id === selectedStorage);
      if (storage) {
        finalPrice += storage.extraPrice;
      }
    }
    
    return finalPrice * quantity;
  };
  
  // کنترل تغییر تعداد محصول
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };
  
  // محاسبه درصد تخفیف
  const discount = calculateDiscountPercentage(product.originalPrice, product.price);

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6 flex-wrap">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <Link href="/products" className="hover:text-primary">
          محصولات
        </Link>
        <BiChevronLeft className="mx-2" />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-primary">
          {product.category}
        </Link>
        <BiChevronLeft className="mx-2" />
        <Link href={`/brand/${product.brandSlug}`} className="hover:text-primary">
          {product.brand}
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500 truncate">{product.title}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images Gallery */}
            <div>
              <div className="mb-4 relative aspect-square">
                <Image
                  src={product.images[activeImage]}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
                
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm rounded-full w-12 h-12 flex items-center justify-center">
                    <span>{discount}٪-</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-reverse space-x-2 overflow-x-auto scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 border ${
                      activeImage === index 
                        ? 'border-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    } rounded-lg overflow-hidden flex-shrink-0`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${product.title} - تصویر ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400">
                  <span>★</span>
                  <span className="text-sm mr-1">{product.rating}</span>
                </div>
                <span className="text-sm text-gray mr-2 border-l border-gray-200 pl-2">
                  ({product.reviewCount} نظر)
                </span>
                <Link 
                  href={`/brand/${product.brandSlug}`}
                  className="text-sm text-primary hover:underline mr-2"
                >
                  {product.brand}
                </Link>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="ml-2 text-sm text-gray">قیمت:</div>
                  <div className="flex items-center">
                    <div className="font-bold text-xl text-primary">
                      {formatPrice(calculateFinalPrice())}
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="text-gray line-through mr-2">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mb-6">
                {/* Colors Selection */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">رنگ: {selectedColor ? product.colors.find(c => c.id === selectedColor)?.name : 'انتخاب کنید'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedColor === color.id
                              ? 'ring-2 ring-primary ring-offset-2'
                              : 'ring-1 ring-gray-200'
                          }`}
                          title={color.name}
                        >
                          <span 
                            className="w-8 h-8 rounded-full block"
                            style={{ backgroundColor: color.code }}
                          ></span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Storage Selection */}
                {product.storage.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">حافظه داخلی:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.storage.map(storage => (
                        <button
                          key={storage.id}
                          onClick={() => setSelectedStorage(storage.id)}
                          className={`px-4 py-2 rounded-lg ${
                            selectedStorage === storage.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {storage.name}
                          {storage.extraPrice !== 0 && (
                            <span className="block text-xs mt-1">
                              {storage.extraPrice > 0 
                                ? `+ ${formatPrice(storage.extraPrice)}` 
                                : `- ${formatPrice(Math.abs(storage.extraPrice))}`
                              }
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Warranty Selection */}
                {product.warranty.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">گارانتی:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.warranty.map(warranty => (
                        <button
                          key={warranty.id}
                          onClick={() => setSelectedWarranty(warranty.id)}
                          className={`px-4 py-2 rounded-lg ${
                            selectedWarranty === warranty.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {warranty.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">تعداد:</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className={`w-10 h-10 rounded-l-lg flex items-center justify-center border border-gray-200 ${
                        quantity <= 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <BiMinus />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max="5"
                      className="w-14 h-10 border-y border-gray-200 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 5}
                      className={`w-10 h-10 rounded-r-lg flex items-center justify-center border border-gray-200 ${
                        quantity >= 5 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <BiPlus />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  disabled={!product.inStock || !selectedColor || !selectedStorage || !selectedWarranty}
                  className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center ${
                    !product.inStock || !selectedColor || !selectedStorage || !selectedWarranty
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                >
                  <BiShoppingBag className="ml-2 text-xl" />
                  {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </button>
                
                <button className="flex-none w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <BiHeart className="text-xl" />
                </button>
                
                <button className="flex-none w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <BiShareAlt className="text-xl" />
                </button>
              </div>
              
              {/* Messages for incomplete selections */}
              {product.inStock && (!selectedColor || !selectedStorage || !selectedWarranty) && (
                <div className="mt-4 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                  لطفاً 
                  {!selectedColor && ' رنگ '}
                  {!selectedColor && !selectedStorage && ' و '}
                  {!selectedStorage && ' حافظه داخلی '}
                  {(!selectedColor || !selectedStorage) && !selectedWarranty && ' و '}
                  {!selectedWarranty && ' گارانتی '}
                  مورد نظر خود را انتخاب کنید.
                </div>
              )}
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray ml-2">برچسب‌ها:</span>
                  {product.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/products?tag=${tag}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
          <BiShield className="text-3xl text-primary mb-2" />
          <h3 className="font-medium text-sm mb-1">گارانتی اصالت کالا</h3>
          <p className="text-xs text-gray">تضمین اصالت و کیفیت محصول</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
          <BiPackage className="text-3xl text-primary mb-2" />
          <h3 className="font-medium text-sm mb-1">تحویل سریع</h3>
          <p className="text-xs text-gray">ارسال رایگان برای خرید‌های بالای ۵۰۰ هزار تومان</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
          <BiCreditCard className="text-3xl text-primary mb-2" />
          <h3 className="font-medium text-sm mb-1">پرداخت امن</h3>
          <p className="text-xs text-gray">پرداخت مطمئن و امن با درگاه معتبر</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
          <BiStore className="text-3xl text-primary mb-2" />
          <h3 className="font-medium text-sm mb-1">پشتیبانی ۲۴/۷</h3>
          <p className="text-xs text-gray">پاسخگویی در تمام ساعات شبانه روز</p>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BiDetail className="inline-block ml-1" />
              توضیحات محصول
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BiCheck className="inline-block ml-1" />
              مشخصات فنی
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BiChat className="inline-block ml-1" />
              نظرات کاربران ({product.reviewCount})
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <div className="max-w-3xl leading-7">
              <p className="mb-4">{product.description}</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <tbody>
                  {product.features.map((feature, index) => (
                    <tr 
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : ''}
                    >
                      <td className="py-3 px-4 border border-gray-100 font-medium w-1/3">
                        {feature.title}
                      </td>
                      <td className="py-3 px-4 border border-gray-100">
                        {feature.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-full md:w-64 bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{product.rating}</div>
                  <div className="flex justify-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <BiStar 
                        key={i}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray mb-4">از {product.reviewCount} نظر</div>
                  <Link
                    href="#add-review"
                    className="block bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    نظر خود را ثبت کنید
                  </Link>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="ml-2 w-24 text-xs">عالی (۵ ستاره)</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                      </div>
                      <div className="mr-2 text-xs text-gray-500">۷۵٪</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="ml-2 w-24 text-xs">خیلی خوب (۴ ستاره)</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: '15%' }}></div>
                      </div>
                      <div className="mr-2 text-xs text-gray-500">۱۵٪</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="ml-2 w-24 text-xs">متوسط (۳ ستاره)</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: '7%' }}></div>
                      </div>
                      <div className="mr-2 text-xs text-gray-500">۷٪</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="ml-2 w-24 text-xs">ضعیف (۲ ستاره)</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: '2%' }}></div>
                      </div>
                      <div className="mr-2 text-xs text-gray-500">۲٪</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="ml-2 w-24 text-xs">خیلی بد (۱ ستاره)</div>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '1%' }}></div>
                      </div>
                      <div className="mr-2 text-xs text-gray-500">۱٪</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                {/* Sample Reviews - در پروژه واقعی از API دریافت می‌شود */}
                <div className="space-y-6">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">محمد احمدی</div>
                      <div className="text-xs text-gray">۲۳ اردیبهشت ۱۴۰۲</div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">
                      {[...Array(5)].map((_, i) => (
                        <BiStar key={i} className={i < 5 ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <p className="text-sm mb-2">عالی و بی‌نظیر. راضی هستم از خرید. کیفیت ساخت و دوربین فوق‌العاده است. عمر باتری هم خوبه.</p>
                    <div className="flex items-center mt-4">
                      <div className="text-xs text-gray-500 ml-2">آیا این نظر مفید بود؟</div>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full ml-2">بله (۱۲)</button>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full">خیر (۲)</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">سارا محمدی</div>
                      <div className="text-xs text-gray">۱۵ اردیبهشت ۱۴۰۲</div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">
                      {[...Array(5)].map((_, i) => (
                        <BiStar key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <p className="text-sm mb-2">خیلی راضی هستم اما قیمتش بالاست. کیفیت دوربین عالیه و سرعت پردازنده خوبه. فقط باتری میتونست بهتر باشه.</p>
                    <div className="flex items-center mt-4">
                      <div className="text-xs text-gray-500 ml-2">آیا این نظر مفید بود؟</div>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full ml-2">بله (۸)</button>
                      <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full">خیر (۱)</button>
                    </div>
                  </div>
                </div>
                
                {/* Add Review Form */}
                <div id="add-review" className="mt-8">
                  <h3 className="text-lg font-bold mb-4">ثبت نظر</h3>
                  <form>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm">امتیاز شما</label>
                      <div className="flex text-gray-300 text-xl">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className="mr-1 focus:outline-none"
                          >
                            <BiStar />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm">نام</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm">ایمیل</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="review" className="block mb-2 text-sm">نظر شما</label>
                      <textarea
                        id="review"
                        rows={4}
                        className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      ثبت نظر
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">محصولات مشابه</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <ProductCard 
              key={product.id}
              {...product}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}