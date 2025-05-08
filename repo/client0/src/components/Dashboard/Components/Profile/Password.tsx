
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { CHANGE_PASSWORD } from '@/lib/urql/mutations/auth';

export default function Password() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [changePasswordResult, changePassword] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارند');
      return;
    }
    
    try {
      await changePassword({ oldPassword, newPassword });
      alert('رمز عبور با موفقیت تغییر کرد');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert('خطا در تغییر رمز عبور');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">تغییر رمز عبور</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">رمز عبور فعلی</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2">رمز عبور جدید</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2">تکرار رمز عبور جدید</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={changePasswordResult.fetching}
        >
          {changePasswordResult.fetching ? 'در حال ارسال...' : 'تغییر رمز عبور'}
        </button>
      </form>
    </div>
  );
}
