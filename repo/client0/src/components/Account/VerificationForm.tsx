'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'urql';
import { VERIFY_EMAIL } from '@/lib/urql/mutations/auth';

export default function VerificationForm() {
  const router = useRouter();
  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error: verifyError } = await verifyEmail({ code });

      if (verifyError) {
        setError('کد تایید نامعتبر است');
        return;
      }

      if (data?.verifyEmail?.success) {
        router.push('/profile');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">تایید حساب کاربری</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            کد تایید
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
          تایید
        </button>
      </form>
    </div>
  );
}