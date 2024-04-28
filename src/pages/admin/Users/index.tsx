import { UsersView } from './view';
import { Seo } from '@/components';

// ----------------------------------------------------------------------

const UsersPage = () => {
  return (
    <>
      <Seo name="Usuarios" />

      <UsersView />
    </>
  );
};

export default UsersPage;
