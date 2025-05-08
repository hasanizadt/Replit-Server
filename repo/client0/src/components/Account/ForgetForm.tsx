
'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { SEND_RESET_PASSWORD_EMAIL } from '@/lib/urql/mutations/auth';

export default function ForgetForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendResetEmail] = useMutation(SEND_RESET_PASSWORD_EMAIL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await sendResetEmail({ email });
      
      if (error) {
        setMessage('خطا در ارسال ایمیل بازیابی رمز عبور');
        return;
      }
      
      setMessage('لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
      setEmail('');
    } catch (error) {
      setMessage('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">بازیابی رمز عبور</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ایمیل
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            required
          />
        </div>

        {message && (
          <div className="mb-4 text-center text-sm">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
        >
          ارسال لینک بازیابی
        </button>
      </form>
    </div>
  );
}
