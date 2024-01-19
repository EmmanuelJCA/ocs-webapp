import { FC } from 'react';

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default MainLayout;
