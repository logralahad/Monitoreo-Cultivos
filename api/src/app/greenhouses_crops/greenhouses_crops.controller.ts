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

import { GreenhousesCropsService } from './greenhouses_crops.service';
import { CreateGreenhousesCropDto } from './dto/create-greenhouses_crop.dto';
import { UpdateGreenhousesCropDto } from './dto/update-greenhouses_crop.dto';

import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('greenhouses-crops')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AccessTokenGuard, RolesGuard)
export class GreenhousesCropsController {
  constructor(
    private readonly greenhousesCropsService: GreenhousesCropsService,
  ) {}

  @Post()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  create(@Body() createGreenhousesCropDto: CreateGreenhousesCropDto) {
    return this.greenhousesCropsService.create(createGreenhousesCropDto);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAll() {
    return this.greenhousesCropsService.findAll();
  }

  @Get('greenhouse/:id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findAllByGreenhouse(@Param('id') id: string) {
    return this.greenhousesCropsService.findAllByGreenhouse(+id);
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  findOne(@Param('id') id: string) {
    return this.greenhousesCropsService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  update(
    @Param('id') id: string,
    @Body() updateGreenhousesCropDto: UpdateGreenhousesCropDto,
  ) {
    return this.greenhousesCropsService.update(+id, updateGreenhousesCropDto);
  }

  @Delete(':id')
  @Roles('ADMINISTRADOR', 'AGRICULTOR', 'EMPRESA')
  remove(@Param('id') id: string) {
    return this.greenhousesCropsService.remove(+id);
  }
}
