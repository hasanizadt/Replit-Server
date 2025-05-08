
import React from 'react';
import { useQuery } from 'urql';
import { GET_REFUNDABLES } from '@/lib/urql/queries/refund';
import Add from './Add';

export default function RefundableList() {
  const [{ data, fetching }] = useQuery({ 
    query: GET_REFUNDABLES,
    variables: { limit: 10, page: 1 }
  });

  if (fetching) return <div>در حال بارگذاری...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">محصولات قابل مرجوع</h2>
      <div className="space-y-4">
        {data?.refundables?.map((item: any) => (
          <div key={item.id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold">{item.product.name}</h3>
                <p className="text-sm text-gray-600">
                  شماره سفارش: {item.orderId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  تاریخ خرید: {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                </p>
              </div>
            </div>
            <Add orderId={item.orderId} productId={item.product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
