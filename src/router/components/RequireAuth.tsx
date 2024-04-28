import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { Role } from '@/types';
import { Loader } from '@/components';
import { useAppSelector } from '@/redux/store';
import { useMeQuery } from '@/redux/features/auth';

// ----------------------------------------------------------------------

interface Props {
  allowedRoles?: Role[];
  children: React.ReactNode;
}

export const RequireAuth: FC<Props> = ({ allowedRoles, children }) => {
  const userState = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useMeQuery(null, {
    skip: !!userState,
    refetchOnMountOrArgChange: true,
  });

  const user = userState ? userState : data;

  if (isLoading) return <Loader />;

  return user && (!allowedRoles || user.roles.some((role) => allowedRoles.includes(role))) ? (
    children
  ) : user ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};
