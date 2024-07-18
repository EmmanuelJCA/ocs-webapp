import { useMemo } from 'react';
import { List } from '@mui/material';

import { TreatmentSessions } from '@/types';
import { SessionCard } from './SessionCard';

interface Props {
  sessions: TreatmentSessions[];
  status: 'pending' | 'inProgress' | 'completed';
}

export const SessionList = ({ sessions, status }: Props) => {
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
        treatmentsByStatus.map((session) => <SessionCard key={session.id} session={session} />)}
    </List>
  );
};
