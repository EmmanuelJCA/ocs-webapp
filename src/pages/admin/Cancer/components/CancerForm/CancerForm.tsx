import { useState } from 'react';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { CancerType } from '@/types';
import { httpErrorHandler } from '@/utils';
import { CancerTypeSchema, CancerTypeRequest } from '@/schemas/cancerType';
import { useAddCancerTypeMutation, useUpdateCancerTypeMutation } from '@/redux/features';

interface Props {
  cancer?: CancerType;
  triggerComponent: React.FC<{ onClick: () => void }>;
}

export const CancerForm = ({ cancer, triggerComponent }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cancerId = searchParams.get('cancerId');

  const id = cancerId && validator.isUUID(cancerId) ? cancerId : '';

  const [open, setOpen] = useState(id == cancer?.id);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CancerTypeRequest>({
    defaultValues: {
      id: cancer?.id,
      name: cancer ? cancer.name : '',
      description: cancer ? cancer.description : '',
    },
    resolver: zodResolver(CancerTypeSchema),
  });

  const handleClickOpen = () => {
    if (cancer?.id) setSearchParams({ cancerId: cancer?.id });
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  const [addCancer, { isLoading: isAdding }] = useAddCancerTypeMutation();
  const [updateCancer, { isLoading: isUpdating }] = useUpdateCancerTypeMutation();

  const mutateCancer = async (data: CancerTypeRequest) => {
    try {
      if (cancer) {
        await updateCancer(data);
      } else {
        await addCancer(data).unwrap();
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
          onSubmit: handleSubmit(mutateCancer),
        }}
      >
        <DialogTitle>{cancer?.id ? 'Editar' : 'Nuevo'} Tipo de cáncer</DialogTitle>
        <DialogContent>
          <Stack padding={2} gap={2}>
            <TextField
              label="Nombre"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Descripción"
              rows={4}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
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
