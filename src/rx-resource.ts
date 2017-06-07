import { Observable } from 'rxjs';

import { RestConfig, StrictRestConfig, MethodArgs } from './interfaces';
import { mapObservable } from './utils/helpers';

/**
 * Central Repository for RxResources
 */
export class RxResource<T, U> {
  private config: StrictRestConfig;

  constructor(public type: string, config: RestConfig) {
    // TODO HANDLE NULL CHECKS / REMOVE CAST
    this.config = config as any;
  }

  find(id: any, args: MethodArgs = {}): Observable<T> {
    // Build url
    let url = this.config.urlBuilder({ id, type: this.type, action: 'find', baseUrl: this.config.baseUrl }, args.url);

    // Make request
    let obs = this.config.requester.get(url);

    // Response maps
    return mapObservable(obs, this.config.responseMaps);
  }

  findAll(args: MethodArgs = {}): Observable<U> {
    // Build url
    let url = this.config.urlBuilder({ type: this.type, action: 'findAll', baseUrl: this.config.baseUrl }, args.url);

    // Make request
    let obs = this.config.requester.get(url);

    // Response maps
    return mapObservable(obs, this.config.responseMaps);
  }

  update(id: any, body: any, args: MethodArgs = {}): Observable<T> {
    // Build url
    let url = this.config.urlBuilder({ id, type: this.type, action: 'update', baseUrl: this.config.baseUrl }, args.url);

    // Request maps
    let requestMapped = mapObservable(Observable.of(body), this.config.requestMaps);

    // Make request
    let requested = requestMapped.concatMap((finalBody: any) => this.config.requester.patch(url, finalBody));

    // Response maps
    let responseMapped = mapObservable(requested, this.config.responseMaps);

    // Make Observable code strict, saving the last result
    let replayer = responseMapped.publishReplay(1);
    replayer.connect();

    return replayer;
  }

  create(body: any, args: MethodArgs = {}): Observable<T> {
    // Build url
    let url = this.config.urlBuilder({ type: this.type, action: 'create', baseUrl: this.config.baseUrl }, args.url);

    // Request maps
    let requestMapped = mapObservable(Observable.of(body), this.config.requestMaps);

    // Make request
    let requested = requestMapped.concatMap((finalBody: any) => this.config.requester.post(url, finalBody));

    // Response maps
    let responseMapped = mapObservable(requested, this.config.responseMaps);

    // Make Observable code strict, saving the last result
    let replayer = responseMapped.publishReplay(1);
    replayer.connect();

    // Response maps
    return replayer;
  }

  delete(id: any, body?: any, args: MethodArgs = {}): Observable<any> {
    // Build url
    let url = this.config.urlBuilder({ id, type: this.type, action: 'delete', baseUrl: this.config.baseUrl }, args.url);

    // Request maps
    let requestMapped = mapObservable(Observable.of(body), this.config.requestMaps);

    // Make request
    let requested = requestMapped.concatMap((finalBody: any) => this.config.requester.delete(url, { body: finalBody }));

    // Response maps
    let responseMapped = mapObservable(requested, this.config.responseMaps);

    // Make Observable code strict, saving the last result
    let replayer = responseMapped.publishReplay(1);
    replayer.connect();

    // Response maps
    return replayer;
  }
}
