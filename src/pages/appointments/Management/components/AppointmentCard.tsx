import { FC, DragEvent } from 'react';
import { useDispatch } from 'react-redux';
import { ExpandMore, LocalHospital } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  alpha,
  Stack,
  Avatar,
  useTheme,
  Accordion,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Appointment } from '@/types';
import { Iconify } from '@/components';
import { formatDateTime } from '@/utils';
import { AppointmentForm } from './AppointmentForm';
import { Link as RouterLink } from '@/router/components';
import { endDragging, startDragging } from '@/redux/features/ui';

interface Props {
  appointment: Appointment;
}

export const AppointmentCard: FC<Props> = ({ appointment }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', appointment.id);
    dispatch(startDragging());
  };

  const onDragEnd = () => {
    dispatch(endDragging());
  };

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{ width: 1, marginBottom: 1, backgroundColor: theme.palette.grey[200] }}
    >
      <CardContent>
        <Chip
          sx={{ position: 'absolute', top: 10, right: 10 }}
          icon={<LocalHospital />}
          label={appointment.oncologyCenter.name}
          color="primary"
          variant="outlined"
        />
        <Box marginTop={4}>
          <Box display="flex" flexDirection="column" gap={1.5} paddingY={1}>
            <Box
              sx={{
                py: 1,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Avatar
                src={appointment.physician.avatar}
                alt={`${appointment.physician.firstName} ${appointment.physician.lastName}`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {appointment.physician.firstName} {appointment.physician.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {appointment.physician.identification}
                </Typography>
              </Box>
              <Iconify icon="maki:doctor" width={30} sx={{ position: 'absolute', right: 30 }} />
            </Box>
            <Box
              sx={{
                py: 1,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Avatar src={'/assets/illustrations/patient.png'} alt={`John Doe`} />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {appointment.patient.identification}
                </Typography>
              </Box>
              <Iconify
                icon="material-symbols-light:inpatient-outline"
                width={30}
                sx={{ position: 'absolute', right: 30 }}
              />
            </Box>
            <Box>
              <Typography>Razones de la cita:</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {appointment.reasons.map((reason) => (
                  <>
                    - {reason.description}
                    <br />
                  </>
                ))}
              </Typography>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Notas
              </AccordionSummary>
              <AccordionDetails>
                {appointment.notes ? appointment.notes : 'No hay notas.'}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">
              Inicio: {formatDateTime(appointment.startDateTime)}
            </Typography>
            {appointment.endDateTime && (
              <Typography variant="body2">
                Finalizó: {formatDateTime(appointment.startDateTime)}
              </Typography>
            )}
          </Box>
          <Box>
            <AppointmentForm
              appointment={appointment}
              triggerComponent={(props: object) => (
                <IconButton {...props}>
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              )}
            />
            <IconButton
              component={RouterLink}
              href={`/appointments/management/${appointment.id}/details`}
            >
              <Iconify icon="solar:round-arrow-right-bold" />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
