import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "./Rol";

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  imagenPerfil!: string;

  @Column({ type: "varchar", length: 60 })
  nombre!: string;

  @Column({ type: "varchar", length: 30 })
  paterno!: string;

  @Column({ type: "varchar", length: 30 })
  materno!: string;

  @Column({ type: "varchar", length: 80, unique: true })
  correo!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", length: 30 })
  telefono!: string;

  @Column({ name: "rolId" })
  rolId!: number;

  @ManyToOne((type) => Rol, (rol) => rol.usuario, {
    cascade: ["update"],
    nullable: false,
  })
  @JoinColumn({ name: "rolId" })
  rol!: Rol;
}
