'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/common/Container';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  // اگر کاربر قبلاً لاگین کرده باشد، او را به صفحه اصلی هدایت کن
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, returnUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username, password);
      // بعد از لاگین موفق، useEffect کاربر را به صفحه returnUrl هدایت خواهد کرد
    } catch (err) {
      console.error('خطا در ورود:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 min-h-[calc(100vh-200px)]">
        {/* فرم ورود */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">ورود به حساب کاربری</h1>
            <p className="text-gray-600">
              به فروشگاه آنلاین ما خوش آمدید
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-gray-700">نام کاربری</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="نام کاربری خود را وارد کنید"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-700">رمز عبور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="remember" className="mr-2 text-sm text-gray-600">
                  مرا به خاطر بسپار
                </label>
              </div>

              <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80">
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md text-white font-medium transition-colors 
                ${isSubmitting 
                  ? 'bg-primary/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  در حال ورود...
                </span>
              ) : 'ورود به حساب کاربری'}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                حساب کاربری ندارید؟{' '}
                <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                  ثبت‌نام کنید
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* بخش تبلیغاتی */}
        <div className="hidden md:flex flex-col bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 justify-center items-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">مزایای عضویت در فروشگاه ما</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              با عضویت در فروشگاه آنلاین ما از مزایای ویژه بهره‌مند شوید:
            </p>

            <ul className="space-y-3 text-right">
              <li className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>دسترسی به تخفیف‌های اختصاصی</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>پیگیری سفارش‌ها و تاریخچه خرید</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ذخیره سبد خرید و لیست علاقه‌مندی‌ها</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ارسال سریع و امکان پرداخت هنگام تحویل</span>
              </li>
            </ul>
          </div>

          <div className="relative w-64 h-64">
            <Image
              src="/images/placeholders/product-tablet.svg"
              alt="خرید آنلاین"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;