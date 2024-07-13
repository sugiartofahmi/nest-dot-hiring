import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoRepository } from './repositories/todo.repository';
import { TodoService } from './services/todo.service';
import { ApiModule } from '../api/api.module';
import { PaginateUtil } from 'src/common/utils/paginate.util';
@Module({
  imports: [ApiModule],
  controllers: [TodoController],
  providers: [TodoRepository, TodoService, PaginateUtil],
})
export class TodoModule {}
