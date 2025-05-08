'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const AddressesPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">آدرس‌های من</h1>
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm"
          >
            بازگشت به پروفایل
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="flex justify-end mb-6">
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm">
              افزودن آدرس جدید
            </button>
          </div>

          {/* لیست آدرس‌ها */}
          <div className="divide-y divide-gray-200">
            <div className="py-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">منزل</h3>
                  <p className="text-sm text-gray-600 mt-1">آدرس پیش‌فرض</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-primary hover:text-primary/80 text-sm">ویرایش</button>
                  <button className="text-red-500 hover:text-red-600 text-sm">حذف</button>
                </div>
              </div>
              <p className="text-gray-700">تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳</p>
              <p className="text-gray-700 mt-1">کد پستی: ۱۲۳۴۵۶۷۸۹۰</p>
              <p className="text-gray-700 mt-1">شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>

            <div className="py-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">محل کار</h3>
                </div>
                <div className="flex gap-2">
                  <button className="text-primary hover:text-primary/80 text-sm">ویرایش</button>
                  <button className="text-red-500 hover:text-red-600 text-sm">حذف</button>
                </div>
              </div>
              <p className="text-gray-700">تهران، خیابان شریعتی، ساختمان مرکزی، طبقه ۴، واحد ۸</p>
              <p className="text-gray-700 mt-1">کد پستی: ۹۸۷۶۵۴۳۲۱۰</p>
              <p className="text-gray-700 mt-1">شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddressesPage;