export { string } from './schema/StringSchema';
export { number } from './schema/NumberSchema';
export { object } from './schema/ObjectSchema';
export { boolean } from './schema/BooleanSchema';
export { any } from './schema/AnySchema';
export { Schema, IValidationOptions, IValidationResult } from './schema/Schema';
export {
  IProperty,
  ITestResult,
  IValidationContext,
} from './properties/IProperty';

export { ValidationError } from './errors/ValidationError';

// TODO: porperties factories messages should accept a function as parameter
