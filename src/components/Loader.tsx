import { Stack, LinearProgress } from '@mui/material';

// ----------------------------------------------------------------------

export const Loader = () => {
  return (
    <Stack justifyContent="center" sx={{ height: 1, flexGrow: 1, padding: { xs: 6 } }}>
      <LinearProgress color="secondary" variant="indeterminate" />
    </Stack>
  );
};
