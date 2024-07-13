import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { ApiService } from '../../api/services/api.service';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { TTodo } from 'src/contracts/todo/todo.contract';
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
    const data = await this.apiService.findOne(id);
    return await this.todoRepository.findOne(id);
  }

  async create(data: any): Promise<boolean> {
    return await this.todoRepository.create(data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.todoRepository.delete(id);
  }

  async update(id: number, data: any): Promise<boolean> {
    return await this.todoRepository.update(id, data);
  }
}
