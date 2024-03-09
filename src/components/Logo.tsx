import { forwardRef } from 'react';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { Link as RouterLink } from '@/router/components';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<BoxProps, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img"
      src="/assets/logo.svg"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
