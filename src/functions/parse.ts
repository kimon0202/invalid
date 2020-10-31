/* eslint-disable @typescript-eslint/ban-types */
import { ErrorGroup } from '../ValidationError';
import { Schema } from '../schema/Schema';
import { errors } from './errors';
import { defaultOptions } from '../defaultMaps';

/**
 * Validates the given value against the given schema and returns a parsed version of the input data of valid.
 * When not valid, the errors are thrown.
 * @param schema The schema to validate against
 * @param value The value to check
 * @param options Validation options
 */
export const parse = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options = defaultOptions,
): Promise<SchemaType> => {
  const validationErrors = await errors(schema, value, options);

  if (validationErrors.length > 0) throw new ErrorGroup(validationErrors);
  return value as SchemaType;
};
