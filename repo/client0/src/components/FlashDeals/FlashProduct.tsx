
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiChevronLeft, BiHeart } from 'react-icons/bi';
import { formatPrice } from '@/lib/utils';
import FlashDetails from './FlashDetails';

interface FlashProductProps {
  product: {
    id: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    price: number;
    originalPrice: number;
    discount: number;
    availableQuantity: number;
    soldQuantity: number;
    endTime: Date;
    specifications: {
      title: string;
      value: string;
    }[];
  };
}

export default function FlashProduct({ product }: FlashProductProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const progress = (product.soldQuantity / (product.availableQuantity + product.soldQuantity)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                {product.discount}% تخفیف
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square relative rounded overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} - تصویر ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          
          <div className="mb-6">
            <FlashDetails endTime={product.endTime} />
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl text-primary font-bold">{formatPrice(product.price)}</div>
                {product.discount > 0 && (
                  <div className="text-gray line-through">{formatPrice(product.originalPrice)}</div>
                )}
              </div>
              
              <button className="text-gray hover:text-primary">
                <BiHeart className="text-2xl" />
              </button>
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
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-gray">تعداد:</span>
              <div className="flex items-center border rounded">
                <button 
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(q => Math.min(q + 1, product.availableQuantity))}
                >
                  +
                </button>
                <input
                  type="number"
                  className="w-16 text-center border-none focus:ring-0"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= product.availableQuantity) {
                      setQuantity(value);
                    }
                  }}
                />
                <button 
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors">
            افزودن به سبد خرید
          </button>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-bold">مشخصات:</h3>
            <div className="space-y-2">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex">
                  <span className="text-gray ml-2">{spec.title}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-bold mb-4">توضیحات محصول:</h3>
        <p className="text-gray leading-7">{product.description}</p>
      </div>
    </div>
  );
}
