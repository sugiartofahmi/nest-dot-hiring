import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import * as schema from 'src/databases/schema';
import { eq, desc } from 'drizzle-orm';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { PaginateUtil } from 'src/common/utils/paginate.util';
import { TUser } from 'src/contracts/me/user/user.contract';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DRIZZLE) private repo: NodePgDatabase<typeof schema>,
    private readonly paginateUtil: PaginateUtil,
  ) {}

  async pagination(
    request: PaginateRequest,
  ): Promise<TPaginateResponse<TUser>> {
    const data = await this.repo
      .select()
      .from(schema.users)
      .limit(request?.perPage || 10)
      .offset(this.paginateUtil.getCountOffset(request))
      .orderBy(desc(schema.users.createdAt));

    const meta = this.paginateUtil.getMeta(data.length, request);

    return {
      data,
      meta,
    };
  }

  async create(data: any): Promise<boolean> {
    await this.repo.insert(schema.users).values(data);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.repo.delete(schema.users).where(eq(schema.users.id, id));
    return true;
  }

  async update(id: number, data: any): Promise<boolean> {
    await this.repo
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id));

    return true;
  }

  async findOne(id: number): Promise<TUser> {
    return await this.repo
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .then((data) => data[0]);
  }
}
