import { Express, Router } from "express";
import { Connection } from "typeorm";

import { FlightModule } from "./flights";

export class RoutesModule {
  private app: Express;
  private router: Router;
  private connection: Connection;

  constructor(app: Express, connection: Connection) {
    this.app = app;
    this.connection = connection;
    this.router = Router();
  }

  public registerRoutes() {
    // FlightModule
    const flightModule = new FlightModule(this.connection);

    this.router.use(flightModule.getRouter());

    this.app.use("/app", this.router);
  }
}
