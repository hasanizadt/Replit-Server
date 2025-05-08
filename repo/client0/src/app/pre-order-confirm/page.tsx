
'use client';

import Layout from '@/components/layout';
import Container from '@/components/common/Container';

export default function PreOrderConfirmPage() {
  return (
    <Layout>
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">سفارش شما با موفقیت ثبت شد</h1>
          <p>با تشکر از سفارش شما. وضعیت سفارش خود را میتوانید در پنل کاربری مشاهده کنید.</p>
        </div>
      </Container>
    </Layout>
  );
}
