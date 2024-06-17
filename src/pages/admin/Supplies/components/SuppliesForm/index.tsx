import validator from 'validator';
import { useState, SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  Autocomplete,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';

import { httpErrorHandler } from '@/utils';
import { Supplies, TreatmentType } from '@/types';
import { useGetMeasurementUnitsQuery } from '@/redux/features/measurementUnit';
import { SuppliesSchema, SuppliesRequest } from '../../../../../schemas/supplies';
import {
  useAddSuppliesMutation,
  useGetTreatmentTypesQuery,
  useUpdateSuppliesMutation,
} from '@/redux/features';

interface Props {
  supplies?: Supplies;
  triggerComponent: React.FC<{ onClick: () => void }>;
}

export const SuppliesForm = ({ supplies, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const suppliesId = searchParams.get('suppliesId');

  const id = suppliesId && validator.isUUID(suppliesId) ? suppliesId : '';

  const [open, setOpen] = useState(id == supplies?.id);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SuppliesRequest>({
    defaultValues: {
      id: supplies?.id,
      name: supplies ? supplies.name : '',
      description: supplies ? supplies.description : '',
      treatmentTypesIds: supplies ? supplies.treatmentTypes.map((tt) => tt.id) : [],
      measurementUnitId: supplies ? supplies.measurementUnit?.id : '',
    },
    resolver: zodResolver(SuppliesSchema),
  });

  const { data: treatmentTypes = [] } = useGetTreatmentTypesQuery();
  const { data: measurementUnits = [] } = useGetMeasurementUnitsQuery();

  const [addSupplies, { isLoading: isAdding }] = useAddSuppliesMutation();
  const [updateSupplies, { isLoading: isUpdating }] = useUpdateSuppliesMutation();

  const handleClickOpen = () => {
    if (supplies?.id) setSearchParams({ suppliesId: supplies?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const mutateSupplies = async (data: SuppliesRequest) => {
    try {
      if (supplies) {
        await updateSupplies(data);
      } else {
        await addSupplies(data).unwrap();
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
          onSubmit: handleSubmit(mutateSupplies),
        }}
      >
        <DialogTitle>{supplies?.id ? 'Editar' : 'Nuevo'} Insumo</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <TextField
              label="Nombre"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <FormControl error={!!errors.measurementUnitId}>
              <InputLabel id="measurement-unit-label">Unidad de medida</InputLabel>
              <Select
                label="Unidad de medida"
                labelId="measurement-unit-label"
                defaultValue={supplies ? supplies.measurementUnit?.id : ''}
                {...register('measurementUnitId')}
              >
                {measurementUnits &&
                  measurementUnits.map((mu) => (
                    <MenuItem key={mu.id} value={mu.id}>
                      {mu.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{errors.measurementUnitId?.message}</FormHelperText>
            </FormControl>
            <TextField
              label="Descripción"
              rows={4}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Controller
              name="treatmentTypesIds"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  limitTags={1}
                  disableCloseOnSelect
                  {...register('treatmentTypesIds')}
                  value={
                    field.value ? treatmentTypes.filter((tt) => field.value.includes(tt.id)) : []
                  }
                  getOptionLabel={(option) => option.name}
                  options={treatmentTypes}
                  onChange={(_event: SyntheticEvent, value: TreatmentType[]) =>
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
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipos de tratamientos"
                      error={!!errors.treatmentTypesIds}
                      helperText={errors.treatmentTypesIds?.message}
                    />
                  )}
                />
              )}
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
