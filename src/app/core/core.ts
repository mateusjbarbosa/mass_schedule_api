import * as express from "express";
import { Application, Request, Response, NextFunction } from "express";
import { RouterModule } from "./router/routes";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

export class CoreModule {
  private express: Application;
  private routerModule;

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

  private router(): void {
    this.routerModule.exposeRoutes();
  }

  constructor() {
    this.express = express();
    this.routerModule = new RouterModule(this.express);

    this.configExpress();
    this.router();
  }

  configExpress(): void {
    this.express.use(this.configHeaders.bind(this));
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
  }

  public getApplication(): Application {
    return this.express;
  }
}
