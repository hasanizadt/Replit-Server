
'use client';

import { useQuery } from 'urql';
import { GET_ORDER_DETAILS } from '@/lib/urql/queries/order';

export default function OrderDetail({ orderId }: { orderId: string }) {
  const [{ data, fetching }] = useQuery({
    query: GET_ORDER_DETAILS,
    variables: { id: orderId }
  });

  if (fetching) return <div>Loading...</div>;

  const order = data?.getOrder;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">جزئیات سفارش</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray">شماره سفارش:</span>
            <span className="font-medium mr-2">{order?.id}</span>
          </div>
          <div>
            <span className="text-gray">تاریخ سفارش:</span>
            <span className="font-medium mr-2">{new Date(order?.createdAt).toLocaleDateString('fa-IR')}</span>
          </div>
          <div>
            <span className="text-gray">وضعیت سفارش:</span>
            <span className="font-medium mr-2">{order?.status}</span>
          </div>
          <div>
            <span className="text-gray">مبلغ کل:</span>
            <span className="font-medium mr-2">{order?.total.toLocaleString()} تومان</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-3">محصولات</h3>
          <div className="space-y-3">
            {order?.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="mr-3">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray">تعداد: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.price.toLocaleString()} تومان</div>
                  <div className="text-sm text-gray">مجموع: {(item.price * item.quantity).toLocaleString()} تومان</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-3">آدرس تحویل</h3>
          <div className="p-3 border rounded">
            <p>{order?.shippingAddress?.fullAddress}</p>
            <p className="text-gray mt-1">
              {order?.shippingAddress?.recipientName} - {order?.shippingAddress?.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
