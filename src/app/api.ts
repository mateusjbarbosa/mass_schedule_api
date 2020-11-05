import * as express from "express";
import { Application, Request, Response, NextFunction } from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

class Api {
  private express: Application;

  private configHeaders(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    next();
  }

  configExpress(): void {
    this.express.use(this.configHeaders.bind(this));
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
  }

  constructor() {
    this.express = express();
    this.configExpress();
  }

  getApplication(): Application {
    return this.express;
  }
}

export default new Api().getApplication();
