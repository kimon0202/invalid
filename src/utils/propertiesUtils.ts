import { AnySchema } from '../schema/AnySchema';
import { InvalidTypes, IProperty } from '../types';
import { Schema } from '../schema/Schema';
import { ArraySchema } from '../schema/ArraySchema';
import { UnknownSchema } from '../schema/UnknownSchema';

export const spread = (schema: Schema): IProperty[] => [...schema.properties];

export const has = (schema: Schema, propertyName: string): boolean => {
  return spread(schema).find(prop => prop.name === propertyName) !== undefined;
};

export const isAny = (schema: Schema): schema is AnySchema =>
  schema.type === InvalidTypes.any;

export const isArray = (schema: Schema): schema is ArraySchema<Schema> =>
  schema.type === InvalidTypes.array;

export const isUnknown = (schema: Schema): schema is UnknownSchema =>
  schema.type === InvalidTypes.unknown;
