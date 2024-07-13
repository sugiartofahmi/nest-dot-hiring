import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../../infrastructure/drizzle/drizzle.module';
import * as schema from '../../../databases/schema';
import { eq, desc } from 'drizzle-orm';

@Injectable()
export class TodoRepository {
  constructor(@Inject(DRIZZLE) private repo: NodePgDatabase<typeof schema>) {}

  async pagination() {
    return await this.repo
      .select()
      .from(schema.todos)
      .orderBy(desc(schema.todos.createdAt));
  }

  async create(data: any) {
    return await this.repo.insert(schema.todos).values(data).returning();
  }

  async delete(id: number) {
    return await this.repo.delete(schema.todos).where(eq(schema.todos.id, id));
  }

  async update(id: number, data: any) {
    return await this.repo
      .update(schema.todos)
      .set(data)
      .where(eq(schema.todos.id, id))
      .returning();
  }

  async findOne(id: number) {
    return await this.repo
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, id));
  }
}
