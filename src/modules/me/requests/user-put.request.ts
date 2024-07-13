import { createZodDto } from 'nestjs-zod';
import { UserPutSchema } from 'src/contracts/me/user/user.contract';

export class UserPutRequest extends createZodDto(UserPutSchema) {}
