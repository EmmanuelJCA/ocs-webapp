import validator from 'validator';
import { useParams } from 'react-router-dom';

import { Seo } from '@/components';
import { PhysicianView } from './view';

// ----------------------------------------------------------------------

const PhysicianPage = () => {
  const { physicianId } = useParams();

  const id = physicianId && validator.isUUID(physicianId) ? physicianId : null;

  return (
    <>
      <Seo name="Oncólogo" />

      <PhysicianView physicianId={id} />
    </>
  );
};

export default PhysicianPage;
