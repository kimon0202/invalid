/* eslint-disable @typescript-eslint/ban-types */
import { defaultOptions } from '../defaultMaps';
import { ErrorGroup, ValidationError } from '../ValidationError';
import { Schema } from '../schema/Schema';
import { IValidationOptions } from '../types';
import { ObjectSchema } from '../schema/ObjectSchema';

export const errors = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options = defaultOptions,
): Promise<ValidationError[]> => {
  const errorArray: ValidationError[] = [];

  if (schema instanceof ObjectSchema) {
    [...schema.properties].forEach(property => {
      const error = property.test(value, {
        property: options.path || 'root',
      });

      if (error) errorArray.push(error);
    });

    Object.keys(schema.shape).forEach(async key => {
      const innerSchema = schema.shape[key] as Schema<any>;
      const valueToCheck: unknown =
        // eslint-disable-next-line no-nested-ternary
        value === null ? null : value === undefined ? undefined : value[key];

      const innerErrors = await errors(innerSchema, valueToCheck, {
        ...options,
        path: options.path ? `${options.path}.${key}` : key,
      });

      if (innerErrors.length > 0)
        errorArray.push(...innerErrors.filter(err => !!err));
    });

    return errorArray;
  }

  [...schema.properties].forEach(property => {
    const error = property.test(value, {
      property: options.path || 'root',
    });

    if (error) errorArray.push(error);
  });

  return errorArray;
};

export const parse = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options?: IValidationOptions,
): Promise<SchemaType> => {
  const validationErrors = await errors(schema, value, options);

  if (validationErrors.length > 0) throw new ErrorGroup(validationErrors);
  return value as SchemaType;
};
