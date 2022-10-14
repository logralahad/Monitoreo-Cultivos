import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Variable } from "./Variable";

@Entity()
export class Planta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  nombre!: string;

  @Column({ type: "varchar", length: 150 })
  descripcion!: string;

  @OneToMany((type) => Variable, (variable) => variable.planta, {
    cascade: true,
    onUpdate: "CASCADE",
  })
  variables!: Variable[];
}
