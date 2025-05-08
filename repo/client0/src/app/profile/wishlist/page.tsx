'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const WishlistPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">لیست علاقه‌مندی‌ها</h1>
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm"
          >
            بازگشت به پروفایل
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* محصول ۱ */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <Image
                src="/images/placeholders/product.svg"
                alt="محصول"
                fill
                style={{ objectFit: 'contain' }}
              />
              <button className="absolute top-2 right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-xs text-white bg-primary px-2 py-1 rounded">موجود</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">گوشی سامسونگ گلکسی S23 Ultra</h3>
              <div className="text-gray-600 text-sm mb-2">
                <span>رنگ: مشکی | حافظه: 256 گیگابایت</span>
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-800">۴۵,۰۰۰,۰۰۰ تومان</span>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors text-sm">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* محصول ۲ */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <Image
                src="/images/placeholders/product.svg"
                alt="محصول"
                fill
                style={{ objectFit: 'contain' }}
              />
              <button className="absolute top-2 right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-xs text-white bg-primary px-2 py-1 rounded">موجود</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">لپ‌تاپ اپل مک‌بوک پرو</h3>
              <div className="text-gray-600 text-sm mb-2">
                <span>رنگ: نقره‌ای | پردازنده: M2 Pro</span>
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-800">۸۵,۰۰۰,۰۰۰ تومان</span>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors text-sm">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* محصول ۳ */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <Image
                src="/images/placeholders/product.svg"
                alt="محصول"
                fill
                style={{ objectFit: 'contain' }}
              />
              <button className="absolute top-2 right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-xs text-white bg-red-500 px-2 py-1 rounded">ناموجود</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">هدفون بی‌سیم اپل ایرپادز پرو ۲</h3>
              <div className="text-gray-600 text-sm mb-2">
                <span>رنگ: سفید</span>
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-800">۱۲,۵۰۰,۰۰۰ تومان</span>
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed text-sm">
                    ناموجود
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WishlistPage;