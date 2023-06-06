import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { FarmersService } from './farmers.service';

import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.create(createFarmerDto);
  }

  @Get()
  findAll() {
    return this.farmersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmersService.findOneById(id);
  }

  @Put()
  update(@Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmersService.update(updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmersService.remove(id);
  }
}
