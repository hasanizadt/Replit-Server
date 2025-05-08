'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'urql';
import { initUrqlClient } from '@/lib/urql/client';

interface UrqlProviderProps {
  children: ReactNode;
}

export const UrqlProvider: React.FC<UrqlProviderProps> = ({ children }) => {
  const { client } = initUrqlClient();
  
  if (!client) {
    return null;
  }
  
  return (
    <Provider value={client}>
      {children}
    </Provider>
  );
};