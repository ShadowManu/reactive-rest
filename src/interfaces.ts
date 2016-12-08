import { Observable } from 'rxjs';

export interface RequestDelegate {
  get(url: string, args?: any): Observable<any>;
  post(url: string, body?: any, args?: any): Observable<any>;
  put?(url: string, body: any, args?: any): Observable<any>;
  patch(url: string, body: any, args?: any): Observable<any>;
  delete(url: string, args?: any): Observable<any>;
}

export type MapFunction = (value: any) => any;
export type MapObservable = (value: any) => Observable<any>
export type Maps = MapFunction | MapObservable | (MapFunction | MapObservable)[];

export type Action = 'find' | 'findAll' | 'update' | 'create';

export interface URLInput {
  id?: any;
  type: string;
  action: Action;
  baseUrl: string;
}

export interface MethodArgs {
  url?: any;
}

export type URLBuilder = (input: URLInput, args?: any) => string;

export interface RestConfig {
  baseUrl?: string;
  urlBuilder?: URLBuilder;
  requester?: RequestDelegate;
  requestMaps?: Maps;
  responseMaps?: Maps;
}

export interface StrictRestConfig extends RestConfig {
  baseUrl: string;
  urlBuilder: URLBuilder;
  requester: RequestDelegate;
  requestMaps: Maps;
  responseMaps: Maps;
}
