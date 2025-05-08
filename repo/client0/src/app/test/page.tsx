'use client';

import React, { useState } from 'react';
import { useFeaturedProducts, useLogin, useRegister, useAddToCart } from '@/lib/api';

const TestPage = () => {
  const [result] = useFeaturedProducts();
  const [loginMutation, loginResult] = useLogin();
  const [registerMutation, registerResult] = useRegister();
  const [addToCartMutation, addToCartResult] = useAddToCart();
  
  const [phone, setPhone] = useState('09123456789');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('کاربر تست');
  const [email, setEmail] = useState('test@example.com');
  
  const [log, setLog] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  const handleLogin = async () => {
    try {
      addLog('در حال ارسال درخواست لاگین...');
      const result = await loginMutation({ 
        loginInput: { phone, password } 
      });
      
      if (result.error) {
        addLog(`خطا در لاگین: ${result.error.message}`);
      } else {
        addLog(`لاگین موفق: ${JSON.stringify(result.data)}`);
      }
    } catch (error) {
      addLog(`خطای غیرمنتظره در لاگین: ${error}`);
    }
  };
  
  const handleRegister = async () => {
    try {
      addLog('در حال ارسال درخواست ثبت‌نام...');
      const result = await registerMutation({ 
        signupInput: { name, email, phone, password } 
      });
      
      if (result.error) {
        addLog(`خطا در ثبت‌نام: ${result.error.message}`);
      } else {
        addLog(`ثبت‌نام موفق: ${JSON.stringify(result.data)}`);
      }
    } catch (error) {
      addLog(`خطای غیرمنتظره در ثبت‌نام: ${error}`);
    }
  };
  
  const handleAddToCart = async () => {
    try {
      if (result.data?.featuredProducts && result.data.featuredProducts.length > 0) {
        const firstProduct = result.data.featuredProducts[0];
        addLog(`تلاش برای افزودن محصول به سبد خرید: ${firstProduct.name}`);
        
        const addResult = await addToCartMutation({ 
          addToCartInput: { 
            productId: firstProduct.id, 
            sellerId: '1', // این مقدار را بر اساس داده‌های موجود تغییر دهید
            reserved: 1,
            attributes: '{}' 
          } 
        });
        
        if (addResult.error) {
          addLog(`خطا در افزودن به سبد خرید: ${addResult.error.message}`);
        } else {
          addLog(`افزودن به سبد خرید موفق: ${JSON.stringify(addResult.data)}`);
        }
      } else {
        addLog('هیچ محصولی برای افزودن به سبد خرید یافت نشد');
      }
    } catch (error) {
      addLog(`خطای غیرمنتظره در افزودن به سبد خرید: ${error}`);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">صفحه تست GraphQL</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">کوئری محصولات ویژه</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>وضعیت:</span>
              <span>{result.fetching ? 'در حال بارگذاری...' : result.error ? 'خطا' : 'موفق'}</span>
            </div>
            {result.error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mt-2">
                خطا: {result.error.message}
              </div>
            )}
            {result.data?.featuredProducts && (
              <div className="mt-2">
                <div className="font-bold">تعداد محصولات: {result.data.featuredProducts.length}</div>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  <pre className="text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(result.data.featuredProducts, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">احراز هویت</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="09123456789"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="رمز عبور"
            />
          </div>
          
          <button
            onClick={handleLogin}
            disabled={loginResult.fetching}
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2 disabled:opacity-50"
          >
            {loginResult.fetching ? 'در حال ورود...' : 'ورود'}
          </button>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="نام کامل"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="email@example.com"
            />
          </div>
          
          <button
            onClick={handleRegister}
            disabled={registerResult.fetching}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 disabled:opacity-50"
          >
            {registerResult.fetching ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">سبد خرید</h2>
          <button
            onClick={handleAddToCart}
            disabled={addToCartResult.fetching}
            className="bg-orange-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {addToCartResult.fetching ? 'در حال افزودن...' : 'افزودن محصول اول به سبد خرید'}
          </button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">لاگ‌ها</h2>
          <div className="bg-gray-100 p-2 rounded h-64 overflow-y-auto">
            {log.length === 0 ? (
              <div className="text-gray-500">هنوز لاگی ثبت نشده است</div>
            ) : (
              log.map((entry, i) => (
                <div key={i} className="text-xs mb-1">{entry}</div>
              ))
            )}
          </div>
          <button
            onClick={() => setLog([])}
            className="bg-gray-500 text-white py-1 px-2 rounded mt-2 text-sm"
          >
            پاک کردن لاگ‌ها
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;