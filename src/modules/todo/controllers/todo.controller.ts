import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { TodoCreateRequest } from '../requests/todo-create.request';
import { TodoPutRequest } from '../requests/todo-put.request';
import { TodoPatchRequest } from '../requests/todo-patch.request';
import {
  PaginateRequest,
  TPaginateResponse,
  TResponse,
} from 'src/contracts/common';
import { TTodo } from 'src/contracts/todo/todo.contract';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index(
    @Query() reguest: PaginateRequest,
  ): Promise<TPaginateResponse<TTodo>> {
    return this.todoService.pagination(reguest);
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<TResponse<TTodo>> {
    const data = await this.todoService.detail(id);
    return {
      data,
    };
  }

  @Post()
  async create(@Body() request: TodoCreateRequest): Promise<TResponse<TTodo>> {
    await this.todoService.create(request);
    return {
      message: 'Todo created successfully',
    };
  }

  @Put(':id')
  async putUpdate(
    @Param('id') id: number,
    @Body() request: TodoPutRequest,
  ): Promise<TResponse<TTodo>> {
    await this.todoService.update(id, request);

    return {
      message: 'Todo updated successfully',
    };
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: number,
    @Body() request: TodoPatchRequest,
  ): Promise<TResponse<TTodo>> {
    await this.todoService.update(id, request);
    return {
      message: 'Todo updated successfully',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<TResponse<TTodo>> {
    await this.todoService.delete(id);
    return {
      message: 'Todo deleted successfully',
    };
  }
}
