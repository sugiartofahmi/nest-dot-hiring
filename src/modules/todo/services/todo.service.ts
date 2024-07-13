import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { ApiService } from '../../api/services/api.service';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { TTodo } from 'src/contracts/todo/todo.contract';
import { TodoCreateRequest } from '../requests/todo-create.request';
import { TodoPutRequest } from '../requests/todo-put.request';
import { TodoPatchRequest } from '../requests/todo-patch.request';
@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly apiService: ApiService,
  ) {}

  async pagination(
    request: PaginateRequest,
  ): Promise<TPaginateResponse<TTodo>> {
    return await this.todoRepository.pagination(request);
  }

  async detail(id: number): Promise<TTodo> {
    const [dataApi, dataLocal] = await Promise.all([
      this.apiService.findOne(id),
      this.todoRepository.findOne(id),
    ]);

    if (!dataApi && !dataLocal) {
      throw new NotFoundException('Todo not found');
    }

    if (dataApi && !dataLocal) {
      return await this.todoRepository.create({
        title: dataApi.title,
        completed: dataApi.completed,
        id: dataApi.id,
      });
    }

    return dataLocal;
  }

  async create(data: TodoCreateRequest): Promise<TTodo> {
    const createTodo = await this.apiService.create(data);
    if (!createTodo) {
      throw new UnprocessableEntityException('Failed to create todo');
    }
    return await this.todoRepository.create(createTodo);
  }

  async delete(id: number): Promise<boolean> {
    await this.apiService.delete(id);
    return await this.todoRepository.delete(id);
  }

  async patchUpdate(id: number, data: TodoPatchRequest): Promise<boolean> {
    const result = await this.apiService.patchUpdate(id, data);
    if (!result) {
      throw new NotFoundException('Todo not found');
    }
    return await this.todoRepository.upsert(result.id, result);
  }

  async putUpdate(id: number, data: TodoPutRequest): Promise<boolean> {
    const result = await this.apiService.putUpdate(id, data);
    if (!result) {
      throw new NotFoundException('Todo not found');
    }
    return await this.todoRepository.upsert(id, data);
  }
}
