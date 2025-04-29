import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'app/router';
import './index.css';
import { QueryProvider } from 'app/providers/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryProvider>,
);
