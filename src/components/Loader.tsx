import { Stack, LinearProgress } from '@mui/material';

// ----------------------------------------------------------------------

const Loader = () => {
  return (
    <Stack justifyContent="center" sx={{ height: 1, flexGrow: 1, padding: { xs: 6 } }}>
      <LinearProgress color="secondary" variant="indeterminate" />
    </Stack>
  );
};

export default Loader;
