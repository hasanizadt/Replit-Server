
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from 'urql';
import { REGISTER } from '@/lib/urql/mutations/auth';

export default function RegForm() {
  const router = useRouter();
  const [register] = useMutation(REGISTER);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    try {
      const { data, error: registerError } = await register({
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }
      });

      if (registerError) {
        setError('خطا در ثبت نام. لطفا دوباره تلاش کنید');
        return;
      }

      if (data?.register?.token) {
        localStorage.setItem('token', data.register.token);
        router.push('/auth/verification');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">ثبت نام</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نام خانوادگی
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
        </div>

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

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تکرار رمز عبور
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
          ثبت نام
        </button>

        <div className="text-center text-sm">
          قبلاً ثبت نام کرده‌اید؟{' '}
          <Link href="/auth/login" className="text-primary hover:underline">
            وارد شوید
          </Link>
        </div>
      </form>
    </div>
  );
}
