import { ValidationError } from '../errors/ValidationError';

export type ITestResult = [boolean, ValidationError];

export interface IValidationContext {
  property: IProperty;
  path?: string;
}

export interface IProperty {
  name: string;
  test: (value: any, context?: IValidationContext) => ITestResult;
}

export const defaultNames = {
  // mixed
  required: 'required',
  notRequired: 'notRequired',
  // number
  greaterThan: 'greaterThan',
  lessThan: 'lessThan',
  min: 'min',
  max: 'max',
  positive: 'positive',
  negative: 'negative',
  integer: 'integer',
  // string
  email: 'email',
  url: 'url',
  uuid: 'uuid',
  matches: 'matches',
  minLength: 'minLength',
  maxLength: 'maxLength',
};
