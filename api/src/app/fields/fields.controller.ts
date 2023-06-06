import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('fields')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAll() {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(+id);
  }

  @Get('/owned/:id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAllByUser(@Param('id') id: string) {
    return this.fieldsService.findAllByUser(id);
  }

  @Put(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(+id);
  }
}
