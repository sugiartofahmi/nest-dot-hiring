import { createZodDto } from 'nestjs-zod';
import { UserCreateSchema } from 'src/contracts/me/user/user.contract';

export class UserCreateRequest extends createZodDto(UserCreateSchema) {}
