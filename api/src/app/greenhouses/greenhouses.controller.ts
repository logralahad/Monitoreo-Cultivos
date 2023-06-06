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
import { GreenhousesService } from './greenhouses.service';
import { CreateGreenhouseDto } from './dto/create-greenhouse.dto';
import { UpdateGreenhouseDto } from './dto/update-greenhouse.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('greenhouses')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class GreenhousesController {
  constructor(private readonly greenhousesService: GreenhousesService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  create(@Body() createGreenhouseDto: CreateGreenhouseDto) {
    return this.greenhousesService.create(createGreenhouseDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAll() {
    return this.greenhousesService.findAll();
  }

  @Get('/owned/:id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAllByUser(@Param('id') id: string) {
    return this.greenhousesService.findAllByUser(id);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findOne(@Param('id') id: string) {
    return this.greenhousesService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  update(
    @Param('id') id: string,
    @Body() updateGreenhouseDto: UpdateGreenhouseDto,
  ) {
    return this.greenhousesService.update(+id, updateGreenhouseDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  remove(@Param('id') id: string) {
    return this.greenhousesService.remove(+id);
  }
}
