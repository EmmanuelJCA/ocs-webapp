import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { Link } from '@/router/components';
import { Loader, Breadcrumb } from '@/components';
import { PhysicianSupportsTable } from '../components';
import { useGetPhysicianSupportsQuery } from '@/redux/features';

export const PhysicianSupportsView = () => {
  const { data = [], isLoading } = useGetPhysicianSupportsQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de ayudantes oncológicos
        </Typography>
        <Breadcrumb />
      </Box>
      <Button
        href="/admin/physicians-supports/new"
        LinkComponent={Link}
        startIcon={<AddOutlined />}
        sx={{ ml: 'auto', mb: 2 }}
      >
        Crear Ayudante Oncológico
      </Button>
      <PhysicianSupportsTable physicianSupports={data} />
    </Container>
  );
};
