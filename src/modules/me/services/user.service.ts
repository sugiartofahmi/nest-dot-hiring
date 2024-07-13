import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PaginateRequest, TPaginateResponse } from 'src/contracts/common';
import { TUser } from 'src/contracts/me/user/user.contract';

@Injectable()
export class UserSevice {
  constructor(private readonly userRepository: UserRepository) {}

  async pagination(
    request: PaginateRequest,
  ): Promise<TPaginateResponse<TUser>> {
    return await this.userRepository.pagination(request);
  }

  async detail(id: number): Promise<TUser> {
    return await this.userRepository.findOne(id);
  }

  async create(data: any): Promise<boolean> {
    return await this.userRepository.create(data);
  }

  async delete(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  async update(id: number, data: any): Promise<boolean> {
    return await this.userRepository.update(id, data);
  }
}
