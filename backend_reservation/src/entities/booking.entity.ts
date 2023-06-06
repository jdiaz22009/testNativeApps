import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { StatusFlight } from "../types";
import { FlightEntity } from "./flight.entity";
import { PassengerEntity } from "./passenger.entity";

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "uid", type: "varchar" })
  @Generated("uuid")
  uid!: string;

  @ManyToOne(() => FlightEntity, (flight) => flight.booking)
  @JoinColumn({ name: 'flight_id' })
  flight!: FlightEntity;

  @ManyToOne(() => PassengerEntity, (passenger) => passenger.booking)
  @JoinColumn({ name: 'passenger_id' })
  passenger!: PassengerEntity;

  @Column({ name: "seat_number", type: "int" })
  seatNumber!: number;

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
}
