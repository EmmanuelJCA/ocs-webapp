import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { Link } from '@/router/components';
import { PhysicianTable } from '../components';
import { Loader, Breadcrumb } from '@/components';
import { useGetPhysiciansQuery } from '@/redux/features';

export const PhysiciansView = () => {
  const { data = [], isLoading } = useGetPhysiciansQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Oncólogos
        </Typography>
        <Breadcrumb />
      </Box>
      <Button
        href="/admin/physicians/new"
        LinkComponent={Link}
        startIcon={<AddOutlined />}
        sx={{ ml: 'auto', mb: 2 }}
      >
        Crear Oncólogo
      </Button>
      <PhysicianTable physician={data} />
    </Container>
  );
};
