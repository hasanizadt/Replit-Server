'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { BiChevronLeft, BiEnvelope, BiPhone, BiMap, BiTime, BiUser, BiMessageDetail } from 'react-icons/bi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    general: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // پاک کردن پیام خطا برای فیلد در حال تغییر
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      general: ''
    };
    
    // بررسی نام
    if (!formData.name.trim()) {
      newErrors.name = 'نام و نام خانوادگی الزامی است';
      isValid = false;
    }
    
    // بررسی ایمیل
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل نامعتبر است';
      isValid = false;
    }
    
    // بررسی شماره تماس
    if (formData.phone && !/^09[0-9]{9}$|^0[1-9][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'فرمت شماره تماس نامعتبر است';
      isValid = false;
    }
    
    // بررسی موضوع
    if (!formData.subject) {
      newErrors.subject = 'انتخاب موضوع الزامی است';
      isValid = false;
    }
    
    // بررسی پیام
    if (!formData.message.trim()) {
      newErrors.message = 'متن پیام الزامی است';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'متن پیام باید حداقل ۱۰ کاراکتر باشد';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // در پروژه واقعی اینجا به API ارسال می‌شود
      console.log('Sending contact form:', formData);
      
      // شبیه‌سازی ارسال موفق
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };
  
  // اطلاعات تماس
  const contactInfo = [
    {
      icon: <BiPhone className="text-2xl text-primary" />,
      title: 'شماره تماس',
      details: [
        '۰۲۱-۱۲۳۴۵۶۷۸',
        '۰۲۱-۸۷۶۵۴۳۲۱'
      ]
    },
    {
      icon: <BiEnvelope className="text-2xl text-primary" />,
      title: 'ایمیل',
      details: [
        'info@example.com',
        'support@example.com'
      ]
    },
    {
      icon: <BiMap className="text-2xl text-primary" />,
      title: 'آدرس',
      details: [
        'تهران، خیابان ولیعصر، بالاتر از میدان ونک',
        'پلاک ۲۳، طبقه ۴، واحد ۴۰۱'
      ]
    },
    {
      icon: <BiTime className="text-2xl text-primary" />,
      title: 'ساعات کاری',
      details: [
        'شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر',
        'پنجشنبه: ۹ صبح تا ۱ بعدازظهر'
      ]
    }
  ];

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">تماس با ما</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">تماس با ما</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-xl font-bold mb-6">اطلاعات تماس</h2>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex">
                  <div className="ml-4 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="اینستاگرام"
                >
                  <i className="text-lg">IG</i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="تلگرام"
                >
                  <i className="text-lg">TG</i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="لینکدین"
                >
                  <i className="text-lg">LI</i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="آپارات"
                >
                  <i className="text-lg">AP</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {!isSubmitted ? (
              <>
                <h2 className="text-xl font-bold mb-6">ارسال پیام</h2>
                
                {errors.general && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {errors.general}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        نام و نام خانوادگی <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                          <BiUser />
                        </div>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pr-10 border ${errors.name ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="نام و نام خانوادگی خود را وارد کنید"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        ایمیل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                          <BiEnvelope />
                        </div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pr-10 border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="example@email.com"
                          dir="ltr"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">
                        شماره تماس
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                          <BiPhone />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pr-10 border ${errors.phone ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          dir="ltr"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-2">
                        موضوع <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full border ${errors.subject ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      >
                        <option value="">انتخاب کنید</option>
                        <option value="سوال درباره محصول">سوال درباره محصول</option>
                        <option value="پیگیری سفارش">پیگیری سفارش</option>
                        <option value="گزارش مشکل">گزارش مشکل</option>
                        <option value="همکاری با ما">همکاری با ما</option>
                        <option value="سایر موارد">سایر موارد</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      پیام <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 right-3 text-gray-400">
                        <BiMessageDetail />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full pr-10 border ${errors.message ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="پیام خود را وارد کنید..."
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                    >
                      ارسال پیام
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">پیام شما با موفقیت ارسال شد</h2>
                <p className="text-gray mb-6 max-w-md mx-auto">
                  از تماس شما سپاسگزاریم. کارشناسان ما در اسرع وقت پیام شما را بررسی و پاسخ خواهند داد.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  ارسال پیام جدید
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">موقعیت ما روی نقشه</h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">نقشه در اینجا نمایش داده می‌شود</p>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="mt-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">سوالات متداول</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">زمان ارسال سفارش‌ها چقدر است؟</h3>
              <p className="text-gray">
                سفارش‌های شما معمولاً بین ۲ تا ۵ روز کاری به دست شما می‌رسند. برای مناطق دورافتاده ممکن است تا ۷ روز کاری زمان ببرد.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">آیا امکان پرداخت در محل وجود دارد؟</h3>
              <p className="text-gray">
                بله، برای سفارش‌های با مبلغ کمتر از ۵ میلیون تومان امکان پرداخت در محل وجود دارد.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">شرایط گارانتی و مرجوعی کالا چیست؟</h3>
              <p className="text-gray">
                تمامی محصولات دارای ۷ روز ضمانت بازگشت هستند. همچنین محصولات الکترونیکی دارای گارانتی از ۱ تا ۳ سال می‌باشند.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">آیا امکان خرید اقساطی وجود دارد؟</h3>
              <p className="text-gray">
                بله، برای سفارش‌های بالای ۵ میلیون تومان امکان خرید اقساطی با کارت‌های اعتباری بانک‌های طرف قرارداد وجود دارد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}