import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Card,
  Chip,
  alpha,
  Stack,
  Paper,
  Table,
  Avatar,
  Button,
  useTheme,
  TableRow,
  Accordion,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from '@/components';
import { TreatmentSessions } from '@/types';
import { formatDateTime, httpErrorHandler } from '@/utils';
import { useUpdateSessionMutation } from '@/redux/features';
import { PartialSessionsSchema, PartialSessionsRequest } from '@/schemas/sessions';

interface Props {
  session: TreatmentSessions;
}

export const SessionCard: FC<Props> = ({ session }) => {
  const theme = useTheme();
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartialSessionsRequest>({
    resolver: zodResolver(PartialSessionsSchema),
    defaultValues: {
      startDateTime: new Date(session.startDateTime),
      endDateTime: session.endDateTime ? new Date(session.endDateTime) : undefined,
      observations: session.observations,
    },
  });

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const mutateSession = async (data: PartialSessionsRequest) => {
    try {
      await updateSession({ id: session.id, ...data });
      setIsEditing(false);
    } catch (error) {
      httpErrorHandler(error, {});
    }
  };

  return (
    <Card key={session.id} sx={{ marginBottom: 1, backgroundColor: theme.palette.grey[200] }}>
      <CardContent>
        <Box>
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
                src={session.physicianSupport.avatar}
                alt={`${session.physicianSupport.firstName} ${session.physicianSupport.lastName}`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {session.physicianSupport.firstName} {session.physicianSupport.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {session.physicianSupport.identification}
                </Typography>
              </Box>
              <Chip
                sx={{ position: 'absolute', right: 30 }}
                icon={<Iconify icon="maki:doctor" width={30} />}
                label={session.physicianSupport.specializations.map((s) => (
                  <>
                    - {s.name} <br />
                  </>
                ))}
                color="success"
                variant="outlined"
              />
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Instrucciones
              </AccordionSummary>
              <AccordionDetails>{session.instructions}</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Recipe
              </AccordionSummary>
              <AccordionDetails sx={{ w: 1 }}>
                {session.recipes.map((recipe) => (
                  <Box key={recipe.id} sx={{ w: 1 }}>
                    <Typography>Instrucciones:</Typography>
                    <Typography>{recipe.instructions}</Typography>
                    <TableContainer component={Paper} sx={{ mt: 1 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Insumo</TableCell>
                            <TableCell align="right">Dosis</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recipe.supplies.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.dose} {row.measurementUnit.abbreviation}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Observaciones
              </AccordionSummary>
              <AccordionDetails>{session.observations}</AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">Inicio: {formatDateTime(session.startDateTime)}</Typography>
            {session.endDateTime && (
              <Typography variant="body2">
                Finalizó: {formatDateTime(session.startDateTime)}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton onClick={toggleIsEditing}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
      {isEditing && (
        <Box component="form" onSubmit={handleSubmit(mutateSession)} p={1}>
          <Stack spacing={1}>
            <Controller
              control={control}
              name="startDateTime"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha de inicio"
                    slotProps={{
                      textField: {
                        error: !!errors.startDateTime,
                        helperText: errors.startDateTime?.message,
                      },
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              control={control}
              name="endDateTime"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha fin"
                    slotProps={{
                      textField: {
                        error: !!errors.endDateTime,
                        helperText: errors.endDateTime?.message,
                      },
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <TextField
              label="Observaciones"
              {...register('observations')}
              error={!!errors.observations}
              helperText={errors.observations?.message}
            />
            <Button variant="contained" type="submit" disabled={isUpdating}>
              Guardar
            </Button>
          </Stack>
        </Box>
      )}
    </Card>
  );
};
