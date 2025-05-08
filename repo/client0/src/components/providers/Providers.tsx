'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import React, { ReactNode } from 'react';
import { UrqlProvider } from './UrqlProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UrqlProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </UrqlProvider>
  );
};

export default Providers;