import { Schema } from '../schema/Schema';
import { ValidationError } from '../ValidationError';
import { IValidationOptions } from '../types';
import { errors } from './errors';

type ValidationResult<SchemaType> = [SchemaType, ValidationError[]];

/**
 * Validates the given value against the given schema.
 * @returns the parsed value or null if invalid, and the validation errors.
 * @param schema The schema to validate against
 * @param value The value to check
 * @param options Validation options
 */
export const validate = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options?: IValidationOptions,
): Promise<ValidationResult<SchemaType>> => {
  const validationErrors = await errors(schema, value, options);
  return [
    validationErrors.length > 0 ? null : (value as SchemaType),
    validationErrors,
  ];
};
