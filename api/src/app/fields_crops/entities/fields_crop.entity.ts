import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';

import { getFieldInfo } from 'src/utils/constants';

import { Crop } from 'src/app/crops/entities/crop.entity';
import { Field } from 'src/app/fields/entities/field.entity';

@Entity('fields_crops')
export class FieldsCrop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @ManyToOne(() => Crop, (crop) => crop.fieldsCrops)
  crop: Crop;

  @Transform(({ value }) => getFieldInfo(value))
  @ManyToOne(() => Field, (field) => field.crops)
  field: Field;
}
