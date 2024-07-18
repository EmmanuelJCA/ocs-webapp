import { FC } from 'react';
import { Add } from '@mui/icons-material';
import { Fab, Grid, Card, Paper, CardHeader, Typography } from '@mui/material';

import { Treatment } from '@/types';
import { SessionForm } from './SessionForm';
import { SessionAdminList } from './SessionAdminList';
import { useGetSessionsQuery } from '@/redux/features';

interface Props {
  treatment: Treatment;
}

const AddSessionButton = (props: object) => {
  return (
    <Fab
      color="primary"
      variant="extended"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 10,
      }}
      {...props}
    >
      <Add />
      <Typography variant="caption">Agregar Sesión</Typography>
    </Fab>
  );
};

export const SessionsView: FC<Props> = ({ treatment }) => {
  const { data: treatmentSessions = [] } = useGetSessionsQuery(treatment.id);
  return (
    <Grid container spacing={1} my={2}>
      <Grid item xs={12} sm={4}>
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
            <SessionAdminList status="pending" treatment={treatment} sessions={treatmentSessions} />
          </Paper>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
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
            <SessionAdminList
              status="inProgress"
              treatment={treatment}
              sessions={treatmentSessions}
            />
          </Paper>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
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
            <SessionAdminList
              status="completed"
              treatment={treatment}
              sessions={treatmentSessions}
            />
          </Paper>
          <SessionForm triggerComponent={AddSessionButton} treatment={treatment} />
        </Card>
      </Grid>
    </Grid>
  );
};
