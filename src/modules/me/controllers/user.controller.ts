import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserSevice } from '../services/user.service';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserPutRequest } from '../requests/user-put.request';
import { UserPatchRequest } from '../requests/user-patch.request';
import { PaginateRequest } from 'src/contracts/common';

@Controller('users')
export class UserController {
  constructor(private readonly userSevice: UserSevice) {}

  @Get()
  async index(@Query() reguest: PaginateRequest): Promise<any> {
    return this.userSevice.pagination(reguest);
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<any> {
    return this.userSevice.detail(id);
  }

  @Post()
  async create(@Body() request: UserCreateRequest): Promise<any> {
    return this.userSevice.create(request);
  }

  @Put(':id')
  async putUpdate(
    @Param('id') id: number,
    @Body() request: UserPutRequest,
  ): Promise<any> {
    return this.userSevice.update(id, request);
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: number,
    @Body() request: UserPatchRequest,
  ): Promise<any> {
    return this.userSevice.update(id, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.userSevice.delete(id);
  }
}
