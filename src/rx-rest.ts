import { RxResource } from './rx-resource';
import { CustomError, CODE } from './errors';
import { RestConfig, StrictRestConfig } from './interfaces';

import { assign } from 'lodash';

export class RxRest {
  private resources: { [name: string]: RxResource<any> } = {};

  constructor(private defaultConfig?: RestConfig) { }

  defineResource<T>(type: string, config?: RestConfig): RxResource<T> {
    let merge: RestConfig = assign({}, this.defaultConfig, config);

    if (!merge.requester) throw CustomError(CODE.REST_DEFINE_REQUEST_NOT_FOUND);
    if (!merge.baseUrl) throw CustomError(CODE.REST_DEFINE_BASE_URL_NOT_FOUND);

    return this.resources[type] = new RxResource<T>(type, merge as StrictRestConfig);
  }

  registerResource<T>(resource: RxResource<T>): RxResource<T> {
    return this.resources[resource.type] = resource;
  }

  getResource<T>(type: string): RxResource<T> {
    return this.resources[type];
  }
}
