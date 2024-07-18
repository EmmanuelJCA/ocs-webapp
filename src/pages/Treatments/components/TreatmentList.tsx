import { useDispatch } from 'react-redux';
import { useMemo, DragEvent } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Box, List, Paper } from '@mui/material';

import { Treatment } from '@/types';
import { useAppSelector } from '@/redux/store';
import { TreatmentCard } from './TreatmentCard';
import { endDragging } from '@/redux/features/ui';
import { useUpdateTreatmentMutation } from '@/redux/features';

interface Props {
  treatments: Treatment[];
  status: 'pending' | 'inProgress' | 'completed';
}

export const TreatmentList = ({ treatments, status }: Props) => {
  const today = new Date();
  const dispatch = useDispatch();

  const { isDragging } = useAppSelector((state) => state.ui);

  const [updateTreatment] = useUpdateTreatmentMutation();

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = async (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');

    const treatmentToUpdate = treatments.find((treatment) => treatment.id === id);

    if (!treatmentToUpdate) return;

    let startDateTime = today;
    let endDateTime = null;

    if (status === 'pending') {
      startDateTime.setDate(today.getDate() + 1);
    }

    if (status === 'inProgress') {
      startDateTime = today;
    }

    if (status === 'completed') {
      startDateTime = new Date(treatmentToUpdate.startDateTime);
      endDateTime = new Date();
    }

    if (endDateTime != null && startDateTime > endDateTime) {
      enqueueSnackbar('La fecha de inicio no puede ser mayor a la fecha de fin');
      return;
    }

    await updateTreatment({
      id,
      startDateTime,
      endDateTime,
    });

    dispatch(endDragging());
  };

  const treatmentsByStatus = useMemo(() => {
    if (status === 'pending') {
      return treatments.filter(
        (treatment) => new Date(treatment.startDateTime) >= today && treatment.endDateTime == null
      );
    }

    if (status === 'inProgress') {
      return treatments.filter(
        (treatment) => new Date(treatment.startDateTime) <= today && treatment.endDateTime == null
      );
    }

    if (status === 'completed') {
      return treatments.filter((treatment) => treatment.endDateTime != null);
    }

    return [];
  }, [treatments, status]);

  return (
    <Box
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      sx={{
        ...(isDragging && {
          opacity: 0.5,
          borderRadius: 10,
          border: '1px dashed white',
        }),
      }}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          backgroundColor: 'transparent',
          overflowY: 'auto',
          padding: '3px 8px',
        }}
      >
        <List>
          {treatmentsByStatus.length >= 1 &&
            treatmentsByStatus.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
        </List>
      </Paper>
    </Box>
  );
};
