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

import { FieldsCropsService } from './fields_crops.service';
import { CreateFieldsCropDto } from './dto/create-fields_crop.dto';
import { UpdateFieldsCropDto } from './dto/update-fields_crop.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('fields-crops')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class FieldsCropsController {
  constructor(private readonly fieldsCropsService: FieldsCropsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  create(@Body() createFieldsCropDto: CreateFieldsCropDto) {
    return this.fieldsCropsService.create(createFieldsCropDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAll() {
    return this.fieldsCropsService.findAll();
  }

  @Get('field/:id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAllByField(@Param('id') id: string) {
    return this.fieldsCropsService.findAllByField(+id);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findOne(@Param('id') id: string) {
    return this.fieldsCropsService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  update(
    @Param('id') id: string,
    @Body() updateFieldsCropDto: UpdateFieldsCropDto,
  ) {
    return this.fieldsCropsService.update(+id, updateFieldsCropDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  remove(@Param('id') id: string) {
    return this.fieldsCropsService.remove(+id);
  }
}
