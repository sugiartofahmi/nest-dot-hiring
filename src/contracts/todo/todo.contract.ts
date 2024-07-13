import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  userId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const TodoCreateSchema = TodoSchema.omit({ id: true });
export const TodoPutSchema = TodoCreateSchema;
export const TodoPatchSchema = z.object({
  completed: z.boolean().optional(),
  title: z.string().optional(),
  userId: z.number().optional(),
});

export type TTodo = z.infer<typeof TodoSchema>;
