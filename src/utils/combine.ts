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

import { has, isNil, isArray, isString, mapValues, mergeWith } from 'lodash';

// Type definitions
export type Mix<T> = { combine: T };
export type Replace<T> = T;
export type Combine<T> = Mix<T> | Replace<T>

export type Append<T> = (a: T, b: T) => T;

/** Typescript type guard to identify 'type constructor' */
export function isMix<T>(value: Combine<T>): value is Mix<T> {
  return has(value, 'combine');
}

/** Make a value combinable */
export function toCombine<T>(value: T, { recursive } = { recursive: true }): Combine<T> {
  if (recursive && isSimpleObject(value))
    return { combine: mapValues(value, (val) => toCombine(val, { recursive })) };

  return { combine: value };
}

/**
 * Extract the raw object from the Combine value,
 *  by default, it will navigate object properties
 */
export function fromCombine<T>(value: Combine<T>, { recursive } = { recursive: true }): T {
  if (isMix(value)) return fromCombine(value.combine, { recursive });

  if (recursive && isSimpleObject(value)) return mapValues(value, (val) => fromCombine(val, { recursive }));

  return value;
}

/**
 * Utility function to fully combine two values.
 * Very similar to lodash.mergeDeep, but following the rules described at the header
 */
export function fullCombine(a, b) {
  return fromCombine(combine(toCombine(a), toCombine(b)));
}

/** Typeclass core function to combine values */
export function combine<T>(a: Combine<T>, b: Combine<T>, append: Append<T> = genericAppend): Combine<T> {
  return (isMix(a) && isMix(b)) ?
    toCombine(append(
      fromCombine(a, { recursive: false }),
      fromCombine(b, { recursive: false })
    ), { recursive: false }) : b;
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

  if (isSimpleObject(a) && isSimpleObject(b)) {
    return mergeWith({}, a, b, (subA, subB) => combine(subA, subB));
  }

  return b;
}

// Helper functions

function isSimpleObject(value: any): boolean {
  return !!value && value.constructor === Object;
}
