import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Link, Stack, Button, TextField } from '@mui/material';

import type { SignIn } from '@/types';
import { useRouter } from '@/router/hooks';
import { httpErrorHandler, setLocalStorageItem } from '@/utils';
import { setUser, useSignInMutation } from '@/redux/features/auth';

// ----------------------------------------------------------------------

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>();
  const [signInApi, { isLoading }] = useSignInMutation();

  const signIn = async (credentials: SignIn) => {
    try {
      const { user, token } = await signInApi(credentials).unwrap();
      setLocalStorageItem('token', token.accessToken);
      dispatch(setUser(user));
      router.push('/');
    } catch (error) {
      httpErrorHandler(error, {
        NOT_FOUND: 'Email or password is incorrect',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(signIn)}>
      <Stack spacing={3}>
        <TextField
          label="Email address"
          type="email"
          {...register('email', {
            required: 'this field is required',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'this field is required',
            minLength: { value: 6, message: 'minium 6 characters' },
            pattern: {
              value: /^[^\s]+$/,
              message: 'space not allowed',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={isLoading}
      >
        Login
      </Button>
    </Box>
  );
};

export default SignInForm;
