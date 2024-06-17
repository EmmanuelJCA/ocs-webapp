import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { CancerTable } from '../components';
import { Loader, Breadcrumb } from '@/components';
import { useGetCancerTypesQuery } from '@/redux/features';
import { CancerForm } from '../components/CancerForm/CancerForm';

const CreateCancerButton = (props: object) => {
  return (
    <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }} {...props}>
      Crear Tipo de cáncer
    </Button>
  );
};

export const CancerView = () => {
  const { data = [], isLoading } = useGetCancerTypesQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Tipos de cáncer
        </Typography>
        <Breadcrumb />
      </Box>
      <CancerForm triggerComponent={CreateCancerButton} />
      <CancerTable cancer={data} />
    </Container>
  );
};
