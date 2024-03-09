import { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

interface Props extends BoxProps, Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BoxProps> {
  src: string;
}

// eslint-disable-next-line react/display-name
const SvgColor = forwardRef<BoxProps, Props>(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
