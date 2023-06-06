import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('ADMINISTRADOR')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createWithRandomPassword(createUserDto);
  }

  @Get()
  @Roles('ADMINISTRADOR')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':keyword')
  @Roles('ADMINISTRADOR')
  findOneByKeyword(@Param('keyword') keyword: string) {
    return this.usersService.findOneByKeyword(keyword);
  }

  @Put()
  @Roles('ADMINISTRADOR')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
