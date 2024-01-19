import { useRoutes } from 'react-router-dom';

import { AuthRoutes, MainRoutes, ErrorRoutes } from './routes';

// ----------------------------------------------------------------------

const Router = () => {
  const routes = useRoutes([AuthRoutes, MainRoutes, ErrorRoutes]);

  return routes;
};

export default Router;
