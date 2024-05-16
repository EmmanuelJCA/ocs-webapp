import { z } from 'zod';
import validator from 'validator';

// ----------------------------------------------------------------------

export const OncologyCenterSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Nombre requerido' }),
  email: z.string().email({ message: 'Correo electrónico requerido' }),
  phone: z.string().refine(validator.isMobilePhone, { message: 'Teléfono inválido' }),
  isActive: z.boolean().optional(),
});

export type OncologyCenterRequest = z.infer<typeof OncologyCenterSchema>;
