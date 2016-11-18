import { RestConfig } from './interfaces';

import { RxResource } from './rx-resource';

export class RxRest {
  private config: RestConfig;

  constructor() { }

  defineResource(type: string, config?: RestConfig): RxResource {
    // TODO PLACEHOLDER
    return new RxResource('', {});
  }

  registerResource(resource: RxResource) { }
}
