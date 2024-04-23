import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Link, Stack, Button, TextField } from '@mui/material';

import type { SignIn } from '@/types';
import { useRouter } from '@/router/hooks';
import { httpErrorHandler, setLocalStorageItem } from '@/utils';
import { setUser, useSignInMutation } from '@/redux/features/auth';

// ----------------------------------------------------------------------

export const SignInForm = () => {
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
        NOT_FOUND: 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(signIn)}>
      <Stack spacing={3}>
        <TextField
          label="Correo electrónico"
          type="email"
          {...register('email', {
            required: 'éste campo es requerido',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'correo no valido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Contraseña"
          type="password"
          {...register('password', {
            required: 'éste campo es requerido',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
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
        Ingresar
      </Button>
    </Box>
  );
};
