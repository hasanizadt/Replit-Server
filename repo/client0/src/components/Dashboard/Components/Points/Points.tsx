
import React from 'react';
import { BiCoin, BiGift } from 'react-icons/bi';

interface PointsProps {
  points: {
    available: number;
    total: number;
    history: {
      id: string;
      date: string;
      points: number;
      type: 'earned' | 'spent';
      description: string;
    }[];
  };
}

export default function Points({ points }: PointsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BiCoin className="text-2xl text-primary" />
            </div>
            <div>
              <div className="text-gray text-sm">امتیاز موجود</div>
              <div className="text-2xl font-bold">{points.available}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BiGift className="text-2xl text-primary" />
            </div>
            <div>
              <div className="text-gray text-sm">مجموع امتیازات</div>
              <div className="text-2xl font-bold">{points.total}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold">تاریخچه امتیازات</h3>
        </div>
        
        <div className="divide-y">
          {points.history.map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between">
              <div>
                <div className="font-bold mb-1">{item.description}</div>
                <div className="text-gray text-sm">{item.date}</div>
              </div>
              <div className={`font-bold ${item.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                {item.type === 'earned' ? '+' : '-'}{item.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
