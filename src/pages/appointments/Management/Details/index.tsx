import validator from 'validator';
import { useParams } from 'react-router-dom';

import { Seo } from '@/components';
import { AppointmentDetailsView } from './views';

// ----------------------------------------------------------------------

const AppointmentDetailsPage = () => {
  const { appointmentId } = useParams();

  const id = appointmentId && validator.isUUID(appointmentId) ? appointmentId : null;
  return (
    <>
      <Seo name="Detalle de citas médica" />

      <AppointmentDetailsView appointmentId={id} />
    </>
  );
};

export default AppointmentDetailsPage;
