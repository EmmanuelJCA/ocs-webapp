import { HomeView } from './view';
import { Seo } from '@/components';

// ----------------------------------------------------------------------

const HomePage = () => {
  return (
    <>
      <Seo name="Inicio" />

      <HomeView />
    </>
  );
};

export default HomePage;
