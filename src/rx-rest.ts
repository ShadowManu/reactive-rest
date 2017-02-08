import { RxResource } from './rx-resource';
import { CustomError, CODE } from './errors';
import { RestConfig, StrictRestConfig } from './interfaces';
import { fromCombine, toCombine, combine } from './utils/combine';

import { identity } from 'lodash';

export class RxRest {
  private resources: { [name: string]: RxResource<any, any> } = {};

  constructor(private defaultConfig: RestConfig = {}) { }

  defineResource<T, U>(type: string, config: RestConfig = {}, transform: Function = identity): RxResource<T, U> {

    let merge: RestConfig = fromCombine(combine(toCombine(this.defaultConfig), { combine: config }));

    if (!merge.requester) throw CustomError(CODE.REST_DEFINE_REQUEST_NOT_FOUND);
    if (!merge.baseUrl) throw CustomError(CODE.REST_DEFINE_BASE_URL_NOT_FOUND);

    let resource = new RxResource<T, U>(type, merge as StrictRestConfig);
    return this.resources[type] = transform(resource);
  }

  registerResource<T, U>(resource: RxResource<T, U>): RxResource<T, U> {
    return this.resources[resource.type] = resource;
  }

  getResource<T, U>(type: string): RxResource<T, U> {
    return this.resources[type];
  }
}
