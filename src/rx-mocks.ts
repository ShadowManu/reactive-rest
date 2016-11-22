import { RequestDelegate, StrictRestConfig, Maps } from './interfaces';
import { Observable, Subscriber } from 'rxjs';

export const EXAMPLE_BASEURL = 'http://example.com';

export const EXAMPLE_RESPONSE: any = { id: '5' };
export const EXAMPLE_RESPONSE_MAPPED: any = { id: '5', recopy: '5' };

export const EXAMPLE_RESPONSE_MAPS: Maps = [
  (input: any) => ({ id: input.id, copy: input.id }),
  (input: any) => new Observable((sub: Subscriber<any>) => { sub.next({ id: input.copy, recopy: input.copy }); })
];

export class MockRequester implements RequestDelegate {

  get(url: string, args?: any): Observable<any> {
    return new Observable((sub: Subscriber<any>) => { sub.next(EXAMPLE_RESPONSE); });
  }

  post(url: string, body: any, args?: any): Observable<any> {
    return new Observable((sub: Subscriber<any>) => { sub.next(EXAMPLE_RESPONSE); });
  }

  patch(url: string, body: any, args?: any): Observable<any> {
    return new Observable((sub: Subscriber<any>) => { sub.next(EXAMPLE_RESPONSE); });
  }

  delete(url: string, args?: any): Observable<any> {
    return new Observable((sub: Subscriber<any>) => { sub.next(EXAMPLE_RESPONSE); });
  }
}

export const EXAMPLE_CONFIG: StrictRestConfig = {
  requester: new MockRequester(),
  baseUrl: EXAMPLE_BASEURL,
  responseMaps: EXAMPLE_RESPONSE_MAPS
};
