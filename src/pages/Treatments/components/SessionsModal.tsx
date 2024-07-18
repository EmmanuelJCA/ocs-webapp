import { useState } from 'react';
import { Card, Grid, Paper, Dialog, CardHeader, DialogTitle, DialogContent } from '@mui/material';

import { Treatment } from '@/types';
import { SessionList } from './SessionList';
import { useGetSessionsQuery } from '@/redux/features';

interface Props {
  treatment: Treatment;
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const SessionsModal = ({ treatment, triggerComponent }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: treatmentSessions = [] } = useGetSessionsQuery(treatment?.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TriggerComponent = triggerComponent;

  return (
    <>
      <TriggerComponent onClick={handleClickOpen} />
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Sesiones del tratamiento</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="Pendientes" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <SessionList status="pending" sessions={treatmentSessions} />
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="En Progreso" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <SessionList status="inProgress" sessions={treatmentSessions} />
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="Completadas" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <SessionList status="completed" sessions={treatmentSessions} />
                </Paper>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
