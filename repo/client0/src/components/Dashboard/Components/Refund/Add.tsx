
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { CREATE_REFUND } from '@/lib/urql/mutations/refund';

export default function Add({ orderId, productId }: { orderId: string; productId: string }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [createRefundResult, createRefund] = useMutation(CREATE_REFUND);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRefund({ 
        input: {
          orderId,
          productId,
          reason,
          description
        }
      });
      alert('درخواست مرجوعی با موفقیت ثبت شد');
    } catch (error) {
      alert('خطا در ثبت درخواست مرجوعی');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">ثبت درخواست مرجوعی</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">دلیل مرجوعی</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2">توضیحات تکمیلی</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={createRefundResult.fetching}
        >
          {createRefundResult.fetching ? 'در حال ارسال...' : 'ثبت درخواست'}
        </button>
      </form>
    </div>
  );
}
