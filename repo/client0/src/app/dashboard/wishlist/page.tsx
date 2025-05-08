
'use client';

import DashboardLayout from '@/components/Dashboard/Layout';
import Container from '@/components/common/Container';
import Wishlist from '@/components/Dashboard/Components/Wishlist';

export default function WishlistPage() {
  return (
    <Container className="py-12">
      <DashboardLayout active="wishlist">
        <Wishlist />
      </DashboardLayout>
    </Container>
  );
}
