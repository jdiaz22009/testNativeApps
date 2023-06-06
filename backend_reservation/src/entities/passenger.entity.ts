import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { StatusPassenger } from "../types";
import { BookingEntity } from "./booking.entity";

@Entity()
export class PassengerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "uid", type: "varchar" })
  @Generated("uuid")
  uid!: string;

  @Column({ name: "name", type: "varchar" })
  name!: string;

  @Column({ name: "email", type: "varchar" })
  email!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;

  @Column({
    name: "status",
    type: "enum",
    enum: StatusPassenger,
    default: StatusPassenger.ENABLED,
  })
  status!: StatusPassenger;

  @OneToMany(() => BookingEntity, (booking) => booking.passenger)
  booking!: BookingEntity[];
}
