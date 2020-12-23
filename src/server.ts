import './util/module-alias';

import bodyParser from 'body-parser';

import { Server } from '@overnightjs/core';
import { Application } from 'express';

import { UserController } from './controllers/user';

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

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  public getApp(): Application {
    return this.app;
  }
}