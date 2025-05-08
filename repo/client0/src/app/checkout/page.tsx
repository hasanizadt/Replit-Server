'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { formatPrice } from '@/lib/utils';
import { BiChevronLeft, BiArrowBack, BiCreditCard, BiLock } from 'react-icons/bi';

// این یک نمونه داده است - در پروژه واقعی از API و مدیریت State استفاده می‌شود
const cartItems = [
  {
    id: 1,
    product: {
      id: 1,
      title: 'گوشی موبایل اپل آیفون 14 پرو',
      image: '/images/placeholders/product.svg',
      price: 58900000,
      originalPrice: 62500000,
      discount: 6,
      slug: 'apple-iphone-14-pro',
    },
    quantity: 1,
    color: 'مشکی',
  },
  {
    id: 2,
    product: {
      id: 3,
      title: 'هدفون بی سیم ایرپاد پرو',
      image: '/images/placeholders/product.svg',
      price: 9700000,
      originalPrice: 11200000,
      discount: 13,
      slug: 'airpods-pro',
    },
    quantity: 2,
    color: 'سفید',
  }
];

// محاسبه جمع قیمت محصولات
const subtotal = cartItems.reduce((total, item) => {
  return total + (item.product.price * item.quantity);
}, 0);

// هزینه ارسال - در پروژه واقعی از API محاسبه می‌شود
const shippingCost = subtotal > 2000000 ? 0 : 150000;

// مجموع با احتساب هزینه ارسال
const total = subtotal + shippingCost;

const provinces = [
  'تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'آذربایجان غربی', 'گیلان', 'مازندران', 'کرمان', 'خوزستان'
];

const cities = {
  'تهران': ['تهران', 'شهریار', 'اسلامشهر', 'رباط کریم', 'پردیس', 'دماوند'],
  'اصفهان': ['اصفهان', 'کاشان', 'نجف آباد', 'شاهین شهر', 'خمینی شهر'],
  'فارس': ['شیراز', 'مرودشت', 'کازرون', 'لارستان', 'فسا'],
  'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان'],
  'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'اهر', 'سراب']
};

// نوع‌های تحویل
const deliveryMethods = [
  { id: 'standard', title: 'ارسال معمولی', description: 'بین ۳ تا ۵ روز کاری', price: 150000 },
  { id: 'express', title: 'ارسال سریع', description: 'بین ۱ تا ۲ روز کاری', price: 250000 },
  { id: 'same-day', title: 'تحویل در همان روز', description: 'فقط در تهران', price: 350000 }
];

// روش‌های پرداخت
const paymentMethods = [
  { id: 'online', title: 'پرداخت آنلاین', description: 'پرداخت با درگاه بانکی' },
  { id: 'cod', title: 'پرداخت در محل', description: 'پرداخت هنگام تحویل کالا' },
  { id: 'wallet', title: 'کیف پول', description: 'پرداخت از موجودی کیف پول' }
];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'online'
  });
  
  // شهرهای استان انتخابی
  const selectedProvinceCities = formData.province ? cities[formData.province as keyof typeof cities] || [] : [];
  
  // بروزرسانی فیلدهای فرم
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // اگر استان تغییر کرد، شهر را ریست کنیم
    if (name === 'province') {
      setFormData({
        ...formData,
        [name]: value,
        city: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // انتخاب روش ارسال
  const handleDeliveryMethodChange = (methodId: string) => {
    setFormData({
      ...formData,
      deliveryMethod: methodId
    });
  };
  
  // انتخاب روش پرداخت
  const handlePaymentMethodChange = (methodId: string) => {
    setFormData({
      ...formData,
      paymentMethod: methodId
    });
  };
  
  // تغییر مرحله
  const nextStep = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // محاسبه هزینه ارسال بر اساس روش انتخابی
  const getSelectedDeliveryPrice = () => {
    const selected = deliveryMethods.find(method => method.id === formData.deliveryMethod);
    return selected ? selected.price : deliveryMethods[0].price;
  };
  
  // محاسبه مبلغ نهایی با احتساب روش ارسال
  const calculateFinalTotal = () => {
    return subtotal + getSelectedDeliveryPrice();
  };
  
  // ارسال فرم پرداخت
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // در پروژه واقعی اینجا اطلاعات به API ارسال می‌شود
    alert('پرداخت با موفقیت انجام شد.');
  };

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray mb-6">
        <Link href="/" className="hover:text-primary">
          صفحه اصلی
        </Link>
        <BiChevronLeft className="mx-2" />
        <Link href="/cart" className="hover:text-primary">
          سبد خرید
        </Link>
        <BiChevronLeft className="mx-2" />
        <span className="text-gray-500">تکمیل خرید</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">تکمیل فرآیند خرید</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}>
              1
            </div>
            <span className={`text-sm ${activeStep >= 1 ? 'text-primary font-medium' : 'text-gray'}`}>اطلاعات ارسال</span>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}>
              2
            </div>
            <span className={`text-sm ${activeStep >= 2 ? 'text-primary font-medium' : 'text-gray'}`}>روش ارسال</span>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`}>
              3
            </div>
            <span className={`text-sm ${activeStep >= 3 ? 'text-primary font-medium' : 'text-gray'}`}>روش پرداخت</span>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 4 ? 'bg-primary' : 'bg-gray-300'}`}>
              4
            </div>
            <span className={`text-sm ${activeStep >= 4 ? 'text-primary font-medium' : 'text-gray'}`}>بررسی سفارش</span>
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 lg:mb-0">
            {/* Step 1: Delivery Information */}
            {activeStep === 1 && (
              <div>
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-lg">اطلاعات گیرنده و آدرس تحویل</h2>
                </div>
                
                <div className="p-6">
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">نام:</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">نام خانوادگی:</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">شماره موبایل:</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">ایمیل (اختیاری):</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">استان:</label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        >
                          <option value="">انتخاب استان</option>
                          {provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">شهر:</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                          disabled={!formData.province}
                        >
                          <option value="">انتخاب شهر</option>
                          {selectedProvinceCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">آدرس:</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">کد پستی:</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <Link 
                        href="/cart"
                        className="flex items-center text-gray-500 hover:text-primary"
                      >
                        <BiArrowBack className="ml-1" />
                        بازگشت به سبد خرید
                      </Link>
                      
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors"
                      >
                        ادامه
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Step 2: Shipping Method */}
            {activeStep === 2 && (
              <div>
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-lg">انتخاب روش ارسال</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {deliveryMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${formData.deliveryMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => handleDeliveryMethodChange(method.id)}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-5 ml-3">
                            <input
                              type="radio"
                              id={`delivery-${method.id}`}
                              name="deliveryMethod"
                              checked={formData.deliveryMethod === method.id}
                              onChange={() => handleDeliveryMethodChange(method.id)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                          </div>
                          <div className="flex-1">
                            <label htmlFor={`delivery-${method.id}`} className="font-medium cursor-pointer">
                              {method.title}
                            </label>
                            <p className="text-gray text-sm">{method.description}</p>
                          </div>
                          <div className="font-bold">{formatPrice(method.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-gray-500 hover:text-primary"
                    >
                      <BiArrowBack className="ml-1" />
                      بازگشت
                    </button>
                    
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors"
                    >
                      ادامه
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Payment Method */}
            {activeStep === 3 && (
              <div>
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-lg">انتخاب روش پرداخت</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${formData.paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => handlePaymentMethodChange(method.id)}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-5 ml-3">
                            <input
                              type="radio"
                              id={`payment-${method.id}`}
                              name="paymentMethod"
                              checked={formData.paymentMethod === method.id}
                              onChange={() => handlePaymentMethodChange(method.id)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                          </div>
                          <div>
                            <label htmlFor={`payment-${method.id}`} className="font-medium cursor-pointer">
                              {method.title}
                            </label>
                            <p className="text-gray text-sm">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-gray-500 hover:text-primary"
                    >
                      <BiArrowBack className="ml-1" />
                      بازگشت
                    </button>
                    
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors"
                    >
                      ادامه
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Pay */}
            {activeStep === 4 && (
              <div>
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-bold text-lg">بررسی سفارش و پرداخت</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-8">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-medium mb-3">آدرس تحویل</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="mb-1"><span className="font-medium">{formData.firstName} {formData.lastName}</span></p>
                        <p className="mb-1">{formData.address}</p>
                        <p className="mb-1">{formData.city}، {formData.province}</p>
                        <p className="mb-1">کد پستی: {formData.postalCode}</p>
                        <p>شماره تماس: {formData.phoneNumber}</p>
                      </div>
                    </div>
                    
                    {/* Shipping Method */}
                    <div>
                      <h3 className="font-medium mb-3">روش ارسال</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {deliveryMethods.find(m => m.id === formData.deliveryMethod)?.title}
                        {' - '}
                        {deliveryMethods.find(m => m.id === formData.deliveryMethod)?.description}
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                      <h3 className="font-medium mb-3">روش پرداخت</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {paymentMethods.find(m => m.id === formData.paymentMethod)?.title}
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-3">اقلام سفارش</h3>
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
                            <div className="w-16 h-16 ml-4">
                              <Image
                                src={item.product.image}
                                alt={item.product.title}
                                width={64}
                                height={64}
                                className="rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.title}</h4>
                              <p className="text-gray text-sm">
                                تعداد: {item.quantity} | رنگ: {item.color}
                              </p>
                            </div>
                            <div className="font-bold">{formatPrice(item.product.price * item.quantity)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-gray-500 hover:text-primary"
                    >
                      <BiArrowBack className="ml-1" />
                      بازگشت
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-lg transition-colors flex items-center"
                    >
                      <BiCreditCard className="ml-2" />
                      پرداخت {formatPrice(calculateFinalTotal())}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-bold text-lg">خلاصه سفارش</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray">تعداد محصولات:</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray">قیمت کالاها:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray">هزینه ارسال:</span>
                  <span>
                    {activeStep >= 2 
                      ? formatPrice(getSelectedDeliveryPrice())
                      : (shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost))}
                  </span>
                </div>
                
                <div className="border-t border-b border-gray-100 py-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>جمع قابل پرداخت:</span>
                    <span className="text-primary">
                      {activeStep >= 2 
                        ? formatPrice(calculateFinalTotal())
                        : formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Badge */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="flex items-center justify-center text-primary mb-3">
              <BiLock className="text-3xl" />
            </div>
            <p className="text-sm text-gray">
              تمامی اطلاعات شما با استفاده از پروتکل SSL رمزنگاری شده و به صورت ایمن منتقل می‌شود.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}