import validator from 'validator';
import { useParams } from 'react-router-dom';

import { UserView } from './view';
import { Seo } from '@/components';

// ----------------------------------------------------------------------

const UserPage = () => {
  const { userId } = useParams();

  const id = userId && validator.isUUID(userId) ? userId : null;

  return (
    <>
      <Seo name="Usuario" />

      <UserView userId={id} />
    </>
  );
};

export default UserPage;
