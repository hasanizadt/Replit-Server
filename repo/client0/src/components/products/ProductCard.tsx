import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils';
import { BiHeart, BiShoppingBag, BiSlider } from 'react-icons/bi';

interface ProductCardProps {
  id: number;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  brandSlug: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  hasQuickView?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
}

export default function ProductCard({
  id,
  title,
  slug,
  price,
  originalPrice,
  image,
  brand,
  brandSlug,
  rating,
  reviewCount,
  inStock,
  isNew = false,
  hasQuickView = true,
  variant = 'default',
  className = '',
}: ProductCardProps) {
  const discount = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
  
  // حالت افقی
  if (variant === 'horizontal') {
    return (
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}>
        <div className="flex">
          <div className="relative w-1/3">
            <Link href={`/product/${slug}`} className="block">
              <Image
                src={image}
                alt={title}
                width={120}
                height={120}
                className="object-contain w-full h-full"
              />
            </Link>
            
            {discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-10 h-10 flex items-center justify-center">
                <span>{discount}٪-</span>
              </div>
            )}
            
            {isNew && !discount && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                جدید
              </div>
            )}
          </div>
          
          <div className="w-2/3 p-4">
            <Link 
              href={`/brand/${brandSlug}`}
              className="text-xs text-gray mb-1 block hover:text-primary"
            >
              {brand}
            </Link>
            
            <Link href={`/product/${slug}`} className="block">
              <h3 className="font-medium mb-2 hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
            </Link>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-400">
                <span>★</span>
                <span className="text-xs mr-1">{rating}</span>
              </div>
              <span className="text-xs text-gray mr-2">({reviewCount} نظر)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-primary">{formatPrice(price)}</div>
                {originalPrice && (
                  <div className="text-gray text-xs line-through">{formatPrice(originalPrice)}</div>
                )}
              </div>
              
              <div className="flex space-x-reverse space-x-2">
                <button 
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors"
                  aria-label="افزودن به علاقه‌مندی‌ها"
                >
                  <BiHeart />
                </button>
                
                <button 
                  disabled={!inStock}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    inStock 
                      ? 'bg-primary hover:bg-primary/90 text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="افزودن به سبد خرید"
                >
                  <BiShoppingBag />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // حالت فشرده
  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}>
        <div className="relative p-2">
          <Link href={`/product/${slug}`} className="block">
            <Image
              src={image}
              alt={title}
              width={100}
              height={100}
              className="object-contain mx-auto"
            />
          </Link>
          
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
              <span>{discount}٪-</span>
            </div>
          )}
          
          {isNew && !discount && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              جدید
            </div>
          )}
        </div>
        
        <div className="p-3">
          <Link href={`/product/${slug}`} className="block">
            <h3 className="text-sm font-medium mb-1 hover:text-primary transition-colors line-clamp-2 h-10">
              {title}
            </h3>
          </Link>
          
          <div className="mt-auto">
            <div className="font-bold text-primary text-sm">{formatPrice(price)}</div>
            {originalPrice && (
              <div className="text-gray text-xs line-through">{formatPrice(originalPrice)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // حالت پیش‌فرض
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <div className="relative p-4">
        <Link href={`/product/${slug}`} className="block">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-contain mx-auto"
          />
        </Link>
        
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs rounded-full w-10 h-10 flex items-center justify-center">
            <span>{discount}٪-</span>
          </div>
        )}
        
        {isNew && !discount && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            جدید
          </div>
        )}

        <div className="absolute top-4 left-4 space-y-2">
          <button 
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:text-red-500 transition-colors"
            aria-label="افزودن به علاقه‌مندی‌ها"
          >
            <BiHeart />
          </button>
          
          {hasQuickView && (
            <button 
              className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:text-primary transition-colors"
              aria-label="مشاهده سریع"
            >
              <BiSlider />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <Link 
          href={`/brand/${brandSlug}`}
          className="text-xs text-gray mb-1 block hover:text-primary"
        >
          {brand}
        </Link>
        
        <Link href={`/product/${slug}`} className="block">
          <h3 className="font-medium mb-2 hover:text-primary transition-colors line-clamp-2 h-12">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <span>★</span>
            <span className="text-xs mr-1">{rating}</span>
          </div>
          <span className="text-xs text-gray mr-2">({reviewCount} نظر)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-primary">{formatPrice(price)}</div>
            {originalPrice && (
              <div className="text-gray text-xs line-through">{formatPrice(originalPrice)}</div>
            )}
          </div>
          
          <button 
            disabled={!inStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              inStock 
                ? 'bg-primary hover:bg-primary/90 text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="افزودن به سبد خرید"
          >
            <BiShoppingBag />
          </button>
        </div>
      </div>
    </div>
  );
}