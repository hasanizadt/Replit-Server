
'use client';

import DashboardLayout from '@/components/Dashboard/Layout';
import Container from '@/components/common/Container';
import Lists from '@/components/Dashboard/Components/Order/Lists';

export default function PurchaseHistoryPage() {
  return (
    <Container className="py-12">
      <DashboardLayout active="purchase">
        <Lists />
      </DashboardLayout>
    </Container>
  );
}
