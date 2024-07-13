import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../../infrastructure/drizzle/drizzle.module';
import * as schema from '../../../databases/schema';
import { eq, desc } from 'drizzle-orm';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { PaginateUtil } from 'src/common/utils/paginate.util';
import { TTodo } from 'src/contracts/todo/todo.contract';

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
      .select()
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

  async create(data: any): Promise<boolean> {
    await this.repo.insert(schema.todos).values(data);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.repo.delete(schema.todos).where(eq(schema.todos.id, id));
    return true;
  }

  async update(id: number, data: any): Promise<boolean> {
    await this.repo
      .update(schema.todos)
      .set(data)
      .where(eq(schema.todos.id, id))
      .returning();
    return true;
  }

  async findOne(id: number): Promise<TTodo> {
    return await this.repo
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, id))
      .then((data) => data[0]);
  }
}
