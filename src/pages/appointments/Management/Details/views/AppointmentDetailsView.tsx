import { FC, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Card,
  Stack,
  alpha,
  Checkbox,
  Container,
  Accordion,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { formatDateTime } from '@/utils';
import { DiagnosticForm } from '../components';
import { Treatment, Diagnostic } from '@/types';
import { AppointmentCard } from '../../components';
import { SessionsView } from '../components/SessionsView';
import { Loader, Iconify, Breadcrumb } from '@/components';
import { TreatmentsTable } from '../components/TreatmentsTable';
import { useGetDiagnosticsQuery } from '@/redux/features/diagnostics';
import {
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
} from '@/redux/features/appointments';

interface Props {
  appointmentId: string | null;
}

export const AppointmentDetailsView: FC<Props> = ({ appointmentId }) => {
  const { data: appointment, isLoading: isLoadingAppointment } = useGetAppointmentQuery(
    appointmentId!,
    {
      skip: appointmentId === null,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: diagnostics = [] } = useGetDiagnosticsQuery(appointment?.patient.id, {
    selectFromResult: ({ data }) => ({
      data: data?.filter(
        (diagnostic) =>
          appointment?.diagnostics.filter((d) => d.id == diagnostic.id).length == 0 &&
          appointment?.monitoredDiagnostics.filter((d) => d.id == diagnostic.id).length == 0
      ),
    }),
    skip: appointment === undefined,
    refetchOnMountOrArgChange: true,
  });

  const [updateAppointment] = useUpdateAppointmentMutation();

  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic>();

  const [selectedTreatment, setselectedTreatment] = useState<Treatment>();

  const handleFollowDiagnostic = async (diagnosticId: string) => {
    if (!appointment) return;
    const monitoredDiagnostics = appointment.monitoredDiagnostics.map(
      (diagnostic) => diagnostic.id
    );
    const appointmentToUpdate = {
      id: appointment?.id,
      monitoredDiagnosticsIds: [...monitoredDiagnostics, diagnosticId],
    };

    await updateAppointment(appointmentToUpdate);
  };
  const handleUnFollowDiagnostic = async (diagnosticId: string) => {
    if (!appointment) return;
    const monitoredDiagnostics = appointment.monitoredDiagnostics.filter(
      (diagnostic) => diagnostic.id !== diagnosticId
    );
    const appointmentToUpdate = {
      id: appointment?.id,
      monitoredDiagnosticsIds: monitoredDiagnostics.map((diagnostic) => diagnostic.id),
    };

    await updateAppointment(appointmentToUpdate);
  };

  if (isLoadingAppointment) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Cita médica
        </Typography>
        <Breadcrumb />
        <Stack flexDirection={{ xs: 'column', md: 'row' }} width={1} gap={3} my={2}>
          <AppointmentCard appointment={appointment!} />
          <Card sx={{ width: 1 }}>
            <CardHeader title={'Diagnósticos'} />
            <CardContent sx={{ overflow: 'auto', maxHeight: 290 }}>
              <Typography>Diagnosticado en la cita</Typography>
              {appointment?.diagnostics.map((diagnostic) => (
                <Box
                  key={diagnostic.id}
                  sx={{
                    my: 1,
                    py: 1,
                    px: 2.5,
                    borderRadius: 1.5,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                  }}
                >
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row">
                      <Checkbox
                        checked={diagnostic.id === selectedDiagnostic?.id}
                        onChange={(event) => {
                          event.target.checked
                            ? setSelectedDiagnostic(diagnostic)
                            : setSelectedDiagnostic(undefined);
                        }}
                      />
                      <Typography variant="subtitle2">
                        {diagnostic.cancerType.name}
                        <br />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {diagnostic.cancerStage.name}
                        </Typography>
                      </Typography>
                    </Stack>
                    <DiagnosticForm
                      diagnostic={diagnostic}
                      triggerComponent={(props: object) => (
                        <IconButton {...props}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      )}
                    />
                  </Stack>
                  <Accordion sx={{ my: 1 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Notas
                    </AccordionSummary>
                    <AccordionDetails>
                      {diagnostic.notes ? diagnostic.notes : 'No hay notas.'}
                    </AccordionDetails>
                  </Accordion>
                  <Typography variant="body2">
                    Diagnosticado el: {formatDateTime(appointment.startDateTime)}
                  </Typography>
                  {appointment.endDateTime && (
                    <Typography variant="body2">
                      Cerrado el: {formatDateTime(appointment.startDateTime)}
                    </Typography>
                  )}
                </Box>
              ))}
              {appointment?.diagnostics.length === 0 && (
                <Typography variant="subtitle2">
                  No se han registrado diagnósticos en ésta cita.
                </Typography>
              )}
              <Typography mt={2}>Seguimiento de diagnósticos previos</Typography>
              {appointment?.monitoredDiagnostics.map((diagnostic) => (
                <Box
                  key={diagnostic.id}
                  sx={{
                    my: 1,
                    py: 1,
                    px: 2.5,
                    borderRadius: 1.5,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                  }}
                >
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row">
                      <Checkbox
                        checked={diagnostic.id === selectedDiagnostic?.id}
                        onChange={(event) => {
                          event.target.checked
                            ? setSelectedDiagnostic(diagnostic)
                            : setSelectedDiagnostic(undefined);
                        }}
                      />
                      <Typography variant="subtitle2">
                        {diagnostic.cancerType.name}
                        <br />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {diagnostic.cancerStage.name}
                        </Typography>
                      </Typography>
                    </Stack>
                    <Box>
                      <IconButton onClick={() => handleUnFollowDiagnostic(diagnostic.id)}>
                        <Iconify icon="fa6-solid:arrow-turn-down" />
                      </IconButton>
                      <DiagnosticForm
                        diagnostic={diagnostic}
                        triggerComponent={(props: object) => (
                          <IconButton {...props}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        )}
                      />
                    </Box>
                  </Stack>
                  <Accordion sx={{ my: 1 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Notas
                    </AccordionSummary>
                    <AccordionDetails>
                      {diagnostic.notes ? diagnostic.notes : 'No hay notas.'}
                    </AccordionDetails>
                  </Accordion>
                  <Typography variant="body2">
                    Diagnosticado el: {formatDateTime(appointment.startDateTime)}
                  </Typography>
                  {appointment.endDateTime && (
                    <Typography variant="body2">
                      Cerrado el: {formatDateTime(appointment.startDateTime)}
                    </Typography>
                  )}
                </Box>
              ))}
              {appointment?.monitoredDiagnostics.length === 0 && (
                <Typography variant="subtitle2">
                  No se está haciendo seguimiento de diagnósticos previos.
                </Typography>
              )}
              <Typography mt={2}>Otros diagnósticos</Typography>
              {diagnostics.map((diagnostic) => (
                <Box
                  key={diagnostic.id}
                  sx={{
                    my: 1,
                    py: 1,
                    px: 2.5,
                    borderRadius: 1.5,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                  }}
                >
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row">
                      <Checkbox
                        checked={diagnostic.id === selectedDiagnostic?.id}
                        onChange={(event) => {
                          event.target.checked
                            ? setSelectedDiagnostic(diagnostic)
                            : setSelectedDiagnostic(undefined);
                        }}
                      />
                      <Typography variant="subtitle2">
                        {diagnostic.cancerType.name}
                        <br />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {diagnostic.cancerStage.name}
                        </Typography>
                      </Typography>
                    </Stack>
                    <Box>
                      <IconButton onClick={() => handleFollowDiagnostic(diagnostic.id)}>
                        <Iconify icon="fa6-solid:arrow-turn-up" />
                      </IconButton>
                      <DiagnosticForm
                        diagnostic={diagnostic}
                        triggerComponent={(props: object) => (
                          <IconButton {...props}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        )}
                      />
                    </Box>
                  </Stack>
                  <Accordion sx={{ my: 1 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Notas
                    </AccordionSummary>
                    <AccordionDetails>
                      {diagnostic.notes ? diagnostic.notes : 'No hay notas.'}
                    </AccordionDetails>
                  </Accordion>
                  {appointment && (
                    <Typography variant="body2">
                      Diagnosticado el: {formatDateTime(appointment.startDateTime)}
                    </Typography>
                  )}
                  {appointment?.endDateTime && (
                    <Typography variant="body2">
                      Cerrado el: {formatDateTime(appointment.startDateTime)}
                    </Typography>
                  )}
                </Box>
              ))}
              {diagnostics.length === 0 && (
                <Typography variant="subtitle2">
                  El paciente no posee diagnósticos previos.
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Stack width={1} flexDirection="row" justifyContent="end">
                <DiagnosticForm
                  appointmentId={appointmentId!}
                  triggerComponent={(props: object) => (
                    <IconButton {...props}>
                      <Iconify icon="dashicons:plus-alt" />
                    </IconButton>
                  )}
                />
              </Stack>
            </CardActions>
          </Card>
        </Stack>
        {selectedDiagnostic && (
          <TreatmentsTable
            diagnostic={selectedDiagnostic}
            selectedTreatment={selectedTreatment}
            setSelectedTreatment={setselectedTreatment}
          />
        )}

        {selectedTreatment && <SessionsView treatment={selectedTreatment} />}
      </Box>
    </Container>
  );
};
