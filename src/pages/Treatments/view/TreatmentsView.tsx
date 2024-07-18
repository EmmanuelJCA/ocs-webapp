import { Box, Card, Grid, Container, CardHeader, Typography } from '@mui/material';

import { Breadcrumb } from '@/components';
import { TreatmentList } from '../components';
import { useGetTreatmentsQuery } from '@/redux/features';

export const TreatmentsView = () => {
  const { data = [] } = useGetTreatmentsQuery(undefined);

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Gestión de tratamientos oncológicos
        </Typography>
        <Breadcrumb />
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Pendientes" />
              <TreatmentList status="pending" treatments={data} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="En Progreso" />
              <TreatmentList status="inProgress" treatments={data} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Completadas" />
              <TreatmentList status="completed" treatments={data} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
