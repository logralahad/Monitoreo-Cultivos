import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude, Transform } from 'class-transformer';

import { Role } from 'src/app/roles/entities/role.entity';
import { Farmer } from 'src/app/farmers/entities/farmer.entity';
import { Company } from 'src/app/companies/entities/company.entity';
import { Field } from 'src/app/fields/entities/field.entity';
import { Greenhouse } from 'src/app/greenhouses/entities/greenhouse.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  verified: boolean;

  @Exclude()
  @Column({ nullable: true, length: 4 })
  code: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @OneToMany(() => Farmer, (farmer) => farmer.user, { cascade: ['remove'] })
  farmers: Farmer[];

  @Exclude()
  @OneToMany(() => Company, (company) => company.user, { cascade: ['remove'] })
  companies: Company[];

  @Exclude()
  @OneToMany(() => Greenhouse, (greenhouse) => greenhouse.user, {
    cascade: ['remove'],
  })
  greenhouses: Greenhouse[];

  @Exclude()
  @OneToMany(() => Field, (field) => field.user, { cascade: ['remove'] })
  fields: Field[];

  @Transform(({ value }) => value.name || value)
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn([{ name: 'role', referencedColumnName: 'name' }])
  role: Role;
}
