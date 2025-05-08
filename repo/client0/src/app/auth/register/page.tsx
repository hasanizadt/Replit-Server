'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { BiChevronLeft, BiUser, BiLock, BiEnvelope, BiPhone, BiCheckCircle } from 'react-icons/bi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
    general: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      acceptTerms: '',
      general: ''
    };
    
    // بررسی نام
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
      isValid = false;
    }
    
    // بررسی نام خانوادگی
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
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
    
    // بررسی شماره موبایل
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'شماره موبایل الزامی است';
      isValid = false;
    } else if (!/^09[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'فرمت شماره موبایل نامعتبر است';
      isValid = false;
    }
    
    // بررسی رمز عبور
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
      isValid = false;
    }
    
    // بررسی تکرار رمز عبور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند';
      isValid = false;
    }
    
    // بررسی پذیرش قوانین
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'پذیرش قوانین و مقررات الزامی است';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // در پروژه واقعی اینجا به API ارسال می‌شود
      console.log('Registering with:', formData);
      
      // شبیه‌سازی تأخیر درخواست به سرور
      setTimeout(() => {
        // شبیه‌سازی پاسخ سرور (در پروژه واقعی این بخش متفاوت خواهد بود)
        if (formData.email === 'test@example.com') {
          setErrors({
            ...errors,
            email: 'این ایمیل قبلاً در سیستم ثبت شده است',
            general: ''
          });
        } else {
          // در حالت موفقیت، کاربر به صفحه ورود هدایت می‌شود
          window.location.href = '/auth/login?registered=true';
        }
      }, 1000);
    }
  };

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">ثبت نام</span>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold">ثبت نام در فروشگاه</h1>
            <p className="text-gray mt-2">
              عضویت در فروشگاه به شما امکان پیگیری سفارش‌ها، ذخیره آدرس‌ها و موارد دیگر را می‌دهد.
            </p>
          </div>
          
          <div className="p-6">
            {errors.general && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 mb-2">
                    نام <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <BiUser />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pr-10 border ${errors.firstName ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 mb-2">
                    نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <BiUser />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pr-10 border ${errors.lastName ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                  <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                    شماره موبایل <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <BiPhone />
                    </div>
                    <input
                      id="phoneNumber"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full pr-10 border ${errors.phoneNumber ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="09123456789"
                      dir="ltr"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    رمز عبور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <BiLock />
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pr-10 border ${errors.password ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="حداقل ۶ کاراکتر"
                      dir="ltr"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                    تکرار رمز عبور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <BiLock />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pr-10 border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'} rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="تکرار رمز عبور"
                      dir="ltr"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 ml-2"
                  />
                  <span>
                    <span className="text-red-500 ml-1">*</span>
                    من با{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      قوانین و مقررات
                    </Link>
                    {' '}و{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      حریم خصوصی
                    </Link>
                    {' '}موافقم.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
                )}
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <BiCheckCircle className="text-xl ml-2" />
                  ثبت نام
                </button>
              </div>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-gray mb-4">یا ثبت نام با:</p>
              
              <div className="flex justify-center space-x-4 space-x-reverse">
                <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  گوگل
                </button>
                <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  فیسبوک
                </button>
              </div>
              
              <p className="mt-6">
                قبلاً ثبت نام کرده‌اید؟{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}