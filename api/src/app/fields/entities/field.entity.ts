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
import { FieldsCrop } from 'src/app/fields_crops/entities/fields_crop.entity';

@Entity('fields')
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => FieldsCrop, (crops) => crops.field)
  crops: FieldsCrop[];

  @Transform(({ value }) => getOwnerName(value))
  @ManyToOne(() => User, (user) => user.fields, {
    eager: true,
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;
}
