import { createZodDto } from 'nestjs-zod';
import { UserPatchSchema } from 'src/contracts/me/user/user.contract';

export class UserPatchRequest extends createZodDto(UserPatchSchema) {}
