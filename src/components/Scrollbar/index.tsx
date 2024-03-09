import { SxProps } from '@mui/material';
import { FC, memo, forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Props as SimpleBarProps } from 'simplebar-react';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------

interface Props extends React.HTMLAttributes<HTMLDivElement>, SimpleBarProps {
  children: React.ReactNode;
  sx?: SxProps;
}

const Scrollbar: FC<Props> = memo(
  forwardRef<BoxProps, Props>(({ children, sx, ...other }, ref) => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  })
);

export default Scrollbar;
