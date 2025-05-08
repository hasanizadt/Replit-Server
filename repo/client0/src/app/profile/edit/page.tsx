'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const EditProfilePage = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
    phone: '09123456789',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // در یک پیاده‌سازی واقعی، اینجا اطلاعات به API ارسال می‌شود
    alert('اطلاعات پروفایل با موفقیت بروزرسانی شد');
  };

  return (
    <Container>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">ویرایش پروفایل</h1>
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm"
          >
            بازگشت به پروفایل
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-gray-100 rounded-full p-2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/images/placeholders/avatar.svg"
                    alt="تصویر کاربر"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <button className="text-primary hover:text-primary/80 text-sm">
                    تغییر تصویر
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* نام و نام خانوادگی */}
                    <div>
                      <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-700">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    {/* ایمیل */}
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    {/* نام کاربری */}
                    <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
                        نام کاربری
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    {/* شماره موبایل */}
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                        شماره موبایل
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8 mb-4">
                    <h3 className="font-bold text-gray-800 mb-4">تغییر رمز عبور</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* رمز عبور فعلی */}
                      <div>
                        <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-700">
                          رمز عبور فعلی
                        </label>
                        <input
                          type="password"
                          id="oldPassword"
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      {/* رمز عبور جدید */}
                      <div>
                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
                          رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      {/* تایید رمز عبور جدید */}
                      <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                          تأیید رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      ذخیره تغییرات
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditProfilePage;