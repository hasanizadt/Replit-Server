'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TopBrands: React.FC = () => {
  // داده‌های نمونه برای برندهای برتر
  const brands = [
    {
      id: 1,
      name: 'سامسونگ',
      image: '/images/placeholders/brand-samsung.svg',
      link: '/brand/samsung'
    },
    {
      id: 2,
      name: 'اپل',
      image: '/images/placeholders/brand-apple.svg',
      link: '/brand/apple'
    },
    {
      id: 3,
      name: 'شیائومی',
      image: '/images/placeholders/brand-xiaomi.svg',
      link: '/brand/xiaomi'
    },
    {
      id: 4,
      name: 'سونی',
      image: '/images/placeholders/brand-sony.svg',
      link: '/brand/sony'
    },
    {
      id: 5,
      name: 'ال جی',
      image: '/images/placeholders/brand-lg.svg',
      link: '/brand/lg'
    },
    {
      id: 6,
      name: 'هوآوی',
      image: '/images/placeholders/brand-huawei.svg',
      link: '/brand/huawei'
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={brand.link}
          className="flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(16.666%-20px)]"
        >
          <div className="relative w-20 h-20">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopBrands;