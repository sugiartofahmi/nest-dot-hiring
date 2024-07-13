import { createZodDto } from 'nestjs-zod';
import { TodoPutSchema } from 'src/contracts/todo/todo.contract';

export class TodoPutRequest extends createZodDto(TodoPutSchema) {}
