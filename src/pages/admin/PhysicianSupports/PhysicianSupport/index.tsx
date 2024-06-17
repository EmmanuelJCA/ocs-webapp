import validator from 'validator';
import { useParams } from 'react-router-dom';

import { Seo } from '@/components';
import { PhysicianSupportView } from './view';

// ----------------------------------------------------------------------

const PhysicianSupportPage = () => {
  const { physicianSupportId } = useParams();

  const id = physicianSupportId && validator.isUUID(physicianSupportId) ? physicianSupportId : null;

  return (
    <>
      <Seo name="Ayudante oncológico" />

      <PhysicianSupportView physicianSupportId={id} />
    </>
  );
};

export default PhysicianSupportPage;
