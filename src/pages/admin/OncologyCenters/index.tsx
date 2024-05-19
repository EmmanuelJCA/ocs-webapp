import { Seo } from '@/components';
import { OncologyCentersView } from './view';

// ----------------------------------------------------------------------

const UsersPage = () => {
  return (
    <>
      <Seo name="Centros oncológicos" />

      <OncologyCentersView />
    </>
  );
};

export default UsersPage;
