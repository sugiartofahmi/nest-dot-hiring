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

@Controller('users')
export class UserController {
  constructor(private readonly userSevice: UserSevice) {}

  @Get()
  async index(@Query() reguest: any): Promise<any> {
    return this.userSevice.pagination();
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<any> {
    return this.userSevice.detail(id);
  }

  @Post()
  async create(@Body() request: any): Promise<any> {
    return this.userSevice.create(request);
  }

  @Put(':id')
  async putUpdate(@Param('id') id: string, @Body() request: any): Promise<any> {
    return this.userSevice.update(id, request);
  }

  @Patch(':id')
  async patchUpdate(
    @Param('id') id: string,
    @Body() request: any,
  ): Promise<any> {
    return this.userSevice.update(id, request);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.userSevice.delete(id);
  }

  @Post('deletes')
  async bulkDelete(@Body() request: any): Promise<any> {
    return this.userSevice.bulkDelete(request.ids);
  }
}
