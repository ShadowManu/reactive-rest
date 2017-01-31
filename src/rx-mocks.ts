import { Observable } from 'rxjs';
import { assign } from 'lodash';

import { RequestDelegate, StrictRestConfig, Maps, URLInput } from './interfaces';
import { asObservable } from './helpers';

export const EXAMPLE_BASE_URL = 'http://example.com';

export const EXAMPLE_GET_RESPONSE: any = { id: '1' };
export const EXAMPLE_GET_RESPONSE_MAPPED: any = { id: '1', resFun: true, resObs: true, resObs2: true };

export const EXAMPLE_RESPONSE_MAPS: Maps = [
  (input: any) => assign({}, input, { resFun: true }),
  (input: any) => asObservable(assign({}, input, { resObs: true })),
  (input: any) => asObservable(assign({}, input, { resObs2: true }))
];

export const EXAMPLE_REQUEST_MAPS: Maps = [
  (input: any) => assign({}, input, { reqFun: true }),
  (input: any) => asObservable(assign({}, input, { reqObs: true }))
];

export class MockRequester implements RequestDelegate {
  public hotKey: string;
  public url: string;
  public deleted: boolean = false;

  get(url: string, args?: any): Observable<any> {
    this.url = url;
    return asObservable(EXAMPLE_GET_RESPONSE);
  }

  post(url: string, body: any, args?: any): Observable<any> {
    return asObservable(EXAMPLE_GET_RESPONSE);
  }

  patch(url: string, body: any, args?: any): Observable<any> {
    this.hotKey = body.hotKey;
    return asObservable(assign({}, body, { patched: true }));
  }

  delete(url: string, args?: any): Observable<any> {
    this.deleted = true;
    return asObservable(undefined);
  }
}

export function mockUrlBuilder({ id, type, action, baseUrl}: URLInput, args?: any) {
  let result = `${baseUrl}/${type}`;

  if (action === 'find' || action === 'update') {
    result += '/' + id;
  }

  if (args) {
    result += args;
  }

  return result;
}

export const EXAMPLE_CONFIG: StrictRestConfig = {
  baseUrl: EXAMPLE_BASE_URL,
  urlBuilder: mockUrlBuilder,
  requester: new MockRequester(),
  responseMaps: EXAMPLE_RESPONSE_MAPS,
  requestMaps: EXAMPLE_REQUEST_MAPS
};
