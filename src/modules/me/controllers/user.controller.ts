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
import {
  PaginateRequest,
  TPaginateResponse,
  TResponse,
} from 'src/contracts/common';
import { TUser } from 'src/contracts/me/user/user.contract';

@Controller('users')
export class UserController {
  constructor(private readonly userSevice: UserSevice) {}

  @Get()
  async index(
    @Query() reguest: PaginateRequest,
  ): Promise<TPaginateResponse<TUser>> {
    return await this.userSevice.pagination(reguest);
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<TResponse<TUser>> {
    const data = await this.userSevice.detail(id);

    return {
      data,
    };
  }

  @Post()
  async create(@Body() request: UserCreateRequest): Promise<TResponse<TUser>> {
    await this.userSevice.create(request);
    return {
      message: 'User created successfully',
    };
  }

  @Put(':id')
  async putUpdate(
    @Param('id') id: number,
    @Body() request: UserPutRequest,
  ): Promise<TResponse<TUser>> {
    await this.userSevice.update(id, request);
    return {
      message: 'User created successfully',
    };
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: number,
    @Body() request: UserPatchRequest,
  ): Promise<TResponse<TUser>> {
    await this.userSevice.update(id, request);
    return {
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<TResponse<TUser>> {
    await this.userSevice.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
