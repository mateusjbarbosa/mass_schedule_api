import { ModuleEndpointMap } from "./base-routes-module";
import {
  ModulesRouterMapper,
  FeatureModuleRouter,
} from "../../modules/module.router.map";

export class RouterModuleFactory {
  private routerModulesMap: Array<ModuleEndpointMap> = [];

  private bootstrapModules(routerModulesMapper: ModulesRouterMapper) {
    this.routerModulesMap = routerModulesMapper.registeredModules.map(
      this.createModules.bind(this)
    );
  }

  private createModules(
    registeredModele: FeatureModuleRouter
  ): Array<ModuleEndpointMap> {
    const { moduleName, parser } = registeredModele;

    return new moduleName()[parser]();
  }

  constructor() {
    this.bootstrapModules(new ModulesRouterMapper());
  }

  public getRegisteredModules(): ModuleEndpointMap[] {
    return this.routerModulesMap;
  }
}
