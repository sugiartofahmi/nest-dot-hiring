import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { config } from 'src/common/config';
import { TTodoApiResponse } from 'src/contracts/todo/todo.contract';
import { TodoCreateRequest } from 'src/modules/todo/requests/todo-create.request';
import { TodoPatchRequest } from 'src/modules/todo/requests/todo-patch.request';
import { TodoPutRequest } from 'src/modules/todo/requests/todo-put.request';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  private logger: Logger = new Logger(ApiService.name);

  async findOne(
    id: number,
  ): Promise<(TodoCreateRequest & { id: number }) | null> {
    try {
      const result = await this.httpService.get(
        `${config.apiIntegration.url}/todos/${id}`,
      );
      return result?.data;
    } catch (error) {
      this.logger.error(
        `Can't get data from api with id ${id}: ${error.message}`,
      );
      return null;
    }
  }

  async create(data: TodoCreateRequest): Promise<TTodoApiResponse | null> {
    try {
      const result = await this.httpService.post(
        `${config.apiIntegration.url}/todos/`,
        data,
      );
      return result?.data;
    } catch (error) {
      this.logger.error(`Can't create data in api: ${error.message}`);
      return null;
    }
  }

  async delete(id: number): Promise<TTodoApiResponse | null> {
    try {
      const result = await this.httpService.delete(
        `${config.apiIntegration.url}/todos/${id}`,
      );

      return result?.data;
    } catch (error) {
      this.logger.error(
        `Can't delete data from api with id ${id}: ${error.message}`,
      );
      return null;
    }
  }

  async putUpdate(
    id: number,
    data: TodoPutRequest,
  ): Promise<TTodoApiResponse | null> {
    try {
      const result = await this.httpService.put(
        `${config.apiIntegration.url}/todos/${id}`,
        data,
      );

      return result?.data;
    } catch (error) {
      this.logger.error(
        `Can't put update data in api with id ${id}: ${error.message}`,
      );
      return null;
    }
  }

  async patchUpdate(
    id: number,
    data: TodoPatchRequest,
  ): Promise<TTodoApiResponse | null> {
    try {
      const result = await this.httpService.patch(
        `${config.apiIntegration.url}/todos/${id}`,
        data,
      );

      return result?.data;
    } catch (error) {
      this.logger.error(
        `Can't patch update data in api with id ${id}: ${error.message}`,
      );
      return null;
    }
  }
}
