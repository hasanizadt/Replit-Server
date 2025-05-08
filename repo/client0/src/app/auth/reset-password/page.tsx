
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/common/Container';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('رمز عبور و تکرار آن باید یکسان باشند');
      return;
    }
    
    setLoading(true);
    try {
      // API call will be implemented here
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">تغییر رمز عبور</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">رمز عبور جدید</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-primary focus:border-primary"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block mb-1">تکرار رمز عبور جدید</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-primary focus:border-primary"
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره رمز عبور جدید'}
          </button>
        </form>
      </div>
    </Container>
  );
}
