import { FC, DragEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Vaccines, ExpandMore, LocalHospital } from '@mui/icons-material';
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

import { Treatment } from '@/types';
import { Iconify } from '@/components';
import { formatDateTime } from '@/utils';
import { SessionsModal } from './SessionsModal';
import { endDragging, startDragging } from '@/redux/features/ui';

interface Props {
  treatment: Treatment;
}

export const TreatmentCard: FC<Props> = ({ treatment }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', treatment.id);
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
          sx={{ position: 'absolute', top: 10, left: 10 }}
          icon={<Vaccines />}
          label={treatment.type.name}
          color="warning"
          variant="outlined"
        />
        <Chip
          sx={{ position: 'absolute', top: 10, right: 10 }}
          icon={<LocalHospital />}
          label={treatment.oncologyCenter.name}
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
                src={treatment.physician.avatar}
                alt={`${treatment.physician.firstName} ${treatment.physician.lastName}`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {treatment.physician.firstName} {treatment.physician.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {treatment.physician.identification}
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
              <Avatar
                src={'/assets/illustrations/patient.png'}
                alt={`${treatment.patient.firstName} ${treatment.patient.lastName}`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {treatment.patient.firstName} {treatment.patient.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {treatment.patient.identification}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography>Sesiones programadas: {treatment.sessions}</Typography>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Instrucciones
              </AccordionSummary>
              <AccordionDetails sx={{ maxHeight: 180, overflowY: 'auto' }}>
                {treatment.instructions}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">
              Inicio: {formatDateTime(treatment.startDateTime)}
            </Typography>
            {treatment.endDateTime && (
              <Typography variant="body2">
                Finalizó: {formatDateTime(treatment.startDateTime)}
              </Typography>
            )}
          </Box>
          <Box>
            <SessionsModal
              treatment={treatment}
              triggerComponent={(props: object) => (
                <IconButton {...props}>
                  <Iconify icon="solar:eye-bold" />
                </IconButton>
              )}
            />
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
