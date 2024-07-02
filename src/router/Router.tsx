import { useRoutes } from 'react-router-dom';

import { AuthRoutes, MainRoutes, AdminRoutes, ErrorRoutes, AppointmentsRoutes } from './routes';

// ----------------------------------------------------------------------

export const Router = () => {
  const routes = useRoutes([AdminRoutes, AuthRoutes, AppointmentsRoutes, MainRoutes, ErrorRoutes]);

  return routes;
};
