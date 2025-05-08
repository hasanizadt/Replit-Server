
'use client';

import { Provider } from 'urql';
import { useClient } from '../urql/client';

export default function UrqlProvider({ 
  children,
  pageProps
}: { 
  children: React.ReactNode;
  pageProps?: any;
}) {
  const client = useClient(pageProps);
  
  return (
    <Provider value={client}>
      {children}
    </Provider>
  );
}
