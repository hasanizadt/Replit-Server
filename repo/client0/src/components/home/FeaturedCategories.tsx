'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCategories: React.FC = () => {
  // داده‌های نمونه دسته‌بندی‌ها
  const categories = [
    {
      id: 1,
      name: 'الکترونیک',
      image: '/images/placeholders/category-electronics.svg',
      itemCount: 120,
      link: '/category/electronics'
    },
    {
      id: 2,
      name: 'پوشاک',
      image: '/images/placeholders/category-fashion.svg',
      itemCount: 250,
      link: '/category/fashion'
    },
    {
      id: 3,
      name: 'لوازم خانگی',
      image: '/images/placeholders/category-home.svg',
      itemCount: 180,
      link: '/category/home'
    },
    {
      id: 4,
      name: 'زیبایی و سلامت',
      image: '/images/placeholders/category-beauty.svg',
      itemCount: 150,
      link: '/category/beauty'
    },
    {
      id: 5,
      name: 'ورزشی',
      image: '/images/placeholders/category-sports.svg',
      itemCount: 90,
      link: '/category/sports'
    },
    {
      id: 6,
      name: 'کتاب و لوازم التحریر',
      image: '/images/placeholders/category-books.svg',
      itemCount: 110,
      link: '/category/books'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.link}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={category.image}
              alt={category.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h3 className="mt-3 text-center font-semibold">{category.name}</h3>
          <p className="mt-1 text-xs text-gray">{category.itemCount} کالا</p>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCategories;