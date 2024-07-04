import { useRoutes } from 'react-router-dom';

import {
  AuthRoutes,
  MainRoutes,
  AdminRoutes,
  ErrorRoutes,
  TreatmentsRoutes,
  AppointmentsRoutes,
} from './routes';

// ----------------------------------------------------------------------

export const Router = () => {
  const routes = useRoutes([
    AdminRoutes,
    AuthRoutes,
    AppointmentsRoutes,
    TreatmentsRoutes,
    MainRoutes,
    ErrorRoutes,
  ]);

  return routes;
};
