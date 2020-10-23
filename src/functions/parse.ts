/* eslint-disable @typescript-eslint/ban-types */
import { ErrorGroup } from '../ValidationError';
import { Schema } from '../schema/Schema';
import { ArraySchema } from '../schema/ArraySchema';
import { IValidationOptions } from '../types';
import { ObjectSchema } from '../schema/ObjectSchema';

// TODO: Remove Readonly

const parseArray = async <SchemaType>(
  schema: ArraySchema<SchemaType>,
  value: unknown,
): Promise<SchemaType> => {
  const errors = [...schema.properties]
    .map(property =>
      property.test(value, {
        property: 'root', // change later
      }),
    )
    .filter(err => !!err);

  if (errors.length > 0) throw new ErrorGroup(errors);

  return value as SchemaType;
};

const parseObject = async <SchemaType extends object>(
  schema: ObjectSchema<SchemaType>,
  value: unknown,
): Promise<SchemaType> => {
  console.log('Object schema');
  return value as SchemaType;
};

export const parse = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options?: IValidationOptions,
): Promise<SchemaType> => {
  // if (isArray(schema)) return parseArray(schema as Schema<ArraySchema<any>>, value);
  // else if (isObject(schema)) console.log('Schema Object');
  // else console.log(`Schema ${schema.type}`);

  if (schema instanceof ArraySchema) return parseArray(schema, value);
  if (schema instanceof ObjectSchema) return parseObject(schema, value);
  console.log('Other schema');

  return {} as SchemaType;
};
