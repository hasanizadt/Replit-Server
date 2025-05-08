
'use client';

import Container from '@/components/common/Container';
import Profile from '@/components/Dashboard/Components/Profile/Profile';
import Layout from '@/components/Dashboard/Layout';

export default function ManageProfilePage() {
  return (
    <Layout>
      <Container>
        <Profile />
      </Container>
    </Layout>
  );
}
