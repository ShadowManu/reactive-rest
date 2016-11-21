import { Observable } from 'rxjs';

export interface RestConfig {
  requester?: RequestDelegate;
}

export interface RequestDelegate {
  get(url: string, args?: any): Observable<any>;
  post(url: string, body: any, args?: any): Observable<any>;
  put?(url: string, body: any, args?: any): Observable<any>;
  patch(url: string, body: any, args?: any): Observable<any>;
  delete(url: string, args?: any): Observable<any>;
}
