import { RxResource } from './rx-resource';
import { CustomError, CODE } from './errors';
import { RestConfig, StrictRestConfig } from './interfaces';
import { fromCombine, toCombine, combine } from './utils/combine';

import { identity } from 'lodash';

export class RxRest {
  private resources: { [name: string]: RxResource<any> } = {};

  constructor(private defaultConfig: RestConfig = {}) { }

  defineResource<T>(type: string, config: RestConfig = {}, transform: Function = identity): RxResource<T> {

    let merge: RestConfig = fromCombine(combine(toCombine(this.defaultConfig), { combine: config }));

    if (!merge.requester) throw CustomError(CODE.REST_DEFINE_REQUEST_NOT_FOUND);
    if (!merge.baseUrl) throw CustomError(CODE.REST_DEFINE_BASE_URL_NOT_FOUND);

    let resource = new RxResource<T>(type, merge as StrictRestConfig);
    return this.resources[type] = transform(resource);
  }

  registerResource<T>(resource: RxResource<T>): RxResource<T> {
    return this.resources[resource.type] = resource;
  }

  getResource<T>(type: string): RxResource<T> {
    return this.resources[type];
  }
}
