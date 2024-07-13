import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../../infrastructure/drizzle/drizzle.module';
import * as schema from '../../../databases/schema';
import { eq, desc, ilike } from 'drizzle-orm';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { PaginateUtil } from 'src/common/utils/paginate.util';
import { TTodo } from 'src/contracts/todo/todo.contract';
import { TodoCreateRequest } from '../requests/todo-create.request';
import { TodoPutRequest } from '../requests/todo-put.request';
import { TodoPatchRequest } from '../requests/todo-patch.request';

@Injectable()
export class TodoRepository {
  constructor(
    @Inject(DRIZZLE) private repo: NodePgDatabase<typeof schema>,
    private readonly paginateUtil: PaginateUtil,
  ) {}

  async pagination(
    request: PaginateRequest,
  ): Promise<TPaginateResponse<TTodo>> {
    const data = await this.repo
      .select({
        id: schema.todos.id,
        title: schema.todos.title,
        completed: schema.todos.completed,
        createdAt: schema.todos.createdAt,
        updatedAt: schema.todos.updatedAt,
      })
      .from(schema.todos)
      .limit(request?.perPage || 10)
      .offset(this.paginateUtil.getCountOffset(request))
      .orderBy(desc(schema.todos.createdAt));

    const meta = this.paginateUtil.getMeta(data.length, request);

    return {
      data,
      meta,
    };
  }

  async create(data: TodoCreateRequest): Promise<TTodo> {
    return await this.repo
      .insert(schema.todos)
      .values(data)
      .returning({
        id: schema.todos.id,
        title: schema.todos.title,
        completed: schema.todos.completed,
        createdAt: schema.todos.createdAt,
        updatedAt: schema.todos.updatedAt,
      })
      .then((data) => data[0]);
  }

  async delete(id: number): Promise<boolean> {
    await this.repo.delete(schema.todos).where(eq(schema.todos.id, id));
    return true;
  }

  async upsert(
    id: number,
    data: TodoPatchRequest | TodoPutRequest,
  ): Promise<boolean> {
    await this.repo
      .insert(schema.todos)
      .values({
        id,
        ...data,
      })
      .onConflictDoUpdate({
        target: schema.todos.id,
        set: {
          id,
          ...data,
          updatedAt: new Date(),
        },
      });

    return true;
  }

  async findOne(id: number): Promise<TTodo> {
    return await this.repo
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, id))
      .then((data) => data[0]);
  }

  async isExistByTitle(title: string): Promise<boolean> {
    const result = await this.repo
      .select()
      .from(schema.todos)
      .where(ilike(schema.todos.title, `%${title}%`));

    return result.length > 0;
  }

  async isExistById(id: number): Promise<boolean> {
    const result = await this.findOne(id);
    if (!result) {
      return false;
    }
    return true;
  }
}
