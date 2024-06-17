import { useState } from 'react';
import { DateTime } from 'luxon';
import validator from 'validator';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';

import { httpErrorHandler } from '@/utils';
import { Genre, Patient, genreInSpanish } from '@/types';
import { PatientSchema, PatientRequest } from '../../../../schemas/patient';
import { useAddPatientMutation, useUpdatePatientMutation } from '@/redux/features';

interface Props {
  patient?: Patient;
  triggerComponent: React.FC<{ onClick: () => void }>;
}

export const PatientForm = ({ patient, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');

  const id = patientId && validator.isUUID(patientId) ? patientId : '';

  const [open, setOpen] = useState(id == patient?.id);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PatientRequest>({
    defaultValues: {
      id: patient?.id,
      firstName: patient ? patient.firstName : '',
      lastName: patient ? patient.lastName : '',
      email: patient ? patient.email : '',
      identification: patient ? patient.identification : '',
      genre: patient ? patient.genre : ('' as Genre),
      dateOfBirth: patient ? new Date(patient.dateOfBirth) : ('' as unknown as Date),
      phone: patient ? patient.phone : '',
    },
    resolver: zodResolver(PatientSchema),
  });

  const handleClickOpen = () => {
    if (patient?.id) setSearchParams({ patientId: patient?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addPatient, { isLoading: isAdding }] = useAddPatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  const mutatePatient = async (data: PatientRequest) => {
    try {
      if (patient) {
        await updatePatient(data);
      } else {
        await addPatient(data).unwrap();
        reset();
      }
      handleClose();
    } catch (error) {
      httpErrorHandler(error, {});
    }
  };

  const TriggerComponent = triggerComponent;

  return (
    <>
      <TriggerComponent onClick={handleClickOpen} />
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(mutatePatient),
        }}
      >
        <DialogTitle>{patient?.id ? 'Editar' : 'Nuevo'} Paciente</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <TextField
              label="Nombre"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Apellido"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              label="Identificación"
              {...register('identification')}
              error={!!errors.identification}
              helperText={errors.identification?.message}
            />
            <FormControl error={!!errors.genre}>
              <InputLabel id="genre-label">Género</InputLabel>
              <Select
                label="Género"
                labelId="genre-label"
                defaultValue={patient ? patient.genre : ''}
                {...register('genre')}
              >
                {Object.values(Genre).map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genreInSpanish[genre]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.genre?.message}</FormHelperText>
            </FormControl>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha de nacimiento"
                    disableFuture
                    slotProps={{
                      textField: {
                        error: !!errors.dateOfBirth,
                        helperText: errors.dateOfBirth?.message,
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
              label="Correo"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Teléfono"
              type="tel"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" disabled={isAdding || isUpdating}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
