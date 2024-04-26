import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { UsersTable } from '../components';
import { Link } from '@/router/components';
import { Loader, Breadcrumb } from '@/components';
import { useGetUsersQuery } from '@/redux/features';

export const UsersView = () => {
  const { data = [], isLoading } = useGetUsersQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Usuarios
        </Typography>
        <Breadcrumb />
      </Box>
      <Button
        href="/admin/users/new"
        LinkComponent={Link}
        startIcon={<AddOutlined />}
        sx={{ ml: 'auto', mb: 2 }}
      >
        Crear Usuario
      </Button>
      <UsersTable users={data} />
    </Container>
  );
};
