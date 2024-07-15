import { DragEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Box, List, Paper } from '@mui/material';

import { Appointment } from '@/types';
import { useAppSelector } from '@/redux/store';
import { endDragging } from '@/redux/features/ui';
import { AppointmentCard } from './AppointmentCard';
import { useUpdateAppointmentMutation } from '@/redux/features/appointments';
import { enqueueSnackbar } from 'notistack';

interface Props {
  appointments: Appointment[];
  status: 'pending' | 'inProgress' | 'completed';
}

export const AppointmentList = ({ appointments, status }: Props) => {
  const today = new Date();
  const dispatch = useDispatch();

  const { isDragging } = useAppSelector((state) => state.ui);

  const [updateAppointment] = useUpdateAppointmentMutation();

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = async (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');

    const appointmentToUpdate = appointments.find((appointment) => appointment.id === id);

    if (!appointmentToUpdate) return;

    let startDateTime = today;
    let endDateTime = null;

    if (status === 'pending') {
      startDateTime.setDate(today.getDate() + 1);
    }

    if (status === 'inProgress') {
      startDateTime = today;
    }

    if (status === 'completed') {
      startDateTime = new Date(appointmentToUpdate.startDateTime);
      endDateTime = new Date();
    }

    if (endDateTime != null && startDateTime > endDateTime) {
      enqueueSnackbar('La fecha de inicio no puede ser mayor a la fecha de fin');
      return;
    }

    await updateAppointment({
      id,
      startDateTime,
      endDateTime,
    });

    dispatch(endDragging());
  };

  const appointmentsByStatus = useMemo(() => {
    if (status === 'pending') {
      return appointments.filter(
        (appointment) =>
          new Date(appointment.startDateTime) >= today && appointment.endDateTime == null
      );
    }

    if (status === 'inProgress') {
      return appointments.filter(
        (appointment) =>
          new Date(appointment.startDateTime) <= today && appointment.endDateTime == null
      );
    }

    if (status === 'completed') {
      return appointments.filter((appointment) => appointment.endDateTime != null);
    }

    return [];
  }, [appointments, status]);

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
          {appointmentsByStatus.length >= 1 &&
            appointmentsByStatus.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </List>
      </Paper>
    </Box>
  );
};
