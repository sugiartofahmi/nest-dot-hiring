import { z } from 'zod';
import { UserSchema } from '../me/user/user.contract';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type TLogin = z.infer<typeof LoginResponseSchema>;
