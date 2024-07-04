import { useState } from 'react';
import { DateTime } from 'luxon';
import validator from 'validator';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Iconify } from '@/components';
import { AppointmentSchema, AppointmentRequest } from '@/schemas/appointment';

interface Props {
  treatment?: any;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const TreatmentForm = ({ treatment, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const treatmentId = searchParams.get('treatmentId');

  const id = treatmentId && validator.isUUID(treatmentId) ? treatmentId : '';

  const [open, setOpen] = useState(id == treatment?.id);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AppointmentRequest>({
    defaultValues: {
      id: treatment?.id,
      notes: treatment ? treatment.notes : '',
      startDateTime: treatment ? new Date(treatment.startDateTime) : ('' as unknown as Date),
      endDateTime: treatment ? new Date(treatment.startDateTime) : undefined,
      reasonsIds: treatment ? treatment.reasonsIds.map((r: any) => r.id) : [],
      physicianId: treatment ? treatment.physicianId : '',
      patientId: treatment ? treatment.patientId : '',
      oncologyCenterId: treatment ? treatment.oncologyCenterId : '',
    },
    resolver: zodResolver(AppointmentSchema),
  });

  const handleClickOpen = () => {
    if (treatment?.id) setSearchParams({ treatmentId: treatment?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  // const [addOncologyCenter, { isLoading: isAdding }] = useAddOncologyCenterMutation();
  // const [updateOncologyCenter, { isLoading: isUpdating }] = useUpdateOncologyCenterMutation();

  const mutateAppointment = async () => {
    // try {
    //   if (oncologyCenter) {
    //     await updateOncologyCenter(data);
    //   } else {
    //     await addOncologyCenter(data).unwrap();
    //     reset();
    //   }
    //   handleClose();
    // } catch (error) {
    //   httpErrorHandler(error, {});
    // }
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
          onSubmit: handleSubmit(mutateAppointment),
        }}
      >
        <DialogTitle>{treatment?.id ? 'Editar' : 'Nueva'} cita médica</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <Controller
              control={control}
              name="startDateTime"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha de inicio"
                    disableFuture
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
                  <DatePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha fin"
                    disableFuture
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
            <Autocomplete
              multiple
              sx={{ width: 1 }}
              limitTags={1}
              disableCloseOnSelect
              options={['Dolor de cabeza', 'Seguimiento']}
              renderInput={(params) => <TextField {...params} label="Razones de la cita" />}
            />
            <Autocomplete
              sx={{ width: 1 }}
              disableCloseOnSelect
              options={['San Lucas']}
              renderInput={(params) => <TextField {...params} label="Centros oncológicos" />}
            />
            <Autocomplete
              sx={{ width: 1 }}
              disableCloseOnSelect
              options={['Emmanuel Cañate']}
              renderInput={(params) => <TextField {...params} label="Médicos" />}
            />
            <Autocomplete
              sx={{ width: 1 }}
              disableCloseOnSelect
              options={['John Doe']}
              renderInput={(params) => <TextField {...params} label="Pacientes" />}
            />
            <TextField
              label="Notas"
              {...register('notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack width={1} px={1} flexDirection="row" justifyContent="space-between">
            <Button
              disabled={!treatment?.id}
              endIcon={<Iconify icon="solar:round-arrow-right-bold" />}
            >
              Ir a detalles
            </Button>
            <Box>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                type="submit"
                // disabled={isAdding || isUpdating}
              >
                Guardar
              </Button>
            </Box>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
