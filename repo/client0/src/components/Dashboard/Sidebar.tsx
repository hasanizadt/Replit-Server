
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiUser, BiPackage, BiHeart, BiCoin, BiLogOut } from 'react-icons/bi';

interface SidebarProps {
  active: string;
}

const menuItems = [
  {
    title: 'پروفایل',
    href: '/dashboard/manage-profile',
    icon: BiUser
  },
  {
    title: 'سفارش‌ها',
    href: '/dashboard/purchase-history',
    icon: BiPackage
  },
  {
    title: 'علاقه‌مندی‌ها',
    href: '/dashboard/wishlist',
    icon: BiHeart
  },
  {
    title: 'امتیازات',
    href: '/dashboard/earning-points',
    icon: BiCoin
  }
];

export default function Sidebar({ active }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
      <div className="flex items-center space-x-4 space-x-reverse border-b border-gray-100 pb-6 mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full" />
        <div>
          <h3 className="font-bold">نام کاربر</h3>
          <p className="text-gray text-sm">user@example.com</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
              active === item.href.split('/').pop()
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-gray-50'
            }`}
          >
            <item.icon className="text-xl" />
            <span>{item.title}</span>
          </Link>
        ))}
        
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <BiLogOut className="text-xl" />
          <span>خروج</span>
        </button>
      </nav>
    </div>
  );
}
