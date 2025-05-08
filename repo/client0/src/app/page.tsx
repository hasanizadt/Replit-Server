import Container from '@/components/common/Container';
import HomeBanner from '@/components/home/HomeBanner';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FlashDeals from '@/components/home/FlashDeals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TopBrands from '@/components/home/TopBrands';

export default function Home() {
  // داده‌های بنر برای نمایش در صفحه تا زمان آماده‌سازی بک‌اند
  const fakeBanners = [
    {
      id: 1,
      title: 'محصولات الکترونیکی',
      description: 'تا ۳۰٪ تخفیف',
      image: '/images/placeholders/banner.svg',
      link: '/shop'
    },
    {
      id: 2,
      title: 'بهترین محصولات',
      description: 'پیشنهادهای ویژه',
      image: '/images/placeholders/banner.svg',
      link: '/flash-deals'
    }
  ];

  return (
    <div className="pt-8">
      {/* بنر اصلی */}
      <Container>
        <HomeBanner banners={fakeBanners} />
      </Container>

      {/* دسته‌بندی‌های برتر */}
      <section className="mt-16">
        <Container>
          <h2 className="text-2xl font-bold mb-6">دسته‌بندی‌های محبوب</h2>
          <FeaturedCategories />
        </Container>
      </section>

      {/* پیشنهادهای ویژه */}
      <section className="mt-16">
        <Container>
          <h2 className="text-2xl font-bold mb-6">پیشنهادهای شگفت‌انگیز</h2>
          <FlashDeals />
        </Container>
      </section>

      {/* محصولات برتر */}
      <section className="mt-16">
        <Container>
          <h2 className="text-2xl font-bold mb-6">محصولات برتر</h2>
          <FeaturedProducts />
        </Container>
      </section>

      {/* برندهای برتر */}
      <section className="mt-16">
        <Container>
          <h2 className="text-2xl font-bold mb-6">برندهای برتر</h2>
          <TopBrands />
        </Container>
      </section>
    </div>
  );
}