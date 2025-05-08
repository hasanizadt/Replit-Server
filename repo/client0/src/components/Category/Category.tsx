
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SubCard from './SubCard';

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: Category[];
}

const categories: Category[] = [
  {
    id: '1',
    name: 'موبایل و تبلت',
    slug: 'mobile-tablets',
    image: '/images/placeholders/category-electronics.svg',
    subcategories: [
      { id: '1-1', name: 'گوشی موبایل', slug: 'mobile-phones' },
      { id: '1-2', name: 'تبلت', slug: 'tablets' },
      { id: '1-3', name: 'لوازم جانبی موبایل', slug: 'mobile-accessories' }
    ]
  },
  {
    id: '2',
    name: 'لپ تاپ و کامپیوتر',
    slug: 'laptops-computers',
    image: '/images/placeholders/category-electronics.svg',
    subcategories: [
      { id: '2-1', name: 'لپ تاپ', slug: 'laptops' },
      { id: '2-2', name: 'کامپیوتر رومیزی', slug: 'desktop-computers' },
      { id: '2-3', name: 'قطعات کامپیوتر', slug: 'computer-parts' }
    ]
  }
];

export default function Category() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold p-4 border-b">دسته‌بندی‌ها</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              href={`/category/${category.slug}`}
              className="block p-4 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.subcategories?.length} زیر دسته
                  </p>
                </div>
              </div>
            </Link>

            {activeCategory === category.id && category.subcategories && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2">
                <SubCard subcategories={category.subcategories} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
