/* eslint-disable @typescript-eslint/ban-types */
import { ErrorGroup } from '../ValidationError';
import { Schema } from '../schema/Schema';
import { errors } from './errors';
import { defaultOptions } from '../defaultMaps';

export const parse = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options = defaultOptions,
): Promise<SchemaType> => {
  const validationErrors = await errors(schema, value, options);

  if (validationErrors.length > 0) throw new ErrorGroup(validationErrors);
  return value as SchemaType;
};
