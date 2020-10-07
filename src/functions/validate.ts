import { Schema } from '../schema/Schema';
import { ValidationError } from '../ValidationError';
import { IValidationOptions } from '../types';

type ValidationResult<SchemaType> = [SchemaType, ValidationError[]];

export const validate = async <SchemaType>(
  schema: Readonly<Schema<SchemaType>>,
  value: Readonly<unknown>,
  options?: IValidationOptions,
): Promise<ValidationResult<SchemaType>> => {
  console.log(schema, value);
  return [{} as SchemaType, [] as ValidationError[]];
};
