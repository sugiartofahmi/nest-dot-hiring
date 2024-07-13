import { createZodDto } from 'nestjs-zod';
import { TodoCreateSchema } from 'src/contracts/todo/todo.contract';

export class TodoCreateRequest extends createZodDto(TodoCreateSchema) {}
