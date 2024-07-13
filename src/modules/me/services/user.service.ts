import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { TUser } from 'src/contracts/me/user/user.contract';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserPutRequest } from '../requests/user-put.request';
import { UserPatchRequest } from '../requests/user-patch.request';

@Injectable()
export class UserSevice {
  constructor(private readonly userRepository: UserRepository) {}

  async pagination(
    request: PaginateRequest,
  ): Promise<TPaginateResponse<TUser>> {
    return await this.userRepository.pagination(request);
  }

  async findOne(id: number): Promise<TUser> {
    await this.isUserExistById(id);
    const data = await this.userRepository.findOne(id);
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async create(data: UserCreateRequest): Promise<boolean> {
    return await this.userRepository.create(data);
  }

  async delete(id: number): Promise<boolean> {
    await this.isUserExistById(id);
    return await this.userRepository.delete(id);
  }

  async update(
    id: number,
    data: UserPutRequest | UserPatchRequest,
  ): Promise<boolean> {
    await this.isUserExistById(id);
    return await this.userRepository.update(id, data);
  }

  async isUserExistById(id: number): Promise<boolean> {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async validateUser(password: string): Promise<boolean> {
    return true;
  }
}
