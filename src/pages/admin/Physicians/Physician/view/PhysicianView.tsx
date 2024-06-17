import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

import { PhysicianForm } from '../components';
import { Loader, Breadcrumb } from '@/components';
import { useGetPhysicianQuery } from '@/redux/features';

// ----------------------------------------------------------------------

interface Props {
  physicianId: string | null;
}

const PhysicianView: FC<Props> = ({ physicianId }) => {
  const { data, isLoading } = useGetPhysicianQuery(physicianId!, {
    skip: physicianId === null,
    refetchOnMountOrArgChange: true,
  });

  const action = data ? 'Editar' : 'Crear';

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl">
      <Box mb={5}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          {action} Oncólogo
        </Typography>
        <Breadcrumb />
      </Box>
      <PhysicianForm physician={data} />
    </Container>
  );
};

export default PhysicianView;
