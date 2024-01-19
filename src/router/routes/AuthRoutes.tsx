import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

// ----------------------------------------------------------------------

export const SignInPage = lazy(() => import('@/pages/auth/SignIn'));

const AuthRoutes: RouteObject = {
  path: 'auth',
  element: (
    <Suspense>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'signin',
      element: <SignInPage />,
    },
  ],
};

export default AuthRoutes;
