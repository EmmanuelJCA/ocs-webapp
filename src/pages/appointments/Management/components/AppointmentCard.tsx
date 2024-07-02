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

import { Iconify } from '@/components';
import { AppointmentForm } from './AppointmentForm';
import { endDragging, startDragging } from '@/redux/features/ui';

export const AppointmentCard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onDragStart = () => {
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
      sx={{ marginBottom: 1, backgroundColor: theme.palette.grey[200] }}
    >
      <CardContent>
        <Chip
          sx={{ position: 'absolute', top: 10, right: 10 }}
          icon={<LocalHospital />}
          label={'San Lucas'}
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
                src={
                  'https://s3.us-east-1.amazonaws.com/ocsbucket/images/797e0d00-02a8-11ef-a995-ebafd2e80171.jpeg'
                }
                alt={`Emmanuel Cañate`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">Emmanuel Cañate</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  V-30749551
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
                <Typography variant="subtitle2">John Doe</Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  V-12233124
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
                - Dolor de cabeza
                <br />- Convulsiones
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
                - El paciente debe someterse a una resonancia magnética
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">Inicio: Mañana a las 8:00 p.m.</Typography>
            {/* <Typography variant="body2">Finalizó: Hoy a las 8:30 p.m.</Typography> */}
          </Box>
          <Box>
            <AppointmentForm
              // appointment={}
              triggerComponent={(props: object) => (
                <IconButton {...props}>
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              )}
            />
            <IconButton>
              <Iconify icon="solar:round-arrow-right-bold" />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
