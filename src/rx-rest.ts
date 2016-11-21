import { RestConfig } from './interfaces';

import { RxResource } from './rx-resource';

export class RxRest {
  private resources: { [name: string]: RxResource<any> } = {};

  constructor(private defaultConfig?: RestConfig) { }

  defineResource<T>(
    type: string,
    { requester, baseUrl }: RestConfig = {}
  ): RxResource<T> {
    return this.resources[type] = new RxResource<T>(type, { requester, baseUrl });
  }

  registerResource<T>(resource: RxResource<T>): RxResource<T> {
    return this.resources[resource.type] = resource;
  }

  getResource<T>(type: string): RxResource<T> {
    return this.resources[type];
  }
}
