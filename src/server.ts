import './util/module-alias';

import bodyParser from 'body-parser';

import { Server } from '@overnightjs/core';
import { Application } from 'express';

import { UserController } from './controllers/user';

import * as database from '@src/database';
export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const userController = new UserController();

    this.addControllers([
      userController
    ]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info(`Server listening of :${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}