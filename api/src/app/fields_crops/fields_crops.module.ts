import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FieldsCrop } from './entities/fields_crop.entity';
import { FieldsCropsService } from './fields_crops.service';
import { FieldsCropsController } from './fields_crops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FieldsCrop])],
  controllers: [FieldsCropsController],
  providers: [FieldsCropsService],
})
export class FieldsCropsModule {}
