
'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { CREATE_PREORDER } from '@/lib/urql/mutations/order';

export default function PreorderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productLink: '',
    description: ''
  });

  const [{ fetching }, createPreorder] = useMutation(CREATE_PREORDER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPreorder({ input: formData });
      setFormData({
        name: '',
        email: '',
        phone: '',
        productLink: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting pre-order:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">ثبت سفارش ویژه</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">نام و نام خانوادگی</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">ایمیل</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">شماره تماس</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">لینک محصول</label>
          <input
            type="url"
            value={formData.productLink}
            onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">توضیحات</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded p-2 h-32"
          />
        </div>
        
        <button
          type="submit"
          disabled={fetching}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors"
        >
          {fetching ? 'در حال ارسال...' : 'ثبت سفارش'}
        </button>
      </form>
    </div>
  );
}
