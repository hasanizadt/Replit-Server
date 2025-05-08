'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { formatPrice } from '@/lib/utils';
import { BiChevronLeft, BiTrash, BiMinus, BiPlus, BiArrowBack } from 'react-icons/bi';

// این یک نمونه داده است - در پروژه واقعی از API و مدیریت State استفاده می‌شود
const initialCartItems = [
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // محاسبه جمع قیمت محصولات
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  // محاسبه مجموع تخفیف‌ها
  const totalDiscount = cartItems.reduce((total, item) => {
    const itemDiscount = item.product.originalPrice - item.product.price;
    return total + (itemDiscount * item.quantity);
  }, 0);
  
  // هزینه ارسال - در پروژه واقعی از API محاسبه می‌شود
  const shippingCost = subtotal > 2000000 ? 0 : 150000;
  
  // مجموع با احتساب تخفیف کوپن
  const total = subtotal + shippingCost - couponDiscount;

  // تغییر تعداد محصول
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // حذف محصول از سبد خرید
  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // اعمال کد تخفیف
  const applyCoupon = () => {
    // شبیه‌سازی تخفیف - در پروژه واقعی از API بررسی می‌شود
    if (couponCode.toLowerCase() === 'discount10') {
      const discountAmount = Math.round(subtotal * 0.1); // 10% تخفیف
      setCouponDiscount(discountAmount);
      setCouponApplied(true);
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
        <span className="text-gray-500">سبد خرید</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">سبد خرید شما</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 text-7xl mb-4">🛒</div>
          <h3 className="text-xl font-bold mb-2">سبد خرید شما خالی است</h3>
          <p className="text-gray mb-6">محصولی به سبد خرید خود اضافه نکرده‌اید.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <BiArrowBack className="ml-2" />
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 lg:mb-0">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-lg">سبد خرید ({cartItems.length} کالا)</h2>
              </div>
              
              {/* Cart Item List */}
              <div className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <Link href={`/product/${item.product.slug}`}>
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={120}
                          height={120}
                          className="rounded-md border border-gray-100"
                        />
                      </Link>
                    </div>
                    
                    {/* Product Info */}
                    <div className="sm:w-3/4 sm:pr-6 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link 
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-lg hover:text-primary"
                        >
                          {item.product.title}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray hover:text-red-500"
                        >
                          <BiTrash className="text-xl" />
                        </button>
                      </div>
                      
                      <div className="text-gray text-sm mb-2">
                        <span>رنگ: {item.color}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-500 hover:text-primary"
                          >
                            <BiMinus />
                          </button>
                          <span className="px-3 py-1 border-r border-l border-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-500 hover:text-primary"
                          >
                            <BiPlus />
                          </button>
                        </div>
                        
                        <div className="text-left">
                          <div className="font-bold text-primary">
                            {formatPrice(item.product.price)}
                          </div>
                          {item.product.discount > 0 && (
                            <div className="text-gray text-sm line-through">
                              {formatPrice(item.product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                    <span className="text-gray">قیمت کالاها:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>سود شما از خرید:</span>
                      <span>{formatPrice(totalDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray">هزینه ارسال:</span>
                    <span>{shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-success">
                      <span>تخفیف کوپن:</span>
                      <span>{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-b border-gray-100 py-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>جمع قابل پرداخت:</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-2">کد تخفیف:</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف را وارد کنید"
                      className="flex-1 border border-gray-200 rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      disabled={couponApplied}
                    />
                    <button
                      onClick={applyCoupon}
                      className={`bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-l-lg ${couponApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={couponApplied}
                    >
                      اعمال
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-success text-sm mt-2">کد تخفیف اعمال شد!</p>
                  )}
                </div>
                
                {/* Checkout Button */}
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="block bg-primary hover:bg-primary/90 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors w-full"
                  >
                    ادامه فرآیند خرید
                  </Link>
                </div>
                
                <div className="mt-4 text-center">
                  <Link
                    href="/products"
                    className="text-primary hover:underline"
                  >
                    ادامه خرید
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Guarantee Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="ml-2 text-primary">✓</div>
                  <span>ضمانت اصالت کالا و گارانتی معتبر</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-primary">✓</div>
                  <span>امکان پرداخت در محل</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-primary">✓</div>
                  <span>۷ روز ضمانت بازگشت کالا</span>
                </li>
                <li className="flex items-start">
                  <div className="ml-2 text-primary">✓</div>
                  <span>ارسال سریع با پست ویژه</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}