import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import DashboardLayout from '@/layouts/Dashboard';
import { RequireAuth } from '@/router/components';

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
