import { Seo } from '@/components';
import { PatientsView } from './view';

// ----------------------------------------------------------------------

const PatientsPage = () => {
  return (
    <>
      <Seo name="Pacientes" />

      <PatientsView />
    </>
  );
};

export default PatientsPage;
