import { DragEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Box, List, Paper } from '@mui/material';

import { useAppSelector } from '@/redux/store';
import { endDragging } from '@/redux/features/ui';
import { AppointmentCard } from './AppointmentCard';

interface Props {
  showCard?: boolean;
}

export const AppointmentList = ({ showCard }: Props) => {
  const dispatch = useDispatch();

  const { isDragging } = useAppSelector((state) => state.ui);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = () => {
    // const id = event.dataTransfer.getData('text');

    // const entry = entries.find((e) => e._id === id)!;
    // entry.status = status;
    // updateEntry(entry);
    dispatch(endDragging());
  };
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
        <List>{showCard && <AppointmentCard />}</List>
      </Paper>
    </Box>
  );
};
