
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FacebookLogin from './LoginForm/FacebookLogin';
import GoogleLogin from './LoginForm/GoogleLogin';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // اعتبارسنجی ابتدایی
      if (!formData.email || !formData.password) {
        setError('لطفاً ایمیل و رمز عبور را وارد کنید');
        return;
      }

      // برای محیط توسعه، از داده‌های نمونه استفاده می‌کنیم
      if (formData.email === 'user@example.com' && formData.password === 'password123') {
        const mockToken = `mock-token-${Date.now()}`;
        
        // ذخیره توکن در localStorage و cookie
        localStorage.setItem('token', mockToken);
        document.cookie = `token=${mockToken}; path=/; max-age=86400`; // اعتبار: 1 روز
        
        // ریدایرکت به پروفایل
        router.push('/profile');
        router.refresh(); // بروزرسانی برای اعمال تغییرات میدلویر
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('خطا در ورود به سیستم');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            رمز عبور
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
        >
          ورود
        </button>

        <div className="text-center text-sm">
          <Link href="/auth/forgot-password" className="text-primary hover:underline">
            فراموشی رمز عبور
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">یا</span>
          </div>
        </div>

        <div className="space-y-3">
          <GoogleLogin />
          <FacebookLogin />
        </div>

        <div className="text-center text-sm">
          حساب کاربری ندارید؟{' '}
          <Link href="/auth/register" className="text-primary hover:underline">
            ثبت نام کنید
          </Link>
        </div>
      </form>
    </div>
  );
}
