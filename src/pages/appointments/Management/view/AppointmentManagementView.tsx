import { Add } from '@mui/icons-material';
import { Box, Fab, Card, Grid, Container, CardHeader, Typography } from '@mui/material';

import { Breadcrumb } from '@/components';
import { AppointmentList } from '../components';
import { AppointmentForm } from '../components/AppointmentForm';
import { useGetAppointmentsQuery } from '@/redux/features/appointments';

const AddAppointmentButton = (props: object) => {
  return (
    <Fab
      color="primary"
      variant="extended"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 10,
      }}
      {...props}
    >
      <Add />
      <Typography variant="caption">Agregar Cita</Typography>
    </Fab>
  );
};

export const AppointmentManagementView = () => {
  const { data = [] } = useGetAppointmentsQuery();

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Gestión de citas médicas
        </Typography>
        <Breadcrumb />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Pendientes" />
              <AppointmentList status="pending" appointments={data} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="En Progreso" />
              <AppointmentList status="inProgress" appointments={data} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Completadas" />
              <AppointmentList status="completed" appointments={data} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <AppointmentForm triggerComponent={AddAppointmentButton} />
    </Container>
  );
};
