import { Observable } from 'rxjs';

import { RestConfig, StrictRestConfig } from './interfaces';
import { mapObservable, asObservable } from './helpers';

/**
 * Central Repository for RxResources
 */
export class RxResource<T> {
  private config: StrictRestConfig;

  constructor(public type: string, config: RestConfig) {
    // TODO HANDLE NULL CHECKS / REMOVE CAST
    this.config = config as any;
  }

  find(id: any): Observable<T> {
    // Build url
    let url = `${this.config.baseUrl}/${this.type}/${id.toString()}`;

    // Make request
    let obs = this.config.requester.get(url);

    // Response maps
    return mapObservable(obs, this.config.responseMaps);
  }

  findAll(): Observable<T[]> {
    // Build url
    let url = `${this.config.baseUrl}/${this.type}`;

    // Make request
    let obs = this.config.requester.get(url);

    // Response maps
    return mapObservable(obs, this.config.responseMaps);
  }

  update(id: any, body: any): Observable<T> {
    // Build url
    let url = `${this.config.baseUrl}/${this.type}/${id.toString()}`;

    // Request maps
    let requestMapped = mapObservable(asObservable(body), this.config.requestMaps);

    // Make request
    let requested = requestMapped.concatMap((finalBody: any) => this.config.requester.patch(url, finalBody));

    // Response maps
    let responseMapped = mapObservable(requested, this.config.responseMaps);

    // Make Observable code strict, saving the last result
    let replayer = responseMapped.publishReplay(1);
    replayer.connect();

    return replayer;
  }
}
