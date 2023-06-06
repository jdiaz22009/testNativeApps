import { Request, Response } from "express";
import { Connection, Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { FlightEntity } from "../../entities/flight.entity";
import { FlightsDto } from "../dto/flights.dto";
import { handlerFail, handlerSuccess, handlerValidationErr } from "../../utils";
import { PassengerEntity } from "../../entities/passenger.entity";
import { BookingEntity } from "../../entities/booking.entity";
import { PassengerDto } from "../dto/passenger.dto";
import { StatusPassenger } from "../../types";

export class ControllerFlight {
  private flightRepository!: Repository<FlightEntity>;
  private passengerRepository!: Repository<PassengerEntity>;
  private bookingRepository!: Repository<BookingEntity>;

  constructor(connection: Connection) {
    this.flightRepository = connection.getRepository(FlightEntity);
    this.passengerRepository = connection.getRepository(PassengerEntity);
    this.bookingRepository = connection.getRepository(BookingEntity);
  }

  createFlight = async (req: Request, res: Response) => {
    try {
      const flightDto: FlightsDto = plainToClass(FlightsDto, req.body);
      const validationErrors = await validate(flightDto);
      if (validationErrors.length > 0) {
        console.log(validationErrors);
        return handlerFail(res, handlerValidationErr(validationErrors));
      }

      const flightEntity = new FlightEntity();
      flightEntity.origin = flightDto.origin;
      flightEntity.destination = flightDto.destination;
      flightEntity.capacity = flightDto.capacity;
      flightEntity.departureDate = flightDto.departureDate;
      flightEntity.departuretime = flightDto.departureTime;
      await this.flightRepository.save(flightEntity);
      return handlerSuccess(res);
    } catch (error) {
      console.error(error);
    }
  };

  createReservation = async (req: Request, res: Response) => {
    try {
      const reservationDto: PassengerDto = plainToClass(PassengerDto, req.body);
      const validationErrors = await validate(reservationDto);

      if (validationErrors.length > 0) {
        console.log(validationErrors);
        return handlerFail(res, handlerValidationErr(validationErrors));
      }

      const passengerRepository: PassengerEntity | null =
        await this.passengerRepository.findOne({
          where: {
            email: reservationDto.email.toLowerCase(),
            status: StatusPassenger.ENABLED,
          },
        });

      const flight: FlightEntity | null = await this.flightRepository.findOne({
        where: { uid: reservationDto.uidFlight },
      });

      if (passengerRepository === null && flight) {
        const passengerEntity: PassengerEntity = new PassengerEntity();
        passengerEntity.email = reservationDto.email;
        passengerEntity.name = reservationDto.name;

        await this.passengerRepository.save(passengerEntity);

        const bookingEntity = new BookingEntity();
        bookingEntity.flight = flight;
        bookingEntity.passenger = passengerEntity;
        bookingEntity.seatNumber = reservationDto.seatNumber;

        await this.bookingRepository.save(bookingEntity);
        return handlerSuccess(res);
      }

      if (flight && passengerRepository) {
        const bookingEntity = new BookingEntity();
        bookingEntity.flight = flight;
        bookingEntity.passenger = passengerRepository;
        bookingEntity.seatNumber = reservationDto.seatNumber;
        await this.bookingRepository.save(bookingEntity);
        return handlerSuccess(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  getFlightAll = async (req: Request, res: Response) => {
    try {
      const flight: FlightEntity[] | null = await this.flightRepository.find();

      if (flight) {
        return handlerSuccess(res, flight);
      }

      return handlerSuccess(res, []);
    } catch (error) {
      console.log(error);
    }
  };
}
