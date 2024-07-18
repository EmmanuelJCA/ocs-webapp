import { DateTime } from 'luxon';
import validator from 'validator';
import { useState, SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Stack,
  Button,
  Dialog,
  Checkbox,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Iconify } from '@/components';
import { httpErrorHandler } from '@/utils';
import { AppointmentSchema, AppointmentRequest } from '@/schemas/appointment';
import { Reason, Patient, Physician, Appointment, OncologyCenter } from '@/types';
import {
  useAddAppointmentMutation,
  useUpdateAppointmentMutation,
} from '@/redux/features/appointments';
import {
  useGetReasonsQuery,
  useGetPatientsQuery,
  useGetPhysiciansQuery,
  useGetOncologyCentersQuery,
} from '@/redux/features';

interface Props {
  appointment?: Appointment;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const AppointmentForm = ({ appointment, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');

  const id = appointmentId && validator.isUUID(appointmentId) ? appointmentId : '';

  const [open, setOpen] = useState(id == appointment?.id);

  const { data: oncologyCenters = [] } = useGetOncologyCentersQuery();
  const { data: physicians = [] } = useGetPhysiciansQuery();
  const { data: patients = [] } = useGetPatientsQuery();
  const { data: reasons = [] } = useGetReasonsQuery();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AppointmentRequest>({
    defaultValues: {
      id: appointment?.id,
      notes: appointment ? appointment.notes : '',
      startDateTime: appointment ? new Date(appointment.startDateTime) : ('' as unknown as Date),
      endDateTime: appointment
        ? appointment.endDateTime != null
          ? new Date(appointment.endDateTime)
          : null
        : null,
      reasonsIds: appointment ? appointment.reasons.map((r) => r.id) : [],
      physicianId: appointment ? appointment.physician.id : '',
      patientId: appointment ? appointment.patient.id : '',
      oncologyCenterId: appointment ? appointment.oncologyCenter.id : '',
    },
    resolver: zodResolver(AppointmentSchema),
  });

  const handleClickOpen = () => {
    if (appointment?.id) setSearchParams({ appointmentId: appointment?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addAppointment, { isLoading: isAdding }] = useAddAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

  const mutateAppointment = async (data: AppointmentRequest) => {
    try {
      if (appointment) {
        await updateAppointment(data);
      } else {
        await addAppointment(data).unwrap();
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
          onSubmit: handleSubmit(mutateAppointment),
        }}
      >
        <DialogTitle>{appointment?.id ? 'Editar' : 'Nueva'} cita médica</DialogTitle>
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
              name="reasonsIds"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  limitTags={1}
                  disableCloseOnSelect
                  value={field.value ? reasons.filter((r) => field.value.includes(r.id)) : []}
                  getOptionLabel={(option) => option.description}
                  options={reasons}
                  onChange={(_event: SyntheticEvent, value: Reason[]) =>
                    field.onChange(value.map((v) => v.id))
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.description}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Razones de la cita"
                      error={!!errors.reasonsIds}
                      helperText={errors.reasonsIds?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="oncologyCenterId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? oncologyCenters.find((oc) => oc.id == field.value) : null}
                  options={oncologyCenters}
                  getOptionLabel={(option) => option.name}
                  onChange={(_event: SyntheticEvent, value: OncologyCenter | null) =>
                    field.onChange(value?.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Centro oncológico"
                      error={!!errors.oncologyCenterId}
                      helperText={errors.oncologyCenterId?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="physicianId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? physicians.find((oc) => oc.id == field.value) : null}
                  options={physicians}
                  getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                  onChange={(_event: SyntheticEvent, value: Physician | null) =>
                    field.onChange(value?.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Médico"
                      error={!!errors.physicianId}
                      helperText={errors.physicianId?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? patients.find((oc) => oc.id == field.value) : null}
                  options={patients}
                  getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                  onChange={(_event: SyntheticEvent, value: Patient | null) =>
                    field.onChange(value?.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paciente"
                      error={!!errors.patientId}
                      helperText={errors.patientId?.message}
                    />
                  )}
                />
              )}
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
              disabled={!appointment?.id}
              endIcon={<Iconify icon="solar:round-arrow-right-bold" />}
            >
              Ir a detalles
            </Button>
            <Box>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" disabled={isAdding || isUpdating}>
                Guardar
              </Button>
            </Box>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
