import { RouteObject } from 'react-router-dom';

// ----------------------------------------------------------------------

const ErrorRoutes: RouteObject = {
  path: '*',
  element: <>404</>,
};

export default ErrorRoutes;
