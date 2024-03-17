import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Role } from '@/types';
import { RequireAuth } from '../components';
import DashboardLayout from '@/layouts/Dashboard';

// ----------------------------------------------------------------------

export const UsersPage = lazy(() => import('@/pages/admin/Users'));

const AdminRoutes: RouteObject = {
  path: 'admin',
  element: (
    <RequireAuth allowedRoles={[Role.SUPER_ADMINISTRATOR, Role.ADMINISTRATOR]}>
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    </RequireAuth>
  ),
  children: [
    {
      path: 'users',
      element: <UsersPage />,
    },
  ],
};

export default AdminRoutes;
