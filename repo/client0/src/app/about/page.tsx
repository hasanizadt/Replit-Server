import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { BiChevronLeft, BiStore, BiPackage, BiSupport, BiCreditCard } from 'react-icons/bi';

export default function AboutPage() {
  // آمار و ارقام فروشگاه
  const stats = [
    { icon: <BiStore className="text-3xl" />, title: '+۱۰۰,۰۰۰', description: 'محصول' },
    { icon: <BiPackage className="text-3xl" />, title: '+۲,۰۰۰,۰۰۰', description: 'سفارش' },
    { icon: <BiSupport className="text-3xl" />, title: '۲۴/۷', description: 'پشتیبانی' },
    { icon: <BiCreditCard className="text-3xl" />, title: '+۵۰۰,۰۰۰', description: 'مشتری' },
  ];

  // اعضای تیم فروشگاه (داده نمونه)
  const team = [
    { name: 'علی محمدی', position: 'مدیرعامل', image: '/images/placeholders/product.svg' },
    { name: 'مریم احمدی', position: 'مدیر بازاریابی', image: '/images/placeholders/product.svg' },
    { name: 'محمد حسینی', position: 'مدیر فنی', image: '/images/placeholders/product.svg' },
    { name: 'زهرا کریمی', position: 'مدیر پشتیبانی مشتریان', image: '/images/placeholders/product.svg' },
  ];

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">درباره ما</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">درباره فروشگاه</h1>
      
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:ml-8 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">داستان ما</h2>
            <p className="text-gray leading-7 mb-4">
              فروشگاه ما از سال ۱۳۹۰ با هدف ارائه محصولات با کیفیت و قیمت مناسب به مشتریان آغاز به کار کرد. در طول این سال‌ها همواره تلاش کرده‌ایم تا با بهره‌گیری از فناوری‌های روز، تجربه خرید آنلاین را برای کاربران خود لذت‌بخش‌تر کنیم.
            </p>
            <p className="text-gray leading-7">
              امروز، فروشگاه ما به عنوان یکی از بزرگترین فروشگاه‌های آنلاین ایران، با ارائه بیش از ۱۰۰ هزار کالا و خدمات متنوع، به میلیون‌ها مشتری خدمت‌رسانی می‌کند. ما همواره به کیفیت محصولات، قیمت منصفانه و خدمات پس از فروش عالی متعهد هستیم.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/placeholders/product.svg"
              alt="درباره فروشگاه"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">ارزش‌های ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">اعتماد و شفافیت</h3>
            <p className="text-gray">
              ما به صداقت و شفافیت در ارائه اطلاعات محصولات و قیمت‌گذاری باور داریم. تلاش می‌کنیم تا مشتریان ما همواره با اطمینان خرید کنند.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">نوآوری</h3>
            <p className="text-gray">
              ما همواره به دنبال راه‌های جدید برای بهبود تجربه خرید مشتریان هستیم. از فناوری‌های نوین استفاده می‌کنیم تا خدمات بهتری ارائه دهیم.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">مشتری‌مداری</h3>
            <p className="text-gray">
              مشتریان در مرکز توجه ما قرار دارند. ما به نیازها و بازخوردهای مشتریان اهمیت می‌دهیم و همواره تلاش می‌کنیم تا رضایت آن‌ها را جلب کنیم.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-primary rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.title}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">تیم ما</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gray">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">همراه ما باشید</h2>
        <p className="text-gray mb-6 max-w-2xl mx-auto">
          ما هر روز تلاش می‌کنیم تا تجربه بهتری برای مشتریان خود فراهم کنیم. نظرات و پیشنهادات شما به ما کمک می‌کند تا بهتر شویم.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            تماس با ما
          </Link>
          <Link 
            href="/products"
            className="bg-white border border-gray-200 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-lg transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </Container>
  );
}