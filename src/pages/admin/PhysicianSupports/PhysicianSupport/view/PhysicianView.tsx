import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

import { Loader, Breadcrumb } from '@/components';
import { PhysicianSupportForm } from '../components';
import { useGetPhysicianSupportQuery } from '@/redux/features';

// ----------------------------------------------------------------------

interface Props {
  physicianSupportId: string | null;
}

const PhysicianSupportView: FC<Props> = ({ physicianSupportId }) => {
  const { data, isLoading } = useGetPhysicianSupportQuery(physicianSupportId!, {
    skip: physicianSupportId === null,
    refetchOnMountOrArgChange: true,
  });

  const action = data ? 'Editar' : 'Crear';

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl">
      <Box mb={5}>
        <Typography variant="h3" fontWeight="regular" my={2}>
          {action} Ayudante oncológico
        </Typography>
        <Breadcrumb />
      </Box>
      <PhysicianSupportForm physicianSupport={data} />
    </Container>
  );
};

export default PhysicianSupportView;
