
import React from 'react';
import { useQuery } from 'urql';
import { GET_REFUNDS } from '@/lib/urql/queries/refund';

export default function RefundList() {
  const [{ data, fetching }] = useQuery({ 
    query: GET_REFUNDS,
    variables: { limit: 10, page: 1 }
  });

  if (fetching) return <div>در حال بارگذاری...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">لیست درخواست‌های مرجوعی</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-right">شماره سفارش</th>
              <th className="p-2 text-right">محصول</th>
              <th className="p-2 text-right">دلیل</th>
              <th className="p-2 text-right">وضعیت</th>
              <th className="p-2 text-right">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {data?.refunds?.map((refund: any) => (
              <tr key={refund.id} className="border-b">
                <td className="p-2">{refund.orderId}</td>
                <td className="p-2">{refund.product?.name}</td>
                <td className="p-2">{refund.reason}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    refund.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    refund.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {refund.status === 'APPROVED' ? 'تایید شده' :
                     refund.status === 'REJECTED' ? 'رد شده' : 'در انتظار بررسی'}
                  </span>
                </td>
                <td className="p-2">{new Date(refund.createdAt).toLocaleDateString('fa-IR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
