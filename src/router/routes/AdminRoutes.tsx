import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Role } from '@/types';
import { RequireAuth } from '../components';
import { DashboardLayout } from '@/layouts/Dashboard';

// ----------------------------------------------------------------------

export const UsersPage = lazy(() => import('@/pages/admin/Users'));
export const UserPage = lazy(() => import('@/pages/admin/Users/User'));
export const OncologyCentersPage = lazy(() => import('@/pages/admin/OncologyCenters'));
export const PhysiciansPage = lazy(() => import('@/pages/admin/Physicians'));
export const PhysicianPage = lazy(() => import('@/pages/admin/Physicians/Physician'));

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
    {
      path: 'users/new',
      element: <UserPage />,
    },
    {
      path: 'users/:userId/edit',
      element: <UserPage />,
    },
    {
      path: 'oncology-centers',
      element: <OncologyCentersPage />,
    },
    {
      path: 'physicians',
      element: <PhysiciansPage />,
    },
    {
      path: 'physicians/new',
      element: <PhysicianPage />,
    },
    {
      path: 'physicians/:physicianId/edit',
      element: <PhysicianPage />,
    },
  ],
};

export default AdminRoutes;
