import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { StatusFlight } from "../types";
import { BookingEntity } from "./booking.entity";

@Entity()
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "uid", type: "varchar" })
  @Generated("uuid")
  uid!: string;

  @Column({ name: "origin", type: "varchar" })
  origin!: string;

  @Column({ name: "destination", type: "varchar" })
  destination!: string;

  @Column({ name: "departure_date", type: "date" })
  departureDate!: Date;

  @Column({ name: "departure_time", type: "varchar" })
  departuretime!: string;

  @Column({ name: "capacity", type: "int" })
  capacity!: number;

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
    enum: StatusFlight,
    default: StatusFlight.PENDING,
  })
  status!: StatusFlight;

  @OneToMany(() => BookingEntity, (booking) => booking.flight)
  booking!: BookingEntity[];
}
