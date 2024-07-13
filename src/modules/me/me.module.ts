import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserSevice } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, UserSevice],
})
export class MeModule {}
