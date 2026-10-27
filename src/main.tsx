import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// The QueryClient holds the cache for all queries in the app.
// retry: false makes errors show immediately (default is 3 retries),
// which is nicer while learning.
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// The ! after getElementById('root') tells TypeScript “this element definitely exists”.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Any component inside this provider can use useQuery / useMutation */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);