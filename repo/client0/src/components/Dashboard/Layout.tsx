'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
  active?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, active = 'dashboard' }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { name: 'داشبورد', path: '/dashboard', id: 'dashboard' },
    { name: 'سفارش‌ها', path: '/profile/orders', id: 'orders' },
    { name: 'علاقه‌مندی‌ها', path: '/profile/wishlist', id: 'wishlist' },
    { name: 'آدرس‌ها', path: '/profile/addresses', id: 'addresses' },
    { name: 'پروفایل', path: '/profile', id: 'profile' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* سایدبار */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center md:text-right mb-6">
            <h2 className="font-bold text-lg">{user?.fullName || 'کاربر'}</h2>
            <p className="text-gray-600 text-sm mt-1">{user?.email || 'کاربر@example.com'}</p>
          </div>
          
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link 
                  href={item.path}
                  className={`block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                    active === item.id || pathname === item.path 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-200 mt-4 pt-4">
              <button 
                onClick={logout}
                className="block w-full text-right px-4 py-2 rounded-md hover:bg-red-50 transition-colors text-red-600"
              >
                خروج از حساب کاربری
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className="md:col-span-3">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;