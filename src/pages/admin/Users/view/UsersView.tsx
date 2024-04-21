import { AddOutlined } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';

import { Loader } from '@/components';
import { UsersTable } from '../components';
import { useGetUsersQuery } from '@/redux/features';

const UserView = () => {
  const { data = [], isLoading } = useGetUsersQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" fontWeight="regular" my={2}>
        Administrador de Usuarios
      </Typography>
      <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }}>
        Crear Usuario
      </Button>
      <UsersTable users={data} />
    </Container>
  );
};

export default UserView;
