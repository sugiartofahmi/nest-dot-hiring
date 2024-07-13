import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserSevice } from './services/user.service';
import { PaginateUtil } from 'src/common/utils/paginate.util';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, UserSevice, PaginateUtil],
})
export class MeModule {}
