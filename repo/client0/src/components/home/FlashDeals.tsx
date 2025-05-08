'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FlashDeals: React.FC = () => {
  // داده‌های نمونه برای نمایش پیشنهادات شگفت‌انگیز
  const deals = [
    {
      id: 1,
      title: 'هدفون بی‌سیم مدل WH-1000XM4',
      image: '/images/placeholders/product-headphones.svg',
      price: 2_800_000,
      discountedPrice: 1_950_000,
      discountPercent: 30,
      link: '/product/wireless-headphones'
    },
    {
      id: 2,
      title: 'اسپیکر بلوتوثی قابل حمل',
      image: '/images/placeholders/product-speaker.svg',
      price: 1_500_000,
      discountedPrice: 950_000,
      discountPercent: 37,
      link: '/product/portable-speaker'
    },
    {
      id: 3,
      title: 'ساعت هوشمند سری 7',
      image: '/images/placeholders/product-watch.svg',
      price: 3_200_000,
      discountedPrice: 2_560_000,
      discountPercent: 20,
      link: '/product/smart-watch'
    },
    {
      id: 4,
      title: 'دوربین دیجیتال حرفه‌ای',
      image: '/images/placeholders/product-camera.svg',
      price: 5_500_000,
      discountedPrice: 4_400_000,
      discountPercent: 20,
      link: '/product/digital-camera'
    }
  ];

  // تابع برای فرمت کردن قیمت‌ها به تومان
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <Link
          key={deal.id}
          href={deal.link}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* بج تخفیف */}
          <div className="relative pt-[100%]">
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded z-10">
              {deal.discountPercent}٪ تخفیف
            </div>
            <div className="absolute inset-0 p-6">
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-secondary line-clamp-2 h-12">
              {deal.title}
            </h3>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray line-through text-sm">
                  {formatPrice(deal.price)}
                </span>
                <span className="bg-red-100 text-primary text-xs px-2 py-1 rounded">
                  {deal.discountPercent}٪-
                </span>
              </div>
              
              <div className="mt-1 font-bold text-lg text-secondary">
                {formatPrice(deal.discountedPrice)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FlashDeals;