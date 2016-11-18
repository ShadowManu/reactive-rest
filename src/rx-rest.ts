import { RestConfig } from './interfaces';

import { RxResource } from './rx-resource';

export class RxRest {
  private resources: { [name: string]: RxResource } = {};

  constructor(private defaultConfig?: RestConfig) { }

  defineResource(type: string, config: RestConfig = {}): RxResource {
    return this.resources[type] = new RxResource(type, config);
  }

  registerResource(resource: RxResource): RxResource {
    return this.resources[resource.type] = resource;
  }

  getResource(type: string): RxResource {
    return this.resources[type];
  }
}
