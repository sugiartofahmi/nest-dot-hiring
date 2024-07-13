import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from 'src/contracts/auth/auth.contract';

export class LoginRequest extends createZodDto(LoginSchema) {}
