import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const UserCreateSchema = UserSchema.omit({ id: true });
export const UserPutSchema = UserCreateSchema;
export const UserPatchSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
export type TUser = z.infer<typeof UserSchema>;
