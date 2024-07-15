import { FC } from 'react';
import {
  Box,
  Card,
  Stack,
  alpha,
  Container,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
  CardActions,
} from '@mui/material';

import { AppointmentCard } from '../../components';
import { Link as RouterLink } from '@/router/components';
import { Loader, Iconify, Breadcrumb } from '@/components';
import { useGetAppointmentQuery } from '@/redux/features/appointments';

interface Props {
  appointmentId: string | null;
}

export const AppointmentDetailsView: FC<Props> = ({ appointmentId }) => {
  const { data: appointment, isLoading } = useGetAppointmentQuery(appointmentId!, {
    skip: appointmentId === null,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box mb={{ xs: 2, md: 0 }}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          Cita médica
        </Typography>
        <Breadcrumb />
        <Stack flexDirection={{ xs: 'column', md: 'row' }} width={1} gap={3} pt={2}>
          <AppointmentCard appointment={appointment!} />
          <Card sx={{ width: 1 }}>
            <CardHeader title={'Diagnósticos'} />
            <CardContent sx={{ overflow: 'auto', maxHeight: 290 }}>
              <Typography>Diagnosticado en la cita</Typography>
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
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">Cancer de pulmón</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Etapa 1
                  </Typography>
                </Box>
              </Box>
              <Typography>Siguiendo</Typography>
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
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">Cancer de pulmon</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Etapa 1
                  </Typography>
                </Box>
              </Box>
              <Typography>Otros diagnósticos</Typography>
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
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">Cancer de pulmon</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Etapa 1
                  </Typography>
                </Box>
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
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">Cancer de pulmon</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Etapa 1
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Stack width={1} flexDirection="row" justifyContent="end">
                <IconButton component={RouterLink} href={`/appointments/managemen`}>
                  <Iconify icon="dashicons:plus-alt" />
                </IconButton>
              </Stack>
            </CardActions>
          </Card>
        </Stack>
        <Card sx={{ width: 1, mt: 2 }}>
          <CardHeader title={'Tratamientos'} />
          <CardContent></CardContent>
        </Card>
      </Box>
    </Container>
  );
};
