import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { SuppliesTable } from '../components';
import { Loader, Breadcrumb } from '@/components';
import { useGetSuppliesQuery } from '@/redux/features';
import { SuppliesForm } from '../components/SuppliesForm';

const CreateSuppliesButton = (props: object) => {
  return (
    <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }} {...props}>
      Registrar Insumo
    </Button>
  );
};

export const SuppliesView = () => {
  const { data = [], isLoading } = useGetSuppliesQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Administrador de Insumos
        </Typography>
        <Breadcrumb />
      </Box>
      <SuppliesForm triggerComponent={CreateSuppliesButton} />
      <SuppliesTable supplies={data} />
    </Container>
  );
};
