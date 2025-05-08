
import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import { GET_PROFILE } from '@/lib/urql/queries/profile';
import { UPDATE_PROFILE } from '@/lib/urql/mutations/profile';

export default function Profile() {
  const [{ data, fetching }] = useQuery({ query: GET_PROFILE });
  const [updateResult, updateProfile] = useMutation(UPDATE_PROFILE);
  
  const [formData, setFormData] = useState({
    name: data?.profile?.name || '',
    email: data?.profile?.email || '',
    phone: data?.profile?.phone || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('پروفایل با موفقیت بروزرسانی شد');
    } catch (error) {
      alert('خطا در بروزرسانی پروفایل');
    }
  };

  if (fetching) return <div>در حال بارگذاری...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">ویرایش پروفایل</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">نام</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">ایمیل</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">تلفن</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={updateResult.fetching}
        >
          {updateResult.fetching ? 'در حال ارسال...' : 'بروزرسانی پروفایل'}
        </button>
      </form>
    </div>
  );
}
