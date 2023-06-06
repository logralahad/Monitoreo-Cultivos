import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';

import { getGreenhouseInfo } from 'src/utils/constants';

import { Crop } from 'src/app/crops/entities/crop.entity';
import { Greenhouse } from 'src/app/greenhouses/entities/greenhouse.entity';

@Entity('greenhouses_crops')
export class GreenhousesCrop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @ManyToOne(() => Crop, (crop) => crop.greenhousesCrops)
  crop: Crop;

  @Transform(({ value }) => getGreenhouseInfo(value))
  @ManyToOne(() => Greenhouse, (greenhouse) => greenhouse.crops)
  greenhouse: Greenhouse;
}
