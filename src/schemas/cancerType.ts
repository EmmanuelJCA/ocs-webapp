import { z } from 'zod';

// ----------------------------------------------------------------------

export const CancerTypeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Nombre requerido' }),
  description: z.string().min(1, { message: 'Descripción requerida' }),
});

export type CancerTypeRequest = z.infer<typeof CancerTypeSchema>;
