import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Planta } from "./Planta";

@Entity()
export class Variable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80 })
  magnitud!: string;

  @Column({ type: "varchar", length: 80 })
  unidad!: string;

  @Column({ type: "integer" })
  cantidad!: number;

  @Column({ name: "plantaId" })
  plantaId!: number;

  @ManyToOne((type) => Planta, (planta) => planta.variables, {
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "plantaId" })
  planta!: Planta;
}
