'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const OrdersPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">سفارش‌های من</h1>
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm"
          >
            بازگشت به پروفایل
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* لیست سفارش‌ها */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">شماره سفارش</th>
                  <th scope="col" className="px-6 py-3">تاریخ</th>
                  <th scope="col" className="px-6 py-3">محصولات</th>
                  <th scope="col" className="px-6 py-3">مبلغ</th>
                  <th scope="col" className="px-6 py-3">وضعیت</th>
                  <th scope="col" className="px-6 py-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ORD-12345
                  </td>
                  <td className="px-6 py-4">
                    ۱۴۰۲/۰۲/۱۵
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 mr-2">
                        <Image 
                          src="/images/placeholders/product.svg" 
                          alt="محصول" 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <span>گوشی سامسونگ گلکسی S23 و ۲ محصول دیگر</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ۲,۵۰۰,۰۰۰ تومان
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      تحویل شده
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href="/profile/orders/12345" className="text-primary hover:text-primary/80">
                      مشاهده جزئیات
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ORD-12346
                  </td>
                  <td className="px-6 py-4">
                    ۱۴۰۲/۰۲/۰۸
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 mr-2">
                        <Image 
                          src="/images/placeholders/product.svg" 
                          alt="محصول" 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <span>لپ‌تاپ ایسوس</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ۱,۸۰۰,۰۰۰ تومان
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      در حال ارسال
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href="/profile/orders/12346" className="text-primary hover:text-primary/80">
                      مشاهده جزئیات
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ORD-12347
                  </td>
                  <td className="px-6 py-4">
                    ۱۴۰۲/۰۱/۲۰
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 mr-2">
                        <Image 
                          src="/images/placeholders/product.svg" 
                          alt="محصول" 
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <span>هدفون بلوتوثی اپل و ۱ محصول دیگر</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    ۳,۲۰۰,۰۰۰ تومان
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      تحویل شده
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href="/profile/orders/12347" className="text-primary hover:text-primary/80">
                      مشاهده جزئیات
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrdersPage;