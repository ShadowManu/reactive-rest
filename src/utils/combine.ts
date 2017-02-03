/**
 * This is an algebraic custom implementation for the Combine 'typeclass' on top of Semigroup.
 *
 * combine is a binary operator that will only do a (semigroup) concat
 * between 2 Combine<T> operands if both of them are actually Mix<T>.
 * 
 * Specific Javascript implementation of Mix<T> is based on enclosing the T value
 * inside an Object with a single property, i.e. { combine: T }
 * 
 * The (semigroup) concat is configurable, while the default one will
 *   - Return the other if one is NIL
 *   - Recursively use combine operator if any of the operands is Mix<T>
 *   - Concatenate arrays
 *   - Concatenate strings
 *   - Merge object properties (each one with the combine function)
 *   - Replace other values
 */

import { has, isNil, isArray, isObject, isString, mergeWith } from 'lodash';

// Type definitions
export type Mix<T> = { combine: T };
export type Replace<T> = T;
export type Combine<T> = Mix<T> | Replace<T>

export type Append<T> = (a: T, b: T) => T;

/** Typescript type guard to identify 'type constructor' */
export function isMix<T>(arg: Combine<T>): arg is Mix<T> {
  return has(arg, 'combine');
}

/** Make a value combinable */
export function toCombine<T>(value: T): Combine<T> {
  return { combine: value };
}

/** Extract the raw object from the Combine value */
export function fromCombine<T>(arg: Combine<T>): T {
  return isMix(arg) ? arg.combine : arg;
}

/** Typeclass core function to combine values */
export function combine<T>(a: Combine<T>, b: Combine<T>, append: Append<T> = genericAppend): Combine<T> {
  return (isMix(a) && isMix(b)) ?
    toCombine(append(fromCombine(a), fromCombine(b))) :
    b;
}

/** Generic (default) monoidal append, combine-aware */
function genericAppend<T>(a: T, b: T): T {
  if (isNil(a)) { return b; }
  if (isNil(b)) { return a; }

  if (isMix(a) || isMix(b)) return combine(a, b) as any;

  if (isArray(a) && isArray(b)) {
    return a.concat(b) as any;
  }

  if (isString(a) && isString(b)) {
    return a.concat(b) as any;
  }

  if (isObject(a) && isObject(b)) {
    return mergeWith({}, a, b, (subA, subB) => combine(subA, subB));
  }

  return b;
}