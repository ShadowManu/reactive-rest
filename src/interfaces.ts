import { Observable } from 'rxjs';

export interface RequestDelegate {
  get(url: string, args?: any): Observable<any>;
  post(url: string, body: any, args?: any): Observable<any>;
  put?(url: string, body: any, args?: any): Observable<any>;
  patch(url: string, body: any, args?: any): Observable<any>;
  delete(url: string, args?: any): Observable<any>;
}

export type MapFunction = (value: any) => any;
export type MapObservable = (value: any) => Observable<any>
export type Maps = MapFunction | MapObservable | (MapFunction | MapObservable)[];

export interface RestConfig {
  baseUrl?: string;
  requester?: RequestDelegate;
  responseMaps?: MapFunction | MapFunction[];
}

export interface StrictRestConfig extends RestConfig {
  baseUrl: string;
  requester: RequestDelegate;
  requestMaps: Maps;
  responseMaps: Maps;
}
