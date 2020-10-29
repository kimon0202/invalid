import { ValidationError } from './ValidationError';

import { Schema } from '..';

export type PropertyMessage = string | ((...args: unknown[]) => string);

export type TestFunction = (
  value: Readonly<unknown>,
  context: IValidationContext,
) => ValidationError;

export type PropertyFactory = (...args: unknown[]) => IProperty;

export interface IProperty {
  name: string;
  test: TestFunction;
}

export interface IValidationOptions {
  path?: string;
  strict?: boolean;
}

export interface IValidationContext {
  property: string;
}

// @next types
// eslint-disable-next-line no-shadow
export enum InvalidTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  array = 'array',
  object = 'object',
  any = 'any',

  // null and undefined
  null = 'null',
  undefined = 'undefined',

  unknown = 'unknown',

  // new types
  function = 'function',
  promise = 'promise',
  tuple = 'tuple',
  enum = 'enum',
  void = 'void',
  union = 'union',
}
