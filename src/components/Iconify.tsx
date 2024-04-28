import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { Icon, IconProps } from '@iconify/react';

interface Props extends BoxProps, Omit<IconProps, keyof BoxProps> {}

const Iconify = forwardRef<BoxProps, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.displayName = 'Iconify';

export { Iconify };
