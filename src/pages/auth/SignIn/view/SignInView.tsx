import { alpha, useTheme } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';

import { useResponsive } from '@/hooks';
import { bgGradient } from '@/theme/css';
import { SignInForm } from '../components';

// ----------------------------------------------------------------------

export default function SignInView() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Box
        component="img"
        src="/assets/logo.svg"
        sx={{ position: 'absolute', height: 40, margin: { xs: 2, md: 5 } }}
      />
      <Stack
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        sx={{ height: 1 }}
      >
        {mdUp && (
          <Stack alignItems="center" gap={8} flexGrow={3}>
            <Typography variant="h3">Oncological Control System</Typography>
            <Box
              height={{ md: '520px', lg: '620px', xl: '720px' }}
              component="img"
              src="/assets/illustrations/icons-1.png"
            />
          </Stack>
        )}

        <Stack
          sx={{ bgcolor: '#fff', height: 1 }}
          alignItems="center"
          maxWidth={{ md: '480px' }}
          flexGrow={1}
        >
          <Box
            sx={{
              p: { xs: 2, md: 5 },
              mt: 20,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4" mb={4}>
              Ingresar a OCS
            </Typography>
            <SignInForm />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
