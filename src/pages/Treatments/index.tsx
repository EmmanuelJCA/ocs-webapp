import { Seo } from '@/components';
import { TreatmentsView } from './view';

// ----------------------------------------------------------------------

const TreatmentsPage = () => {
  return (
    <>
      <Seo name="Gestión de Tratamientos oncológicos" />

      <TreatmentsView />
    </>
  );
};

export default TreatmentsPage;
