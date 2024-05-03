import { z } from 'zod';
import validator from 'validator';

import { imageSchema } from './file';
import { Role, Genre } from '@/types';

// ----------------------------------------------------------------------

const IDENTIFICATION_REGEX = new RegExp(/[EGJPV]-\d{8}/);

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, { message: 'Nombre requerido' }),
  lastName: z.string().min(1, { message: 'Apellido requerido' }),
  email: z.string().email({ message: 'Correo electrónico requerido' }),
  password: z.string().min(1, { message: 'Contraseña requerida' }),
  identification: z.string().regex(IDENTIFICATION_REGEX, { message: 'Cédula inválida' }),
  genre: z.nativeEnum(Genre),
  roles: z.array(z.nativeEnum(Role)).min(1, { message: 'Roles requeridos' }),
  dateOfBirth: z.date({ message: 'Fecha de nacimiento requerida' }),
  phone: z.string().refine(validator.isMobilePhone, { message: 'Teléfono inválido' }),
  inactivatedAt: z.date().optional(),
  oncologyCentersIds: z
    .array(z.string().uuid())
    .min(1, { message: 'Centros oncológicos requeridos' }),
  avatar: imageSchema.or(z.string()).optional(),
});

export const updateUserSchema = UserSchema.and(
  z.object({
    isActive: z.boolean(),
    password: z.string().email({ message: 'Correo electrónico requerido' }),
  })
);

export type UserRequest = z.infer<typeof UserSchema>;
