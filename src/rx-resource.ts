import { RestConfig } from './interfaces';

/**
 * Central Repository for RxResources
 */
export class RxResource {

  constructor(public type: string, config: RestConfig) { }
}
