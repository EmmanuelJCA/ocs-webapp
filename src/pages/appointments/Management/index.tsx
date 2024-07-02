import { Seo } from '@/components';
import { AppointmentManagementView } from './view';

// ----------------------------------------------------------------------

const AppointmentManagementPage = () => {
  return (
    <>
      <Seo name="Gestión de citas médicas" />

      <AppointmentManagementView />
    </>
  );
};

export default AppointmentManagementPage;
