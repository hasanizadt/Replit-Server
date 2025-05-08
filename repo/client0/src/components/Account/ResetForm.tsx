
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'urql';
import { RESET_PASSWORD } from '@/lib/urql/mutations/auth';

export default function ResetForm() {
  const router = useRouter();
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
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
      const { data, error: resetError } = await resetPassword({
        password: formData.password,
        token: new URLSearchParams(window.location.search).get('token')
      });

      if (resetError) {
        setError('خطا در بازیابی رمز عبور');
        return;
      }

      if (data?.resetPassword?.success) {
        router.push('/auth/login');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">تغییر رمز عبور</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            رمز عبور جدید
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
            تکرار رمز عبور جدید
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
          ثبت رمز عبور جدید
        </button>
      </form>
    </div>
  );
}
