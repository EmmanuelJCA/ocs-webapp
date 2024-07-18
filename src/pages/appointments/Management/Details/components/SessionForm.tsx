import { DateTime } from 'luxon';
import validator from 'validator';
import { useState, SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Stack,
  Button,
  Dialog,
  styled,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
  TextareaAutosize as BaseTextareaAutosize,
} from '@mui/material';

import { httpErrorHandler } from '@/utils';
import { Physician, Treatment, TreatmentSessions } from '@/types';
import { SessionsSchema, SessionsRequest } from '@/schemas/sessions';
import { Typography } from '@mui/material';
import {
  useAddSessionMutation,
  useUpdateSessionMutation,
  useGetPhysicianSupportsQuery,
} from '@/redux/features';

interface Props {
  treatment?: Treatment;
  session?: TreatmentSessions;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const SessionForm = ({ triggerComponent, treatment, session }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const id = sessionId && validator.isUUID(sessionId) ? sessionId : '';

  const [open, setOpen] = useState(id == session?.id);

  const { data: physicianSupports = [] } = useGetPhysicianSupportsQuery();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SessionsRequest>({
    defaultValues: {
      id: session?.id,
      treatmentId: treatment?.id,
      startDateTime: session ? new Date(session.startDateTime) : ('' as unknown as Date),
      endDateTime: session
        ? session.endDateTime != null
          ? new Date(session.endDateTime)
          : null
        : null,
      physicianSupportId: session ? session.physicianSupport.id : '',
      instructions: session ? session.instructions : '',
      observations: session ? session.observations : '',
    },
    resolver: zodResolver(SessionsSchema),
  });

  console.log(errors);

  const handleClickOpen = () => {
    if (session?.id) setSearchParams({ sessionId: session?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addSession, { isLoading: isAdding }] = useAddSessionMutation();
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();

  const mutateSession = async (data: SessionsRequest) => {
    try {
      if (session) {
        await updateSession(data);
      } else {
        await addSession(data).unwrap();
        reset();
      }
      handleClose();
    } catch (error) {
      httpErrorHandler(error, {});
    }
  };

  const TriggerComponent = triggerComponent;

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <>
      <TriggerComponent onClick={handleClickOpen} />
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(mutateSession),
        }}
      >
        <DialogTitle>{session?.id ? 'Editar' : 'Nueva'} sesión</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
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
            <Controller
              name="physicianSupportId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? physicianSupports.find((oc) => oc.id == field.value) : null}
                  options={physicianSupports}
                  getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                  onChange={(_event: SyntheticEvent, value: Physician | null) =>
                    field.onChange(value?.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Médico"
                      error={!!errors.physicianSupportId}
                      helperText={errors.physicianSupportId?.message}
                    />
                  )}
                />
              )}
            />
            <TextField
              label="Observaciones"
              {...register('observations')}
              error={!!errors.observations}
              helperText={errors.observations?.message}
            />
            <Typography>Indicaciones y receta</Typography>
            <Textarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Escriba sus indicaciones aquí"
              {...register('instructions')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack width={1} px={1} flexDirection="row" justifyContent="end">
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" disabled={isAdding || isUpdating}>
              Guardar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
