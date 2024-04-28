import { z } from 'zod';

const MB_BYTES = 1000000;

const MAX_SIZE_MB = 3;
const ACCEPTED_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

export const imageSchema = z.instanceof(File).superRefine((f, ctx) => {
  if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El tipo de archivo debe ser uno de [${ACCEPTED_MIME_TYPES.join(', ')}] pero es de tipo: ${f.type}`,
    });
  }
  if (f.size > MAX_SIZE_MB * MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: 'array',
      message: `El peso del archivo no debe ser mayor de  ${MAX_SIZE_MB} MB, peso actual: ${f.size / MB_BYTES} MB`,
      maximum: MAX_SIZE_MB * MB_BYTES,
      inclusive: true,
    });
  }
});
