
'use client';

import { useQuery } from 'urql';
import { GET_SHIPPING_METHODS } from '@/lib/urql/queries/shipping';
import { formatPrice } from '@/lib/utils';

interface ShippingProps {
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

export default function Shipping({ selectedMethod, onSelect }: ShippingProps) {
  const [{ data }] = useQuery({ query: GET_SHIPPING_METHODS });
  const methods = data?.shippingMethods || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">انتخاب روش ارسال</h3>

      <div className="space-y-4">
        {methods.map((method: any) => (
          <label 
            key={method.id}
            className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onSelect(method.id)}
              className="hidden"
            />

            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{method.title}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
              
              <div className="font-bold text-primary">
                {formatPrice(method.cost)}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
