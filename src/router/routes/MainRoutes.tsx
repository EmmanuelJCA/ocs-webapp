import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import MainLayout from '@/layouts/Main';
import { RequireAuth } from '@/router/components';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/Home'));

const MainRoutes: RouteObject = {
  path: '/',
  element: (
    <RequireAuth>
      <MainLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </MainLayout>
    </RequireAuth>
  ),
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};

export default MainRoutes;
