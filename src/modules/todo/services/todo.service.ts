import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { ApiService } from '../../api/services/api.service';
@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly apiService: ApiService,
  ) {}

  async pagination() {
    return await this.todoRepository.pagination();
  }

  async detail(id: number) {
    const data = await this.apiService.findOne(id);
    console.log(data);
    return await this.todoRepository.findOne(id);
  }

  async create(data: any) {
    return await this.todoRepository.create(data);
  }

  async delete(id: number) {
    return await this.todoRepository.delete(id);
  }

  async update(id: number, data: any) {
    return await this.todoRepository.update(id, data);
  }
}
