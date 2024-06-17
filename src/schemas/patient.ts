import { z } from 'zod';
import validator from 'validator';

import { Genre } from '@/types';

// ----------------------------------------------------------------------

const IDENTIFICATION_REGEX = new RegExp(/[EGJPV]-\d{8}/);

export const PatientSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, { message: 'Nombre requerido' }),
  lastName: z.string().min(1, { message: 'Apellido requerido' }),
  email: z.string().email({ message: 'Correo electrónico requerido' }),
  identification: z
    .string()
    .regex(IDENTIFICATION_REGEX, { message: 'Cédula inválida, ej: V-09123123' }),
  genre: z.nativeEnum(Genre),
  dateOfBirth: z.date({ message: 'Fecha de nacimiento requerida' }),
  phone: z
    .string()
    .startsWith('+', { message: 'Código de país requerido ej: +58' })
    .refine(validator.isMobilePhone, { message: 'Teléfono inválido, ej: +584141231234' }),
});

export type PatientRequest = z.infer<typeof PatientSchema>;
