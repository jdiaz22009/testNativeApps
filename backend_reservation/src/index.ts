import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';


import { RoutesModule } from "./router";
import { DatabaseInitializer } from "./config/database";
import { ConnectionOptions } from "typeorm";

import { FlightEntity } from "./entities/flight.entity";
import { PassengerEntity } from "./entities/passenger.entity";
import { BookingEntity } from "./entities/booking.entity";

async function bootstrap() {
  dotenv.config();
  const app: Express = express();

  app.use(express.json());

  app.use(cors());



  const databaseInitializer = new DatabaseInitializer();

  const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.TYPEORM_USERNAME || "posgrest",
    password: process.env.TYPEORM_PASSWORD || "posgrest",
    database: process.env.TYPEORM_DATABASE || "test",
    synchronize: true,
    entities: [FlightEntity, PassengerEntity, BookingEntity],
    logging: true,
  };

  await databaseInitializer.initialize(connectionOptions);

  const connection = databaseInitializer.getConnect();

  const routesModule = new RoutesModule(app, connection);

  routesModule.registerRoutes();

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
}

bootstrap();
