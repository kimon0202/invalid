import { Schema } from '../schema/Schema';
import { IValidationOptions } from '../types';
import { isArray, isObject } from '../utils/guardFunctions';

// TODO: Remove Readonly

export const parse = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options?: IValidationOptions,
): Promise<SchemaType> => {
  console.log(schema, value, options);

  if (isArray(schema)) console.log('Schema Array');
  else if (isObject(schema)) console.log('Schema Object');
  else console.log(`Schema ${schema.type}`);

  return {} as SchemaType;
};
