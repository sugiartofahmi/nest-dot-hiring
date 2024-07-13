import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import * as schema from 'src/databases/schema';
import { eq, desc } from 'drizzle-orm';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { PaginateUtil } from 'src/common/utils/paginate.util';
import { TUser } from 'src/contracts/me/user/user.contract';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserPutRequest } from '../requests/user-put.request';
import { UserPatchRequest } from '../requests/user-patch.request';

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
      .select({
        id: schema.users.id,
        fullName: schema.users.fullName,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
      })
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

  async create(data: UserCreateRequest): Promise<boolean> {
    await this.repo.insert(schema.users).values(data);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.repo.delete(schema.users).where(eq(schema.users.id, id));

    return true;
  }

  async update(
    id: number,
    data: UserPutRequest | UserPatchRequest,
  ): Promise<boolean> {
    await this.repo
      .update(schema.users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
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

  async findOneByEmail(email: string): Promise<TUser> {
    return await this.repo
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .then((data) => data[0]);
  }
}
