import { Add } from '@mui/icons-material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Fab,
  Card,
  Grid,
  Stack,
  Container,
  TextField,
  CardHeader,
  Typography,
  Autocomplete,
} from '@mui/material';

import { Breadcrumb } from '@/components';
import { TreatmentList } from '../components';
import { TreatmentForm } from '../components/TreatmentsForm';
import { useGetAppointmentsQuery } from '@/redux/features/appointments';

const AddTreatmentButton = (props: object) => {
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
      <Typography variant="caption">Agregar tratamiento</Typography>
    </Fab>
  );
};

export const TreatmentsView = () => {
  const { data = [] } = useGetAppointmentsQuery();

  console.log(data);

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Gestión de tratamientos oncológicos
        </Typography>
        <Breadcrumb />
        <Stack flexDirection={{ xs: 'column', md: 'row' }} width={1} my={2} gap={1}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker
              label="Rango de fechas"
              disableFuture
              sx={{ width: 1 }}
              slotProps={{
                actionBar: {
                  actions: ['clear'],
                },
              }}
            />
          </LocalizationProvider>
          <Autocomplete
            multiple
            sx={{ width: 1 }}
            limitTags={1}
            disableCloseOnSelect
            options={['Dolor de cabeza', 'Seguimiento']}
            renderInput={(params) => <TextField {...params} label="Tipo de tratamiento" />}
          />
          <Autocomplete
            multiple
            sx={{ width: 1 }}
            limitTags={1}
            disableCloseOnSelect
            options={['San Lucas']}
            renderInput={(params) => <TextField {...params} label="Centros oncológicos" />}
          />
          <Autocomplete
            multiple
            sx={{ width: 1 }}
            limitTags={1}
            disableCloseOnSelect
            options={['Emmanuel Cañate']}
            renderInput={(params) => <TextField {...params} label="Médicos" />}
          />
          <Autocomplete
            multiple
            sx={{ width: 1 }}
            limitTags={1}
            disableCloseOnSelect
            options={['John Doe']}
            renderInput={(params) => <TextField {...params} label="Pacientes" />}
          />
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Pendientes" />
              <TreatmentList showCard />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="En Progreso" />
              <TreatmentList />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 250px )' }}>
              <CardHeader title="Completadas" />
              <TreatmentList />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <TreatmentForm triggerComponent={AddTreatmentButton} />
    </Container>
  );
};
