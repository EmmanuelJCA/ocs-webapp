import { DateTime } from 'luxon';
import validator from 'validator';
import { useState, SyntheticEvent } from 'react';
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

import { httpErrorHandler } from '@/utils';
import { TreatmentSchema, TreatmentRequest } from '@/schemas/treatment';
import { Physician, Treatment, Diagnostic, TreatmentType, OncologyCenter } from '@/types';
import {
  useGetPhysiciansQuery,
  useAddTreatmentMutation,
  useGetTreatmentTypesQuery,
  useGetOncologyCentersQuery,
  useUpdateTreatmentMutation,
} from '@/redux/features';

interface Props {
  diagnostic: Diagnostic;
  treatment?: Treatment;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const TreatmentForm = ({ diagnostic, treatment, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const treatmentId = searchParams.get('treatmentId');

  const id = treatmentId && validator.isUUID(treatmentId) ? treatmentId : '';

  const [open, setOpen] = useState(id == treatment?.id);

  const { data: oncologyCenters = [] } = useGetOncologyCentersQuery();
  const { data: physicians = [] } = useGetPhysiciansQuery();
  const { data: treatmentTypes = [] } = useGetTreatmentTypesQuery();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TreatmentRequest>({
    defaultValues: {
      id: treatment?.id,
      instructions: treatment ? treatment.instructions : '',
      startDateTime: treatment ? new Date(treatment.startDateTime) : ('' as unknown as Date),
      endDateTime: treatment
        ? treatment.endDateTime != null
          ? new Date(treatment.endDateTime)
          : null
        : null,
      result: treatment ? treatment.result : null,
      resultNotes: treatment ? treatment.resultNotes : '',
      treatmentTypeId: treatment ? treatment.type.id : '',
      physicianId: treatment ? treatment.physician.id : '',
      oncologyCenterId: treatment ? treatment.oncologyCenter.id : '',
      diagnosticId: diagnostic.id,
    },
    resolver: zodResolver(TreatmentSchema),
  });

  const watchEndTime = watch('endDateTime');

  console.log(errors);

  const handleClickOpen = () => {
    if (treatment?.id) setSearchParams({ treatmentId: treatment?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addTreatment, { isLoading: isAdding }] = useAddTreatmentMutation();
  const [updateTreatment, { isLoading: isUpdating }] = useUpdateTreatmentMutation();

  const mutateAppointment = async (data: TreatmentRequest) => {
    try {
      if (treatment) {
        await updateTreatment(data);
      } else {
        await addTreatment(data).unwrap();
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
        <DialogTitle>{treatment?.id ? 'Editar' : 'Nuevo'} tratamiento</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <Controller
              name="treatmentTypeId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? treatmentTypes.find((tt) => tt.id == field.value) : null}
                  options={treatmentTypes}
                  getOptionLabel={(option) => option.name}
                  onChange={(_event: SyntheticEvent, value: TreatmentType | null) =>
                    field.onChange(value?.id)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de tratamiento"
                      error={!!errors.treatmentTypeId}
                      helperText={errors.treatmentTypeId?.message}
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
                      label="Oncólogo"
                      error={!!errors.physicianId}
                      helperText={errors.physicianId?.message}
                    />
                  )}
                />
              )}
            />
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
            <TextField
              label="Instrucciones"
              {...register('instructions')}
              error={!!errors.instructions}
              helperText={errors.instructions?.message}
            />
            {watchEndTime !== null && (
              <TextField
                label="Notas del resultado"
                {...register('resultNotes')}
                error={!!errors.resultNotes}
                helperText={errors.resultNotes?.message}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack width={1} px={1} flexDirection="row" justifyContent="end">
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
