import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FieldsCrop } from 'src/app/fields_crops/entities/fields_crop.entity';
import { GreenhousesCrop } from 'src/app/greenhouses_crops/entities/greenhouses_crop.entity';

@Entity('crops')
export class Crop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => FieldsCrop, (fieldCrop) => fieldCrop.crop)
  fieldsCrops: FieldsCrop[];

  @OneToMany(() => GreenhousesCrop, (greenhouseCrop) => greenhouseCrop.crop)
  greenhousesCrops: GreenhousesCrop[];
}
