import { Helmet } from 'react-helmet-async';

import { HomeView } from './view';

// ----------------------------------------------------------------------

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>App | Home</title>
      </Helmet>

      <HomeView />
    </>
  );
};

export default HomePage;
