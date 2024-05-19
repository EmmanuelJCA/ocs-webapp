import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Stack,
  Button,
  Dialog,
  Checkbox,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import { httpErrorHandler } from '@/utils';
import { OncologyCenter } from '../../../../../types/oncologyCenter';
import { OncologyCenterSchema, OncologyCenterRequest } from '@/schemas/oncologyCenter';
import { useAddOncologyCenterMutation, useUpdateOncologyCenterMutation } from '@/redux/features';

interface Props {
  oncologyCenter?: OncologyCenter;
  triggerComponent: any;
}

export const OncologyCenterForm = ({ oncologyCenter, triggerComponent }: Props) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OncologyCenterRequest>({
    defaultValues: {
      id: oncologyCenter?.id,
      name: oncologyCenter ? oncologyCenter.name : '',
      email: oncologyCenter ? oncologyCenter.email : '',
      phone: oncologyCenter ? oncologyCenter.phone : '',
      isActive: oncologyCenter ? oncologyCenter.inactivatedAt == null : undefined,
    },
    resolver: zodResolver(OncologyCenterSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addOncologyCenter, { isLoading: isAdding }] = useAddOncologyCenterMutation();
  const [updateOncologyCenter, { isLoading: isUpdating }] = useUpdateOncologyCenterMutation();

  const mutateOncologyCenter = async (data: OncologyCenterRequest) => {
    try {
      if (oncologyCenter) {
        await updateOncologyCenter(data);
      } else {
        await addOncologyCenter(data).unwrap();
        reset();
      }
      handleClose();
    } catch (error) {
      httpErrorHandler(error);
    }
  };

  const TriggerComponent = triggerComponent;

  return (
    <>
      <TriggerComponent onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(mutateOncologyCenter),
        }}
      >
        <DialogTitle>Nuevo centro oncológico</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <TextField
              label="Nombre"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Teléfono"
              type="tel"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="Correo"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {oncologyCenter && (
              <FormControlLabel
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field: props }) => (
                      <Checkbox
                        {...props}
                        checked={props.value}
                        onChange={(e) => props.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Activo"
              />
            )}
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
