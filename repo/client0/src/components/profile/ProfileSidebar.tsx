'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiUser, BiPackage, BiHeart, BiCommentDetail, BiCreditCard, BiHomeAlt, BiLogOut, BiMap, BiMessage } from 'react-icons/bi';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  label?: string;
}

export default function ProfileSidebar() {
  const pathname = usePathname();
  
  const menuItems: MenuItem[] = [
    {
      title: 'داشبورد',
      href: '/profile',
      icon: <BiHomeAlt className="text-xl" />
    },
    {
      title: 'اطلاعات شخصی',
      href: '/profile/information',
      icon: <BiUser className="text-xl" />
    },
    {
      title: 'سفارش‌های من',
      href: '/profile/orders',
      icon: <BiPackage className="text-xl" />,
      label: '۳'
    },
    {
      title: 'علاقه‌مندی‌ها',
      href: '/profile/wishlist',
      icon: <BiHeart className="text-xl" />,
      label: '۷'
    },
    {
      title: 'نظرات من',
      href: '/profile/comments',
      icon: <BiCommentDetail className="text-xl" />
    },
    {
      title: 'آدرس‌های من',
      href: '/profile/addresses',
      icon: <BiMap className="text-xl" />
    },
    {
      title: 'پیام‌های من',
      href: '/profile/messages',
      icon: <BiMessage className="text-xl" />,
      label: '۲'
    },
    {
      title: 'کارت‌های بانکی',
      href: '/profile/payment-methods',
      icon: <BiCreditCard className="text-xl" />
    }
  ];
  
  const handleLogout = () => {
    // در پروژه واقعی، اینجا باید فرایند خروج از حساب کاربری انجام شود
    console.log('Logging out...');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl ml-4">
          <BiUser />
        </div>
        <div>
          <h3 className="font-bold text-lg">محمد احمدی</h3>
          <p className="text-gray text-sm">0912****789</p>
        </div>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
              pathname === item.href 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <span className="ml-3">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            {item.label && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                pathname === item.href 
                  ? 'bg-white text-primary' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {item.label}
              </span>
            )}
          </Link>
        ))}
        
        <button 
          onClick={handleLogout}
          className="flex items-center w-full text-right py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-red-500"
        >
          <BiLogOut className="ml-3 text-xl" />
          خروج از حساب کاربری
        </button>
      </div>
    </div>
  );
}