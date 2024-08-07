import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Role } from '@/types';
import { RequireAuth } from '../components';
import { DashboardLayout } from '@/layouts/Dashboard';

// ----------------------------------------------------------------------

export const AppointmentManagementPage = lazy(() => import('@/pages/appointments/Management'));
export const AppointmentDetailsPage = lazy(() => import('@/pages/appointments/Management/Details'));

const AppointmentsRoutes: RouteObject = {
  path: 'appointments',
  element: (
    <RequireAuth
      allowedRoles={[
        Role.SUPER_ADMINISTRATOR,
        Role.ADMINISTRATOR,
        Role.ONCOLOGIST,
        Role.RADIONCOLOGIST,
      ]}
    >
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    </RequireAuth>
  ),
  children: [
    {
      path: 'management',
      element: <AppointmentManagementPage />,
    },
    {
      path: 'management/:appointmentId/details',
      element: <AppointmentDetailsPage />,
    },
  ],
};

export default AppointmentsRoutes;
