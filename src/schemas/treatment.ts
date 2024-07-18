import { z } from 'zod';

import { TreatmentResult } from '@/types';

// ----------------------------------------------------------------------

export const TreatmentSchema = z.object({
  id: z.string().uuid().optional(),
  instructions: z.string(),
  startDateTime: z.date({ message: 'Fecha de inicio requerida' }),
  endDateTime: z.date().optional().nullable(),
  result: z.nativeEnum(TreatmentResult).nullable(),
  resultNotes: z.string().nullable(),
  treatmentTypeId: z.string().uuid({ message: 'Tipo de tratamiento requerido' }),
  oncologyCenterId: z.string().uuid({ message: 'Centro oncológico requerido' }),
  physicianId: z.string().uuid({ message: 'oncólogo requerido' }),
  diagnosticId: z.string().uuid({ message: 'Diagnostico requerido requerida' }),
});

export type TreatmentRequest = z.infer<typeof TreatmentSchema>;

export const PartialTreatmentSchema = TreatmentSchema.partial();

export type PartialTreatmentRequest = z.infer<typeof PartialTreatmentSchema>;
