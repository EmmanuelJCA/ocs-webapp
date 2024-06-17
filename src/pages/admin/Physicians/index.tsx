import { Seo } from '@/components';
import { PhysiciansView } from './view';

// ----------------------------------------------------------------------

const PhysiciansPage = () => {
  return (
    <>
      <Seo name="Oncólogos" />

      <PhysiciansView />
    </>
  );
};

export default PhysiciansPage;
