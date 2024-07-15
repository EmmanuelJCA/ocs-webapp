import { z } from 'zod';

// ----------------------------------------------------------------------

export const AppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  notes: z.string(),
  startDateTime: z.date({ message: 'Fecha de inicio requerida' }),
  endDateTime: z.date().optional().nullable(),
  reasonsIds: z.array(z.string().uuid()).min(1, { message: 'Razones requeridas' }),
  physicianId: z.string().uuid({ message: 'Unidad de medida requerida' }),
  patientId: z.string().uuid({ message: 'Unidad de medida requerida' }),
  oncologyCenterId: z.string().uuid({ message: 'Unidad de medida requerida' }),
});

export type AppointmentRequest = z.infer<typeof AppointmentSchema>;
