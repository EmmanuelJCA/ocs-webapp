import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { Loader, Breadcrumb } from '@/components';
import { useGetPatientsQuery } from '@/redux/features';
import { PatientForm, PatientsTable } from '../components';

const CreatePatientButton = (props: object) => {
  return (
    <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }} {...props}>
      Registrar paciente
    </Button>
  );
};

export const PatientsView = () => {
  const { data = [], isLoading } = useGetPatientsQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Pacientes
        </Typography>
        <Breadcrumb />
      </Box>
      <PatientForm triggerComponent={CreatePatientButton} />
      <PatientsTable patients={data} />
    </Container>
  );
};
