import { createSelectSchema } from 'drizzle-zod';
import { users } from 'src/databases/schema';
import { z } from 'zod';

export const UserSchema = createSelectSchema(users, {
  password: z.string().optional(),
});

export const UserCreateSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
});
export const UserPutSchema = UserCreateSchema;
export const UserPatchSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
export type TUser = z.infer<typeof UserSchema>;
