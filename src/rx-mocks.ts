import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { assign } from 'lodash';

import { RequestDelegate, StrictRestConfig, Maps, URLInput } from './interfaces';

export const EXAMPLE_BASE_URL = 'http://example.com';

export const EXAMPLE_GET_RESPONSE: any = { id: '1' };
export const EXAMPLE_GET_RESPONSE_MAPPED: any = { id: '1', resFun: true, resObs: true, resObs2: true };

export const EXAMPLE_RESPONSE_MAPS: Maps = [
  (input: any) => assign({}, input, { resFun: true }),
  (input: any) => of(assign({}, input, { resObs: true })),
  (input: any) => of(assign({}, input, { resObs2: true }))
];

export const EXAMPLE_REQUEST_MAPS: Maps = [
  (input: any) => assign({}, input, { reqFun: true }),
  (input: any) => of(assign({}, input, { reqObs: true }))
];

export class MockRequester implements RequestDelegate {
  public hotKey: string;
  public url: string;
  public deleted = false;
  public deletedBody: any;

  get(url: string, args?: any): Observable<any> {
    this.url = url;
    return of(EXAMPLE_GET_RESPONSE);
  }

  post(url: string, body: any, args?: any): Observable<any> {
    return of(EXAMPLE_GET_RESPONSE);
  }

  patch(url: string, body: any, args?: any): Observable<any> {
    this.hotKey = body.hotKey;
    return of(assign({}, body, { patched: true }));
  }

  delete(url: string, args?: any): Observable<any> {
    this.deleted = true;
    this.deletedBody = args.body;
    return of(assign({}, args.body, { deleted: true }));
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
  requestMaps: EXAMPLE_REQUEST_MAPS,
  defaultUrl: {}
};
