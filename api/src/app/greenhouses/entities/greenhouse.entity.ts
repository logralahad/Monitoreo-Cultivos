import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude, Transform } from 'class-transformer';

import { getOwnerName } from 'src/utils/constants';

import { User } from 'src/app/users/entities/user.entity';
import { GreenhousesCrop } from 'src/app/greenhouses_crops/entities/greenhouses_crop.entity';

@Entity('greenhouses')
export class Greenhouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => GreenhousesCrop, (crops) => crops.greenhouse)
  crops: GreenhousesCrop[];

  @Transform(({ value }) => getOwnerName(value))
  @ManyToOne(() => User, (user) => user.greenhouses, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;
}
