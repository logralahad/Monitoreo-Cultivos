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

import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('crops')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(+id, updateCropDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  remove(@Param('id') id: string) {
    return this.cropsService.remove(+id);
  }
}
