
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiChevronLeft } from 'react-icons/bi';
import { formatPrice } from '@/lib/utils';

interface FlashCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
    availableQuantity: number;
    soldQuantity: number;
  };
}

export default function FlashCard({ product }: FlashCardProps) {
  const progress = (product.soldQuantity / (product.availableQuantity + product.soldQuantity)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <Link href={`/flash-deals/${product.slug}`} className="block relative">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {product.discount}% تخفیف
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/flash-deals/${product.slug}`}>
          <h3 className="font-semibold text-secondary line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-primary font-bold">{formatPrice(product.price)}</div>
            <div className="text-gray text-sm line-through">{formatPrice(product.originalPrice)}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray">فروش رفته: {product.soldQuantity}</span>
            <span className="text-gray">موجود: {product.availableQuantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
