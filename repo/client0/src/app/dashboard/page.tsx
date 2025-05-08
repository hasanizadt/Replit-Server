
'use client';

import React from 'react';
import DashboardLayout from '@/components/Dashboard/Layout';
import Container from '@/components/common/Container';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <Container className="py-12">
      <DashboardLayout active="dashboard">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">داشبورد</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="font-bold mb-2">سفارشات</h3>
              <p className="text-2xl font-bold text-primary">۰</p>
            </div>
            
            <div className="bg-green-100 rounded-lg p-6">
              <h3 className="font-bold mb-2">امتیازات</h3>
              <p className="text-2xl font-bold text-green-600">۰</p>
            </div>
            
            <div className="bg-yellow-100 rounded-lg p-6">
              <h3 className="font-bold mb-2">علاقه‌مندی‌ها</h3>
              <p className="text-2xl font-bold text-yellow-600">۰</p>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-6">
              <h3 className="font-bold mb-2">درخواست‌های مرجوعی</h3>
              <p className="text-2xl font-bold text-blue-600">۰</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">اطلاعات حساب</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">نام کاربری:</p>
                  <p className="font-medium">{user?.username || 'کاربر'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">نام و نام خانوادگی:</p>
                  <p className="font-medium">{user?.fullName || 'کاربر'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">ایمیل:</p>
                  <p className="font-medium">{user?.email || 'کاربر@example.com'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">وضعیت حساب:</p>
                  <p className="font-medium text-green-600">فعال</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </Container>
  );
}
