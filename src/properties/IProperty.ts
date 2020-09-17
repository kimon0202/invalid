import { ValidationError } from '../errors/ValidationError';

export type ITestResult = [boolean, ValidationError];

export interface IValidationContext {
  property: IProperty;
}

export interface IProperty {
  test: (value: any, context?: IValidationContext) => ITestResult;
}
