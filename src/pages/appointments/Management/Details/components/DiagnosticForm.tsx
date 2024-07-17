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
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { httpErrorHandler } from '@/utils';
import { Diagnostic, CancerType, CancerStage } from '@/types';
import { DiagnosticSchema, DiagnosticRequest } from '@/schemas/diagnostic';
import { useGetCancerTypesQuery, useGetCancerStagesQuery } from '@/redux/features';
import {
  useAddDiagnosticMutation,
  useUpdateDiagnosticMutation,
} from '@/redux/features/diagnostics';

interface Props {
  appointmentId?: string;
  diagnostic?: Diagnostic;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const DiagnosticForm = ({ appointmentId, diagnostic, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const diagnosticId = searchParams.get('diagnosticId');

  const id = diagnosticId && validator.isUUID(diagnosticId) ? diagnosticId : '';

  const [open, setOpen] = useState(id == diagnostic?.id);

  const { data: cancerStages = [] } = useGetCancerStagesQuery();
  const { data: cancerTypes = [] } = useGetCancerTypesQuery();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<DiagnosticRequest>({
    defaultValues: {
      id: diagnostic?.id,
      notes: diagnostic ? diagnostic.notes : '',
      date: diagnostic ? new Date(diagnostic.date) : ('' as unknown as Date),
      appointmentId: appointmentId,
      cancerTypeId: diagnostic ? diagnostic.cancerType.id : '',
      cancerStageId: diagnostic ? diagnostic.cancerStage.id : '',
    },
    resolver: zodResolver(DiagnosticSchema),
  });

  const handleClickOpen = () => {
    if (diagnostic?.id) setSearchParams({ diagnosticId: diagnostic?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addDiagnostic, { isLoading: isAdding }] = useAddDiagnosticMutation();
  const [updateDiagnostic, { isLoading: isUpdating }] = useUpdateDiagnosticMutation();

  const mutateDiagnostic = async (data: DiagnosticRequest) => {
    try {
      if (diagnostic) {
        await updateDiagnostic(data);
      } else {
        await addDiagnostic(data).unwrap();
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
          onSubmit: handleSubmit(mutateDiagnostic),
        }}
      >
        <DialogTitle>{diagnostic?.id ? 'Editar' : 'Nueva'} cita médica</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    {...field}
                    value={field.value ? DateTime.fromJSDate(field.value) : null}
                    onChange={(value) => {
                      if (!value) return field.onChange(null);
                      field.onChange(value.toJSDate());
                    }}
                    label="Fecha de diagnóstico"
                    slotProps={{
                      textField: {
                        error: !!errors.date,
                        helperText: errors.date?.message,
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
              name="cancerTypeId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? cancerTypes.find((ct) => ct.id == field.value) : null}
                  options={cancerTypes}
                  getOptionLabel={(option) => option.name}
                  onChange={(_event: SyntheticEvent, value: CancerType | null) =>
                    field.onChange(value ? value.id : '')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cáncer"
                      error={!!errors.cancerTypeId}
                      helperText={errors.cancerTypeId?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="cancerStageId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value ? cancerStages.find((cs) => cs.id == field.value) : null}
                  options={cancerStages}
                  getOptionLabel={(option) => option.name}
                  onChange={(_event: SyntheticEvent, value: CancerStage | null) =>
                    field.onChange(value ? value.id : '')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Etapa del cáncer"
                      error={!!errors.cancerStageId}
                      helperText={errors.cancerStageId?.message}
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
