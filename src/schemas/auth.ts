import { z } from 'zod';

// ----------------------------------------------------------------------

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico requerido' }),
  password: z.string().min(1, { message: 'Contraseña requerida' }),
});

export type SignIn = z.infer<typeof SignInSchema>;
