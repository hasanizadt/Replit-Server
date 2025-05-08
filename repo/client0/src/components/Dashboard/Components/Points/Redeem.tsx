
import React from 'react';
import { formatPrice } from '@/lib/utils';

interface RedeemProps {
  rewards: {
    id: string;
    title: string;
    description: string;
    points: number;
    value: number;
    image: string;
  }[];
  onRedeem: (rewardId: string) => void;
}

export default function Redeem({ rewards, onRedeem }: RedeemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.map((reward) => (
        <div key={reward.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative bg-gray-100">
            <img
              src={reward.image}
              alt={reward.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h3 className="font-bold mb-2">{reward.title}</h3>
            <p className="text-gray text-sm mb-4">{reward.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-gray text-sm">ارزش</div>
                <div className="font-bold">{formatPrice(reward.value)}</div>
              </div>
              <div>
                <div className="text-gray text-sm">امتیاز مورد نیاز</div>
                <div className="font-bold text-primary">{reward.points}</div>
              </div>
            </div>
            
            <button
              onClick={() => onRedeem(reward.id)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded transition-colors"
            >
              دریافت جایزه
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
