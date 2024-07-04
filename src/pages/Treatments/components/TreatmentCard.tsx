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

import { Iconify } from '@/components';
import { SessionsModal } from './SessionsModal';
import { TreatmentForm } from './TreatmentsForm';
import { endDragging, startDragging } from '@/redux/features/ui';

export const TreatmentCard = () => {
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
          sx={{ position: 'absolute', top: 10, left: 10 }}
          icon={<Vaccines />}
          label={'Radioterapia'}
          color="warning"
          variant="outlined"
        />
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
              <Chip
                sx={{ position: 'absolute', right: 30 }}
                icon={<Iconify icon="material-symbols-light:inpatient-outline" width={30} />}
                label={'Garganta'}
                color="error"
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography>Sesiones programadas: 5</Typography>
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
                1. Dosis y fraccionamiento:
                <br /> - Dosificación total: 70 Gy
                <br /> - Fraccionamiento: 35 fracciones
                <br /> - Dosis por fracción: 2 Gy
                <br /> 2. Técnica de tratamiento:
                <br /> - Tipo de radioterapia: Radioterapia externa
                <br /> - Energía de los haces: 6 MV
                <br /> - Campos de tratamiento: Campo lateral derecho
                <br /> - Posicionamiento del paciente: Decúbito supino con cabeza inmovilizada
                <br /> 3. Órganos en riesgo:
                <br /> - Órganos críticos a preservar: Médula espinal, glándulas salivales
                <br /> - Restricciones de dosis: Dosis máxima permitida en médula espinal: 45 Gy; en
                glándulas salivales: 30 Gy
                <br /> 4. Control y seguimiento:
                <br /> - Programa de control de calidad: Control semanal de la precisión del
                posicionamiento
                <br /> - Seguimiento del paciente: Evaluación clínica semanal y consulta médica al
                final del tratamiento
                <br /> 5. Instrucciones adicionales:
                <br /> - Precauciones generales: Evitar alimentos muy calientes o picantes durante
                el tratamiento
                <br /> - Efectos secundarios esperados: Mucositis, disfagia; mantener una buena
                hidratación y seguir una dieta blanda
                <br /> Por favor, seguir estas instrucciones detalladamente para garantizar la
                correcta administración del tratamiento de radioterapia en el cáncer de garganta. En
                caso de dudas o complicaciones, contactar al oncólogo radioterapeuta responsable del
                caso.
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">Inicio: 18 de Julio a las 9:00 a.m.</Typography>
            {/* <Typography variant="body2">Finalizó: Hoy a las 8:30 p.m.</Typography> */}
          </Box>
          <Box>
            <TreatmentForm
              // appointment={}
              triggerComponent={(props: object) => (
                <IconButton {...props}>
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              )}
            />
            <SessionsModal
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
