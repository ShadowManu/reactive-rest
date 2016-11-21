import { RequestDelegate, StrictRestConfig } from './interfaces';
import { Observable, Subscriber } from 'rxjs';

export const EXAMPLE_BASEURL = 'http://example.com';

export const EXAMPLE_RESPONSE = { id: '5' };

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
  baseUrl: EXAMPLE_BASEURL
};
