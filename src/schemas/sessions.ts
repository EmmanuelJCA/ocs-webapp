import { z } from 'zod';

// ----------------------------------------------------------------------

export const SessionsSchema = z.object({
  id: z.string().uuid().optional(),
  instructions: z.string(),
  startDateTime: z.date({ message: 'Fecha de inicio requerida' }),
  endDateTime: z.date().optional().nullable(),
  observations: z.string(),
  physicianSupportId: z.string().uuid({ message: 'Tipo de tratamiento requerido' }),
  treatmentId: z.string().uuid({ message: 'Tipo de tratamiento requerido' }),
});

export type SessionsRequest = z.infer<typeof SessionsSchema>;

export const PartialSessionsSchema = SessionsSchema.partial();

export type PartialSessionsRequest = z.infer<typeof PartialSessionsSchema>;
