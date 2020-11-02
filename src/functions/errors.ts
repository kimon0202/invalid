import { Schema } from '..';

import { defaultOptions, defaultNames, defaultMessages } from '../defaultMaps';
import { ObjectSchema } from '../schema/ObjectSchema';
import {
  has,
  isAny,
  spread,
  isArray,
  isUnknown,
} from '../utils/propertiesUtils';
import { ValidationError } from '../ValidationError';
import { type } from '../utils/contextUtils';

/**
 * Validates the given value against the given schema and returns all validation errors
 * @param schema The schema to validate against
 * @param value The value to check
 * @param options Validation options
 */
export const errors = async <SchemaType>(
  schema: Schema<SchemaType>,
  value: unknown,
  options = defaultOptions,
): Promise<ValidationError[]> => {
  const errorArray: ValidationError[] = [];

  // check type, only if strict mode is true
  if (
    options.strict &&
    !has(schema, defaultNames.notRequired) &&
    !isAny(schema) &&
    !isUnknown(schema)
  ) {
    const error = new ValidationError(
      isArray(schema)
        ? defaultMessages[schema.type].type(schema.elementType)
        : defaultMessages[schema.type].type,
      options.path,
    );
    if (!schema.check(value)) errorArray.push(error);
  }

  if (schema instanceof ObjectSchema) {
    spread(schema).forEach(property => {
      const error = property.test(value, {
        property: options.path,
        expected: schema.type,
        received: type(value),
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

  spread(schema).forEach(property => {
    const error = property.test(value, {
      property: options.path,
      expected: schema.type,
      received: type(value),
    });

    if (error) errorArray.push(error);
  });

  return errorArray;
};
