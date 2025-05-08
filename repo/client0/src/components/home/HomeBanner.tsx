'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface HomeBannerProps {
  banners: Banner[];
}

const HomeBanner: React.FC<HomeBannerProps> = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10" />
          <div className="relative w-full h-full">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
          <div className="absolute bottom-0 right-0 text-white p-6 md:p-10 z-20 max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
            <p className="text-sm md:text-base mb-4">{banner.description}</p>
            <Link
              href={banner.link}
              className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              مشاهده
            </Link>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="بنر قبلی"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="بنر بعدی"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 space-x-reverse">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBanner ? 'bg-primary' : 'bg-white/50'
                }`}
                aria-label={`رفتن به بنر ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBanner;