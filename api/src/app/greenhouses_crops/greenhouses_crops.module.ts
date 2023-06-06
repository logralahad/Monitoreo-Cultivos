import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GreenhousesCrop } from './entities/greenhouses_crop.entity';
import { GreenhousesCropsService } from './greenhouses_crops.service';
import { GreenhousesCropsController } from './greenhouses_crops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GreenhousesCrop])],
  controllers: [GreenhousesCropsController],
  providers: [GreenhousesCropsService],
})
export class GreenhousesCropsModule {}
