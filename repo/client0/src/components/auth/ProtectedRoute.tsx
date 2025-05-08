'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // برای دیباگ
  console.log('ProtectedRoute rendering with: ', {
    user: user ? `${user.username} (${user.id})` : 'null',
    isAuthenticated,
    isLoading,
    shouldRender,
    redirecting,
    pathname
  });

  useEffect(() => {
    // اگر صفحه در حال بارگذاری است، منتظر بمان
    if (isLoading) {
      console.log('ProtectedRoute: Auth loading, waiting...');
      return;
    }

    // اگر در حال ریدایرکت هستیم، دیگر کاری انجام نده
    if (redirecting) {
      console.log('ProtectedRoute: Already redirecting, skipping...');
      return;
    }

    // اگر کاربر احراز هویت شده است، محتوا را نمایش بده
    if (isAuthenticated && user) {
      console.log('ProtectedRoute: User is authenticated:', user.username);
      setShouldRender(true);
      return;
    }

    // اگر احراز هویت نشده، به صفحه ورود هدایت کن
    console.log('ProtectedRoute: Not authenticated, redirecting to login...');
    setRedirecting(true);
    const returnUrl = encodeURIComponent(pathname);
    router.push(`/auth/login?returnUrl=${returnUrl}`);

  }, [isAuthenticated, isLoading, user, router, pathname, redirecting]);

  // در حال بارگذاری
  if (isLoading || (!shouldRender && !redirecting)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3">در حال بررسی وضعیت احراز هویت...</span>
      </div>
    );
  }

  // در حال ریدایرکت
  if (redirecting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3">در حال انتقال به صفحه ورود...</span>
      </div>
    );
  }

  // کاربر احراز هویت شده است و می‌توانیم محتوا را نمایش دهیم
  return <>{children}</>;
};

export default ProtectedRoute;