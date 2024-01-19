import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { Role } from '@/types';
import { useAppSelector } from '@/redux/store';
import { useMeQuery } from '@/redux/features/auth';

// ----------------------------------------------------------------------

interface Props {
  allowedRoles?: Role[];
  children: React.ReactNode;
}

const RequireAuth: FC<Props> = ({ allowedRoles, children }) => {
  const userState = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useMeQuery(null, {
    skip: !!userState,
    refetchOnMountOrArgChange: true,
  });

  const user = userState ? userState : data;

  if (isLoading) return <>Loading...</>;

  return user && (!allowedRoles || allowedRoles.includes(user.role)) ? (
    children
  ) : user ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};

export default RequireAuth;
