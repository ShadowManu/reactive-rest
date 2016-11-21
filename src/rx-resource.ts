import { RestConfig, RequestDelegate } from './interfaces';
import { Observable } from 'rxjs';

/**
 * Central Repository for RxResources
 */
export class RxResource<T> {

  constructor(public type: string, private config: RestConfig) { }

  find(id: any): Observable<T> {
    let url = `${this.config.baseUrl}/${this.type}/${id.toString()}`;
    // TODO FIX CASTING
    return (this.config.requester as RequestDelegate).get(url);
  }

  findAll(): Observable<T[]> {
    let url = `${this.config.baseUrl}/${this.type}`;
    // TODO FIX CASTING
    return (this.config.requester as RequestDelegate).get(url);
  }
}
