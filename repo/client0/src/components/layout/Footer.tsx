import React from 'react';
import Link from 'next/link';
import { BiEnvelope, BiPhone, BiMap, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin } from 'react-icons/bi';
import Container from '@/components/common/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* درباره ما */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b border-primary pb-2 mb-4">درباره ما</h3>
            <p className="text-gray-600 leading-relaxed">
              فروشگاه آنلاین ما، مرجع خرید مطمئن و سریع انواع کالاهای دیجیتال و الکترونیکی با ضمانت اصل بودن کالا.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <BiMap className="ml-2 text-primary text-xl" />
                <span>تهران، خیابان ولیعصر، خیابان توانیر</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <BiPhone className="ml-2 text-primary text-xl" />
                <span className="dir-ltr">۰۲۱-۸۸۷۷۶۶۵۵</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <BiEnvelope className="ml-2 text-primary text-xl" />
                <span>info@shop.com</span>
              </div>
            </div>
          </div>

          {/* دسترسی سریع */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b border-primary pb-2 mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', text: 'درباره ما' },
                { href: '/contact', text: 'تماس با ما' },
                { href: '/faq', text: 'سوالات متداول' },
                { href: '/terms', text: 'قوانین و مقررات' },
                { href: '/privacy', text: 'حریم خصوصی' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} 
                    className="text-gray-600 hover:text-primary transition-colors inline-block py-1">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمات مشتریان */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b border-primary pb-2 mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              {[
                { href: '/shipping', text: 'روش‌های ارسال' },
                { href: '/payment', text: 'روش‌های پرداخت' },
                { href: '/return', text: 'شرایط بازگشت' },
                { href: '/warranty', text: 'گارانتی محصولات' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors inline-block py-1">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خبرنامه */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b border-primary pb-2 mb-4">خبرنامه</h3>
            <p className="text-gray-600 mb-4">برای اطلاع از آخرین تخفیف‌ها عضو خبرنامه ما شوید</p>
            <div className="flex">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 bg-white border border-gray-200 rounded-r-lg px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-l-lg hover:bg-primary/90 transition-colors">
                عضویت
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <BiLogoInstagram className="text-2xl" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <BiLogoTwitter className="text-2xl" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <BiLogoLinkedin className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} فروشگاه آنلاین - تمامی حقوق محفوظ است.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;