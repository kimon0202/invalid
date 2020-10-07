import { Schema } from '../schema/Schema';
import { IValidationOptions } from '../types';

export const parse = async <SchemaType>(
  schema: Readonly<Schema<SchemaType>>,
  value: Readonly<unknown>,
  options?: IValidationOptions,
): Promise<SchemaType> => {
  console.log(schema, value);
  return {} as SchemaType;
};
