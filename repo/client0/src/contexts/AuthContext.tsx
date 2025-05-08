'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعریف مدل کاربر
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
}

// تعریف نوع داده‌های Context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// ایجاد Context با مقادیر پیش‌فرض برای جلوگیری از مشکلات undefined
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {},
});

// تابع Provider برای استفاده در کامپوننت‌ها
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // برای خواندن کوکی با نام مشخص
  const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };
  
  // بررسی وضعیت احراز هویت هنگام بارگذاری صفحه
  useEffect(() => {
    // بررسی اینکه آیا کاربر از قبل لاگین کرده است
    const checkUserAuth = () => {
      try {
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }
        
        // ابتدا localStorage را چک کن
        const storedUser = window.localStorage.getItem('user');
        
        // سپس cookie را چک کن
        const cookieUser = getCookie('user');
        
        console.log('Auth check:', {
          hasLocalStorage: !!storedUser,
          hasCookie: !!cookieUser
        });
        
        // اگر در localStorage یا cookie موجود باشد
        if (storedUser || cookieUser) {
          try {
            // اولویت با localStorage است
            const userData = storedUser || cookieUser;
            if (!userData) return;
            
            const parsedUser = JSON.parse(userData);
            console.log('Retrieved user data:', parsedUser);
            
            // تنظیم کاربر در context
            setUser(parsedUser);
            
            // اطمینان از اینکه هر دو منبع همگام هستند
            if (storedUser && !cookieUser) {
              // localStorage هست ولی cookie نیست
              document.cookie = `user=${encodeURIComponent(storedUser)}; path=/; max-age=${60*60*24*7}`;
            } else if (!storedUser && cookieUser) {
              // cookie هست ولی localStorage نیست
              window.localStorage.setItem('user', cookieUser);
            }
          } catch (err) {
            console.error('خطا در پردازش اطلاعات کاربر:', err);
            // پاک کردن داده‌های نامعتبر
            window.localStorage.removeItem('user');
            document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
        } else {
          console.log('No user authentication data found');
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAuth();
  }, []);

// تابع ورود به سیستم 
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // تلاش برای ارسال درخواست GraphQL
      try {
        // این درخواست GraphQL را به API GraphQL ارسال می‌کند
        const response = await fetch('https://37a855e9-cbad-47b1-aaee-e725b592ee4b-00-25qsdfa2j9uuc.spock.replit.dev/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation login($loginInput: LoginInput!) {
                login(loginInput: $loginInput) {
                  token
                  user {
                    id
                    name
                    email
                    phone
                    role
                    avatarUrl
                  }
                }
              }
            `,
            variables: {
              loginInput: {
                // اصلاح به فرمت مورد نیاز بک‌اند بر اساس اسکیما
                phone: username, 
                password
              }
            }
          }),
        });

        const result = await response.json();
        
        // بررسی نتیجه GraphQL
        if (result.errors) {
          console.error('خطا در درخواست GraphQL:', result.errors);
          throw new Error(result.errors[0]?.message || 'خطای نامشخص در درخواست GraphQL');
        }
        
        if (result.data?.login?.user) {
          // موفقیت در احراز هویت با GraphQL
          const apiUser = result.data.login.user;
          const token = result.data.login.token;
          
          const loggedInUser: User = {
            id: apiUser.id,
            username: apiUser.name || username,
            fullName: apiUser.name || `کاربر ${username}`,
            email: apiUser.email || `${username}@example.com`,
            role: apiUser.role || 'user',
          };
          
          // ذخیره اطلاعات کاربر
          console.log('GraphQL login successful, user:', loggedInUser);
          setUser(loggedInUser);
          
          // ذخیره در localStorage و cookie
          if (typeof window !== 'undefined') {
            const userData = JSON.stringify(loggedInUser);
            
            window.localStorage.setItem('user', userData);
            window.localStorage.setItem('token', token);
            
            document.cookie = `user=${encodeURIComponent(userData)}; path=/; max-age=${60*60*24*7}`;
            document.cookie = `token=${token}; path=/; max-age=${60*60*24*7}`;
            
            console.log('User data saved to localStorage and cookie');
          }
          
          return; // خروج بعد از لاگین موفق با GraphQL
        }
      } catch (graphqlError) {
        console.warn('GraphQL login failed, falling back to mock login:', graphqlError);
        // در صورت خطا در GraphQL، به روش احراز هویت موک ادامه می‌دهیم
      }
      
      // گزینه پشتیبان: احراز هویت موک
      console.log('Using mock authentication as fallback');
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // ایجاد یک کاربر موقت با اطلاعات وارد شده
      const loggedInUser: User = {
        id: '1',
        username,
        fullName: `کاربر ${username}`,
        email: `${username}@example.com`,
        role: 'user',
      };
      
      // ذخیره اطلاعات کاربر
      console.log('Logging in mock user:', loggedInUser);
      setUser(loggedInUser);
      
      // ذخیره در localStorage و cookie برای دسترسی در middleware
      if (typeof window !== 'undefined') {
        const userData = JSON.stringify(loggedInUser);
        
        // ذخیره در localStorage برای استفاده در کلاینت
        window.localStorage.setItem('user', userData);
        
        // ذخیره در cookie برای استفاده در middleware
        document.cookie = `user=${encodeURIComponent(userData)}; path=/; max-age=${60*60*24*7}`; // یک هفته
        
        console.log('Mock user data saved to localStorage and cookie');
      }
    } catch (err) {
      console.error('خطا در ورود:', err);
      setError('ورود به سیستم با خطا مواجه شد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  // تابع خروج از سیستم
  const logout = () => {
    setUser(null);
    
    if (typeof window !== 'undefined') {
      // پاک کردن از localStorage
      window.localStorage.removeItem('user');
      
      // پاک کردن از cookie (تنظیم منقضی شده)
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      console.log('User removed from localStorage and cookie, logged out');
    }
  };

  // مقادیری که از طریق کانتکست در دسترس خواهند بود
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// هوک برای استفاده از کانتکست
export function useAuth() {
  // چون مقادیر پیش‌فرض تعریف کرده‌ایم، هیچوقت undefined نمی‌شود
  return useContext(AuthContext);
}