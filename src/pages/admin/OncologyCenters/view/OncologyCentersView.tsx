import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { Loader, Breadcrumb } from '@/components';
import { OncologyCentersTable } from '../components';
import { useGetOncologyCentersUsersQuery } from '@/redux/features';
import { OncologyCenterForm } from '../components/OncologyCenterForm/OncologyCenterForm';

const CreateOncologyCenterButton = (props: object) => {
  return (
    <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }} {...props}>
      Crear centro oncologico
    </Button>
  );
};

export const OncologyCentersView = () => {
  const { data = [], isLoading } = useGetOncologyCentersUsersQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Centros oncológicos
        </Typography>
        <Breadcrumb />
      </Box>
      <OncologyCenterForm triggerComponent={CreateOncologyCenterButton} />
      <OncologyCentersTable oncologyCenters={data} />
    </Container>
  );
};
