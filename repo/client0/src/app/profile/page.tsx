'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-2xl font-bold mb-8">حساب کاربری من</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* اطلاعات کاربر */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="bg-gray-100 rounded-full p-2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/images/placeholders/avatar.svg"
                    alt={user?.fullName || 'تصویر کاربر'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-right">
                <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  <button 
                    onClick={logout}
                    className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 transition-colors rounded-md text-sm">
                    خروج از حساب کاربری
                  </button>
                  <Link 
                    href="/profile/edit" 
                    className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors rounded-md text-sm">
                    ویرایش پروفایل
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-md text-sm">
                    ورود به داشبورد
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* داشبورد کاربر */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
            <div className="p-6 border-b md:border-b-0 md:border-l border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">سفارش‌های من</h3>
              <p className="text-gray-600 mb-4 text-sm">لیست سفارش‌های قبلی و پیگیری آنها</p>
              <Link 
                href="/profile/orders" 
                className="text-primary hover:text-primary/80 text-sm font-medium">
                مشاهده سفارش‌ها
              </Link>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-l border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">آدرس‌های من</h3>
              <p className="text-gray-600 mb-4 text-sm">مدیریت آدرس‌های ارسال سفارش</p>
              <Link 
                href="/profile/addresses" 
                className="text-primary hover:text-primary/80 text-sm font-medium">
                مدیریت آدرس‌ها
              </Link>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">لیست علاقه‌مندی‌ها</h3>
              <p className="text-gray-600 mb-4 text-sm">محصولاتی که ذخیره کرده‌اید</p>
              <Link 
                href="/profile/wishlist" 
                className="text-primary hover:text-primary/80 text-sm font-medium">
                مشاهده لیست علاقه‌مندی‌ها
              </Link>
            </div>
          </div>

          {/* بخش آخرین سفارش‌ها */}
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4">آخرین سفارش‌ها</h3>
            <div className="relative overflow-x-auto rounded-md border border-gray-200">
              <table className="w-full text-sm text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">شماره سفارش</th>
                    <th scope="col" className="px-6 py-3">تاریخ</th>
                    <th scope="col" className="px-6 py-3">مبلغ</th>
                    <th scope="col" className="px-6 py-3">وضعیت</th>
                    <th scope="col" className="px-6 py-3">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      ORD-12345
                    </td>
                    <td className="px-6 py-4">
                      ۱۴۰۲/۰۲/۱۵
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
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      ORD-12346
                    </td>
                    <td className="px-6 py-4">
                      ۱۴۰۲/۰۲/۰۸
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;