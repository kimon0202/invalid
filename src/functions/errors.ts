/* eslint-disable no-nested-ternary */
import { ValidationError } from '../errors/ValidationError';
import { TypeError } from '../errors/TypeError';
import { Schema } from '../types';
import { isObject } from '../utils/schemaUtils';
import { getType } from '../utils/typeUtils';

export const errors = async (
  schema: Schema,
  value: unknown,
): Promise<ValidationError[]> => {
  const validationErrors: ValidationError[] = [];

  // change error message
  if (!schema.check(value)) {
    const expectedType = schema.invalidType;
    const recivedType = getType(value);

    const error = new TypeError(expectedType, recivedType);
    validationErrors.push(error.asValidationError());
  }

  // top level schema properties
  schema.properties.forEach(prop => {
    const error = prop(value);
    if (error) validationErrors.push(error);
  });

  if (isObject(schema)) {
    Object.keys(schema.shape).forEach(async key => {
      const innerSchema = schema.shape[key];
      const innerValue =
        typeof value === 'object'
          ? value !== null
            ? (value as any)[key]
            : null
          : undefined;

      const innerErrors = await errors(innerSchema, innerValue);
      if (innerErrors.length > 0)
        validationErrors.push(...innerErrors.filter(err => !!err));
    });
  }

  // union schema

  return validationErrors;
};
