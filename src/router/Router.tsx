import { useRoutes } from 'react-router-dom';

import { AuthRoutes, MainRoutes, AdminRoutes, ErrorRoutes } from './routes';

// ----------------------------------------------------------------------

const Router = () => {
  const routes = useRoutes([AdminRoutes, AuthRoutes, MainRoutes, ErrorRoutes]);

  return routes;
};

export default Router;
