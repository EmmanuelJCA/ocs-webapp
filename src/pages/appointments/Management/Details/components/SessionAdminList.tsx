import { useMemo } from 'react';
import { List } from '@mui/material';

import { SessionAdminCard } from './SessionAdminCard';
import { Treatment, TreatmentSessions } from '@/types';

interface Props {
  treatment: Treatment;
  sessions: TreatmentSessions[];
  status: 'pending' | 'inProgress' | 'completed';
}

export const SessionAdminList = ({ treatment, sessions, status }: Props) => {
  const today = new Date();

  const treatmentsByStatus = useMemo(() => {
    if (status === 'pending') {
      return sessions.filter(
        (session) => new Date(session.startDateTime) >= today && session.endDateTime == null
      );
    }

    if (status === 'inProgress') {
      return sessions.filter(
        (session) => new Date(session.startDateTime) <= today && session.endDateTime == null
      );
    }

    if (status === 'completed') {
      return sessions.filter((session) => session.endDateTime != null);
    }

    return [];
  }, [sessions, status]);

  return (
    <List>
      {treatmentsByStatus.length >= 1 &&
        treatmentsByStatus.map((session) => (
          <SessionAdminCard key={session.id} treatment={treatment} session={session} />
        ))}
    </List>
  );
};
