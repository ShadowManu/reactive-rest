import { Observable } from 'rxjs';
import { isArray } from 'lodash';

import { Maps } from './interfaces';

export function isObservable(value: any): value is Observable<any> {
  return value && (value instanceof Observable || value.subscribe instanceof Function);
}

export function asObservable<T>(value: T): Observable<T> {
  return Observable.from([value]);
}

export function mapObservable<T>(obs: Observable<any>, maps?: Maps): Observable<T> {
  if (!maps) return obs;

  // When passing an array, map the first and use recursion for the others
  if (isArray(maps)) {
    let [firstMap, otherMaps] = maps;
    return mapObservable(mapObservable(obs, firstMap), otherMaps);

  // Otherwise, handle the base case
  } else {
    return obs.concatMap((value: any) => {
      let inner = maps(value);

      // maps returns observable
      if (isObservable(inner)) {
        return inner;

      // maps returns something else
      } else {
        return asObservable(inner);
      }
    });
  }
}

export function debugObservable<T>(obs: Observable<T>, name: string): Observable<T> {
  //tslint:disable
  obs.subscribe(
    (val: T) => { console.log(name, 'value', val); },
    (err: any) => { console.error(name, 'error', err); },
    () => { console.log(name, 'completed'); }
  );
  return obs;
}
