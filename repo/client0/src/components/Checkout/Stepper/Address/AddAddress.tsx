
'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { ADD_ADDRESS } from '@/lib/urql/mutations/address';

interface AddAddressProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddAddress({ onSuccess, onCancel }: AddAddressProps) {
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await addAddress({ input: formData });
      
      if (!error) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">افزودن آدرس جدید</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            عنوان آدرس
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            آدرس کامل
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              شهر
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              استان
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              کد پستی
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              شماره تماس
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            ثبت آدرس
          </button>
        </div>
      </form>
    </div>
  );
}
