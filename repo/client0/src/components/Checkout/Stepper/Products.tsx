
'use client';

import Image from 'next/image';
import { useQuery } from 'urql';
import { GET_CART } from '@/lib/urql/queries/cart';
import { formatPrice } from '@/lib/utils';

export default function Products() {
  const [{ data }] = useQuery({ query: GET_CART });
  const cart = data?.cart || { items: [], total: 0 };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">محصولات سفارش</h3>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div key={item.id} className="flex items-center space-x-4 space-x-reverse">
            <div className="w-20 h-20 relative">
              <Image
                src={item.product.image}
                alt={item.product.title}
                fill
                className="object-cover rounded"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium">{item.product.title}</h4>
              <p className="text-sm text-gray-500">
                تعداد: {item.quantity}
              </p>
            </div>

            <div className="text-left">
              <div className="font-bold text-primary">
                {formatPrice(item.product.price * item.quantity)}
              </div>
              {item.product.discount > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(item.product.originalPrice * item.quantity)}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center font-bold">
            <span>جمع کل:</span>
            <span className="text-primary">{formatPrice(cart.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
