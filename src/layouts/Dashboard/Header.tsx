import { FC } from 'react';
import { Box, Stack, AppBar, Toolbar, useTheme, IconButton } from '@mui/material';

import { bgBlur } from '@/theme/css';
import { Iconify } from '@/components';
import { NAV, HEADER } from './config';
import { useResponsive } from '@/hooks';
import { AccountPopover } from './common';

// ----------------------------------------------------------------------

interface Props {
  onOpenNav: VoidFunction;
}

const Header: FC<Props> = ({ onOpenNav }) => {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover />
        <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
