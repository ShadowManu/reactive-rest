import { Observable } from 'rxjs';
import { assign } from 'lodash';

import { RequestDelegate, StrictRestConfig, Maps } from './interfaces';
import { asObservable } from './helpers';

export const EXAMPLE_BASE_URL = 'http://example.com';

export const EXAMPLE_GET_RESPONSE: any = { id: '1' };
export const EXAMPLE_GET_RESPONSE_MAPPED: any = { id: '1', resFun: true, resObs: true };

export const EXAMPLE_RESPONSE_MAPS: Maps = [
  (input: any) => assign({}, input, { resFun: true }),
  (input: any) => asObservable(assign({}, input, { resObs: true }))
];

export const EXAMPLE_REQUEST_MAPS: Maps = [
  (input: any) => assign({}, input, { reqFun: true }),
  (input: any) => asObservable(assign({}, input, { reqObs: true }))
];

export class MockRequester implements RequestDelegate {

  get(url: string, args?: any): Observable<any> {
    return asObservable(EXAMPLE_GET_RESPONSE);
  }

  post(url: string, body: any, args?: any): Observable<any> {
    return asObservable(EXAMPLE_GET_RESPONSE);
  }

  patch(url: string, body: any, args?: any): Observable<any> {
    return asObservable(assign({}, body, { patched: true }));
  }

  delete(url: string, args?: any): Observable<any> {
    return asObservable(undefined);
  }
}

export const EXAMPLE_CONFIG: StrictRestConfig = {
  requester: new MockRequester(),
  baseUrl: EXAMPLE_BASE_URL,
  responseMaps: EXAMPLE_RESPONSE_MAPS,
  requestMaps: EXAMPLE_REQUEST_MAPS
};
