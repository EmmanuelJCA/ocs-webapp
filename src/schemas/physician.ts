import { z } from 'zod';

import { UserSchema } from './user';

export const PhysicianSchema = UserSchema.extend({
  specializationsIds: z
    .array(z.string().uuid())
    .min(1, { message: 'Especializaciones requeridas' }),
});

export const UpdatePhysicianSchema = PhysicianSchema.omit({ password: true }).and(
  z.object({
    isActive: z.boolean(),
    password: z.string().optional(),
  })
);

export type PhysicianRequest = z.infer<typeof PhysicianSchema>;
