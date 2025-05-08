
'use client';

import Container from '@/components/common/Container';
import Layout from '@/components/Dashboard/Layout';
import RefundableList from '@/components/Dashboard/Components/Refund/RefundableList';

export default function RefundRequestPage() {
  return (
    <Layout>
      <Container>
        <RefundableList />
      </Container>
    </Layout>
  );
}
