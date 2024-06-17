import { z } from 'zod';

// ----------------------------------------------------------------------

export const SuppliesSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: 'Nombre requerido' }),
  description: z.string().min(1, { message: 'Descripción requerida' }),
  treatmentTypesIds: z
    .array(z.string().uuid())
    .min(1, { message: 'Tipo de tratamiento requerido' }),
  measurementUnitId: z.string().uuid({ message: 'Unidad de medida requerida' }),
});

export type SuppliesRequest = z.infer<typeof SuppliesSchema>;
