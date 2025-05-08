import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * ترکیب کلاس‌های TailwindCSS با استفاده از clsx و tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * تبدیل عدد به فرمت قیمت فارسی
 * مثال: ۱۲۳,۴۵۶ تومان
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string;
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'تومان', notation = 'standard' } = options;

  // تبدیل اعداد انگلیسی به فارسی
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  // فرمت کردن عدد با جداکننده هزارگان
  const formattedPrice = new Intl.NumberFormat('en-US', {
    notation,
    maximumFractionDigits: 0,
  }).format(price);
  
  // تبدیل اعداد انگلیسی به فارسی
  const farsiPrice = formattedPrice.replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);

  return `${farsiPrice} ${currency}`;
}

/**
 * جایگزینی اعداد انگلیسی با اعداد فارسی
 */
export function toFarsiNumber(text: string | number): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, digit => farsiDigits[Number(digit)]);
}

/**
 * محاسبه درصد تخفیف بر اساس قیمت اصلی و قیمت با تخفیف
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0 || salePrice <= 0 || salePrice >= originalPrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * کوتاه کردن متن و افزودن سه نقطه در انتها
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + '...';
}

/**
 * تبدیل تاریخ میلادی به شمسی
 * این تابع نیاز به کتابخانه تاریخ شمسی دارد - در اینجا فقط به صورت مثال پیاده‌سازی شده است
 */
export function formatDate(date: Date | string): string {
  // در نسخه واقعی از یک کتابخانه تاریخ شمسی استفاده می‌شود
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fa-IR');
}

/**
 * تولید یک شناسه منحصر به فرد
 */
export function generateId(prefix = ''): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}