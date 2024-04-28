import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

import { UserForm } from '../components';
import { Loader, Breadcrumb } from '@/components';
import { useGetUserQuery } from '@/redux/features';

// ----------------------------------------------------------------------

interface Props {
  userId: string | null;
}

const UserView: FC<Props> = ({ userId }) => {
  const { data, isLoading } = useGetUserQuery(userId!, {
    skip: userId === null,
    refetchOnMountOrArgChange: true,
  });

  const action = data ? 'Editar' : 'Crear';

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl">
      <Box mb={5}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          {action} Usuario
        </Typography>
        <Breadcrumb />
      </Box>
      <UserForm user={data} />
    </Container>
  );
};

export default UserView;
