'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '../common/Container';
import { BiMenu, BiX, BiSearch, BiCart, BiUser, BiLogIn, BiLogOut } from 'react-icons/bi';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            فروشگاه آنلاین
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link href="/" className="hover:text-primary">
              صفحه اصلی
            </Link>
            <Link href="/products" className="hover:text-primary">
              محصولات
            </Link>
            <Link href="/categories" className="hover:text-primary">
              دسته‌بندی‌ها
            </Link>
            <Link href="/brands" className="hover:text-primary">
              برندها
            </Link>
            <Link href="/blog" className="hover:text-primary">
              وبلاگ
            </Link>
            <Link href="/contact" className="hover:text-primary">
              تماس با ما
            </Link>
          </nav>
          
          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BiSearch className="text-xl" />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <BiCart className="text-xl" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full flex items-center">
                  <BiUser className="text-xl mr-1" />
                  <span className="text-sm hidden md:inline">{user?.username}</span>
                </Link>
                <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    حساب کاربری
                  </Link>
                  <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    داشبورد
                  </Link>
                  <Link href="/profile/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    سفارش‌های من
                  </Link>
                  <Link href="/profile/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    لیست علاقه‌مندی‌ها
                  </Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-right px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <BiLogOut className="inline ml-1" />
                    خروج از حساب
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 hover:bg-gray-100 rounded-full flex items-center">
                <BiLogIn className="text-xl ml-1" />
                <span className="text-sm hidden md:inline">ورود / ثبت‌نام</span>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 md:hidden hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <BiX className="text-2xl" /> : <BiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Container>
            <nav className="flex flex-col py-4">
              <Link href="/" className="py-2 hover:text-primary">
                صفحه اصلی
              </Link>
              <Link href="/products" className="py-2 hover:text-primary">
                محصولات
              </Link>
              <Link href="/categories" className="py-2 hover:text-primary">
                دسته‌بندی‌ها
              </Link>
              <Link href="/brands" className="py-2 hover:text-primary">
                برندها
              </Link>
              <Link href="/blog" className="py-2 hover:text-primary">
                وبلاگ
              </Link>
              <Link href="/contact" className="py-2 hover:text-primary">
                تماس با ما
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="py-2 hover:text-primary">
                    حساب کاربری من
                  </Link>
                  <Link href="/dashboard" className="py-2 hover:text-primary">
                    داشبورد
                  </Link>
                  <button 
                    onClick={logout} 
                    className="py-2 text-right text-red-600 hover:text-red-700"
                  >
                    خروج از حساب
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="py-2 text-primary hover:text-primary/80">
                  ورود / ثبت‌نام
                </Link>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;