import { FC } from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  alpha,
  Stack,
  Avatar,
  Checkbox,
  Accordion,
  CardHeader,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from '@/components';
import { formatDateTime } from '@/utils';
import { Treatment, Diagnostic } from '@/types';
import { useGetTreatmentsQuery } from '@/redux/features';
import { TreatmentForm } from '@/pages/Treatments/components';

interface Props {
  diagnostic: Diagnostic;
  selectedTreatment?: Treatment;
  setSelectedTreatment: React.Dispatch<React.SetStateAction<Treatment | undefined>>;
}

export const TreatmentsTable: FC<Props> = ({
  diagnostic,
  selectedTreatment,
  setSelectedTreatment,
}) => {
  const { data: treatments = [] } = useGetTreatmentsQuery(diagnostic.id);

  return (
    <Card sx={{ width: 1 }}>
      <CardHeader
        title={`Tratamientos: ${diagnostic.cancerType.name} - ${diagnostic.cancerStage.name}`}
      />
      <CardContent sx={{ overflow: 'auto', maxHeight: 290 }}>
        {treatments.map((treatment, i) => (
          <Box
            key={treatment.id}
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
                  checked={treatment.id === selectedTreatment?.id}
                  onChange={(event) => {
                    event.target.checked
                      ? setSelectedTreatment(treatment)
                      : setSelectedTreatment(undefined);
                  }}
                />
                <Typography variant="subtitle2">
                  Tratamiento #{i + 1} {treatment.type.name}
                  <br />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {treatment.oncologyCenter.name}
                  </Typography>
                </Typography>
              </Stack>
              <TreatmentForm
                diagnostic={diagnostic}
                treatment={treatment}
                triggerComponent={(props: object) => (
                  <IconButton {...props}>
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                )}
              />
            </Stack>
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
              <Chip
                sx={{ position: 'absolute', right: 60 }}
                icon={<Iconify icon="maki:doctor" width={30} />}
                label={treatment.physician.specializations.map((s) => (
                  <>
                    - {s.name} <br />
                  </>
                ))}
                color="success"
                variant="outlined"
              />
            </Box>
            <Accordion sx={{ my: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Instrucciones
              </AccordionSummary>
              <AccordionDetails>
                {treatment.instructions ? treatment.instructions : 'No hay instrucciones.'}
              </AccordionDetails>
            </Accordion>
            <Typography variant="body2">
              Inicio: {formatDateTime(treatment.startDateTime)}
            </Typography>
            {treatment.endDateTime && (
              <Typography variant="body2">
                Cerrado el: {formatDateTime(treatment.startDateTime)}
              </Typography>
            )}
          </Box>
        ))}
        {treatments.length === 0 && (
          <Typography variant="subtitle2">
            No se han registrado tratamientos en ésta diagnostico.
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Stack width={1} flexDirection="row" justifyContent="end">
          <TreatmentForm
            diagnostic={diagnostic}
            triggerComponent={(props: object) => (
              <IconButton {...props}>
                <Iconify icon="dashicons:plus-alt" />
              </IconButton>
            )}
          />
        </Stack>
      </CardActions>
    </Card>
  );
};
