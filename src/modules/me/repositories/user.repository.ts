import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import * as schema from 'src/databases/schema';
import { eq, desc, inArray } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE) private repo: NodePgDatabase<typeof schema>) {}

  async pagination() {
    return await this.repo
      .select()
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt));
  }

  async create(data: any) {
    return await this.repo.insert(schema.users).values(data).returning();
  }

  async delete(id: string) {
    return await this.repo.delete(schema.users).where(eq(schema.users.id, id));
  }

  async update(id: string, data: any) {
    return await this.repo
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning();
  }

  async findOne(id: string) {
    return await this.repo
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }

  async bulkDelete(ids: string[]) {
    return await this.repo
      .delete(schema.users)
      .where(inArray(schema.users.id, ids));
  }
}
