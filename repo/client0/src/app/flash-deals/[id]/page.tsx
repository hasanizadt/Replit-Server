
'use client';

import Container from '@/components/common/Container';
import FlashDetails from '@/components/FlashDeals/FlashDetails';

export default function FlashDealPage({ params }: { params: { id: string } }) {
  return (
    <Container>
      <FlashDetails id={params.id} />
    </Container>
  );
}
