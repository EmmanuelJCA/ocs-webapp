import { useRoutes } from 'react-router-dom';

import { AuthRoutes, MainRoutes, AdminRoutes, ErrorRoutes } from './routes';

// ----------------------------------------------------------------------

export const Router = () => {
  const routes = useRoutes([AdminRoutes, AuthRoutes, MainRoutes, ErrorRoutes]);

  return routes;
};
