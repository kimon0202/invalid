import { ValidationError } from './ValidationError';

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
