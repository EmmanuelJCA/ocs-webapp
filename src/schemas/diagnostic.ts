import { z } from 'zod';

// ----------------------------------------------------------------------

export const DiagnosticSchema = z.object({
  id: z.string().uuid().optional(),
  notes: z.string(),
  date: z.date({ message: 'Fecha requerida' }),
  appointmentId: z.string().uuid({ message: 'Cita requerida' }),
  cancerTypeId: z.string().uuid({ message: 'Tipo de cáncer requerido' }),
  cancerStageId: z.string().uuid({ message: 'Etapa del cáncer requerida' }),
});

export type DiagnosticRequest = z.infer<typeof DiagnosticSchema>;
