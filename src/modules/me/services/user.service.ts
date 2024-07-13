import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserSevice {
  constructor(private readonly userRepository: UserRepository) {}

  async pagination() {
    return await this.userRepository.pagination();
  }

  async detail(id: number) {
    return await this.userRepository.findOne(id);
  }

  async create(data: any) {
    return await this.userRepository.create(data);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async update(id: number, data: any) {
    return await this.userRepository.update(id, data);
  }
}
