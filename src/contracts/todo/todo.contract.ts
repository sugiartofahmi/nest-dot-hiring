import { createSelectSchema } from 'drizzle-zod';
import { todos } from 'src/databases/schema';
import { z } from 'zod';

export const TodoSchema = createSelectSchema(todos).omit({
  userId: true,
});
export const TodoCreateSchema = z.object({
  title: z.string(),
  completed: z.boolean().optional(),
  id: z.number().optional(),
});
export const TodoPutSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});
export const TodoPatchSchema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
});

export type TTodo = z.infer<typeof TodoSchema>;
export type TTodoApiResponse = {
  id: number;
  title: string;
  completed: boolean;
};
