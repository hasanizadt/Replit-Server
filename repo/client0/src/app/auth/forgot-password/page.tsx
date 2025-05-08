'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call will be implemented here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">بازیابی رمز عبور</h1>

        {success ? (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              لینک بازیابی رمز عبور به ایمیل شما ارسال شد.
            </div>
            <Link href="/auth/login" className="text-primary hover:underline">
              بازگشت به صفحه ورود
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-primary hover:underline">
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}