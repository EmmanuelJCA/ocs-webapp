import Box from '@mui/material/Box';
import { FC, useState } from 'react';

import Nav from './Nav';
import Main from './Main';
import Header from './Header';

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
};

export default DashboardLayout;
