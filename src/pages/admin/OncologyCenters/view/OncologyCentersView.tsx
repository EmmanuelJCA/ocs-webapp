import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { Link } from '@/router/components';
import { Loader, Breadcrumb } from '@/components';
import { OncologyCentersTable } from '../components';
import { useGetOncologyCentersQuery } from '@/redux/features';

export const OncologyCentersView = () => {
  const { data = [], isLoading } = useGetOncologyCentersQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Centros oncológicos
        </Typography>
        <Breadcrumb />
      </Box>
      <Button
        href="/admin/oncology-centers/new"
        LinkComponent={Link}
        startIcon={<AddOutlined />}
        sx={{ ml: 'auto', mb: 2 }}
      >
        Crear Centro oncológico
      </Button>
      <OncologyCentersTable oncologyCenters={data} />
    </Container>
  );
};
