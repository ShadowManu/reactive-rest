import { Observable } from 'rxjs';
import { isArray } from 'lodash';

import { Maps } from '../interfaces';

export function isObservable(value: any): value is Observable<any> {
  return value && (value instanceof Observable || value.subscribe instanceof Function);
}

export function mapObservable<T = any>(obs: Observable<any>, maps?: Maps): Observable<T> {
  if (!maps) return obs;

  // When passing an array, map the first and use recursion for the others
  if (isArray(maps)) {
    let [firstMap, ...otherMaps] = maps;
    return (otherMaps.length === 0)
      ? mapObservable(obs, firstMap)
      : mapObservable(mapObservable(obs, firstMap), otherMaps);

  // Otherwise, handle the base case
  } else {
    return obs.concatMap((value: any) => {
      let inner = maps(value);

      // maps returns observable
      if (isObservable(inner)) {
        return inner;

      // maps returns something else
      } else {
        return Observable.of(inner);
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
