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
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index(@Query() reguest: any): Promise<any> {
    return this.todoService.pagination();
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<any> {
    return this.todoService.detail(id);
  }

  @Post()
  async create(@Body() request: any): Promise<any> {
    return this.todoService.create(request);
  }

  @Put(':id')
  async putUpdate(@Param('id') id: number, @Body() request: any): Promise<any> {
    return this.todoService.update(id, request);
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: number,
    @Body() request: any,
  ): Promise<any> {
    return this.todoService.update(id, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.todoService.delete(id);
  }
}
