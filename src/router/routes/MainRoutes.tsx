import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { RequireAuth } from '@/router/components';
import { DashboardLayout } from '@/layouts/Dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@/pages/Home'));

const MainRoutes: RouteObject = {
  path: '/',
  element: (
    <RequireAuth>
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
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
