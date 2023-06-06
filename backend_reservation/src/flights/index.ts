import { Router, Request, Response } from "express";
import { Connection } from "typeorm";

import { ControllerFlight } from "./controller";

export class FlightModule {
  private router: Router;
  private controllerFlight: ControllerFlight;
  private connection: Connection;

  constructor(connection: Connection) {
    this.router = Router();
    this.connection = connection;
    this.controllerFlight = new ControllerFlight(connection);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const prefix = "/flight";
    this.router.post(`${prefix}`, this.controllerFlight.createFlight.bind(this));
    this.router.post(`${prefix}/reservation`, this.controllerFlight.createReservation.bind(this));
    this.router.get(`${prefix}`, this.controllerFlight.getFlightAll.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }
}
