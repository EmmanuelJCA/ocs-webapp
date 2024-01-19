import { Helmet } from 'react-helmet-async';

import { SignInView } from './view';

// ----------------------------------------------------------------------

const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>App | Sign in</title>
      </Helmet>

      <SignInView />
    </>
  );
};

export default SignInPage;
