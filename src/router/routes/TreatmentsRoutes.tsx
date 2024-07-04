import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { RequireAuth } from '../components';
import { DashboardLayout } from '@/layouts/Dashboard';

// ----------------------------------------------------------------------

export const TreatmentsPage = lazy(() => import('@/pages/Treatments'));

const TreatmentsRoutes: RouteObject = {
  path: 'treatments',
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
      element: <TreatmentsPage />,
    },
  ],
};

export default TreatmentsRoutes;
