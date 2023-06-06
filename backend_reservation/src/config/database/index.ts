import {
  Connection,
  createConnection,
  EntityTarget,
  ConnectionOptions,
} from "typeorm";

export class DatabaseInitializer {
  private connection!: Connection;

  async initialize(options: ConnectionOptions): Promise<void> {
    this.connection = await createConnection(options);
    await this.runMigrations();

  }

  getConnect(): Connection {
    if (!this.connection) {
      throw new Error("Connect not initial");
    }
    return this.connection;
  }

  private async runMigrations(): Promise<void> {
    await this.connection.runMigrations();
  }

}
