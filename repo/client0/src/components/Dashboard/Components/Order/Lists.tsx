
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiChevronLeft } from 'react-icons/bi';
import { formatPrice } from '@/lib/utils';

interface OrdersListProps {
  orders: {
    id: string;
    date: string;
    status: string;
    total: number;
    items: {
      id: string;
      title: string;
      image: string;
      price: number;
      quantity: number;
    }[];
  }[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-gray ml-2">شماره سفارش:</span>
                <span className="font-bold">{order.id}</span>
              </div>
              <div>
                <span className="text-gray ml-2">تاریخ:</span>
                <span>{order.date}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray ml-2">مبلغ کل:</span>
                <span className="font-bold">{formatPrice(order.total)}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status as keyof typeof statusColors]}`}>
                {order.status}
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
                
                <div className="flex-1 mr-4">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <div className="text-gray text-sm">
                    <span className="ml-4">تعداد: {item.quantity}</span>
                    <span>قیمت واحد: {formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50">
            <Link
              href={`/dashboard/orders/${order.id}`}
              className="flex items-center justify-center text-primary"
            >
              مشاهده جزئیات
              <BiChevronLeft className="mr-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
