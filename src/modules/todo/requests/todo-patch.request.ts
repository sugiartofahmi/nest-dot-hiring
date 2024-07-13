import { createZodDto } from 'nestjs-zod';
import { TodoPatchSchema } from 'src/contracts/todo/todo.contract';

export class TodoPatchRequest extends createZodDto(TodoPatchSchema) {}
