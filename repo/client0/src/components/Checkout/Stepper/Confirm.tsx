
'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { PLACE_ORDER } from '@/lib/urql/mutations/order';
import { useRouter } from 'next/navigation';

interface ConfirmProps {
  addressId: string;
  shippingMethodId: string;
}

export default function Confirm({ addressId, shippingMethodId }: ConfirmProps) {
  const router = useRouter();
  const [placeOrder] = useMutation(PLACE_ORDER);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    try {
      const { data, error: orderError } = await placeOrder({
        input: {
          addressId,
          shippingMethodId
        }
      });

      if (orderError) {
        setError('خطا در ثبت سفارش');
        return;
      }

      if (data?.placeOrder?.success) {
        router.push(`/order/success/${data.placeOrder.orderId}`);
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">تایید نهایی سفارش</h3>

      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <p className="text-gray-600">
          لطفاً پیش از تایید نهایی، اطلاعات سفارش خود را بررسی کنید.
        </p>

        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          تایید و پرداخت
        </button>
      </div>
    </div>
  );
}
