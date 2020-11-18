import { InvalidMessage, Schema, InvalidType } from '../types';
import { ObjectSchema } from '../schemas/Object';
import { UnionSchema } from '../schemas/Union';

// add context
export const getMessage = (message: InvalidMessage, fallback: string): string =>
  (typeof message === 'function' ? message() : message) || fallback;

// type guards
export const isObject = (schema: Schema): schema is ObjectSchema<any> =>
  schema.invalidType === InvalidType.object;

export const isUnion = (schema: Schema): schema is UnionSchema<any> =>
  schema.invalidType === InvalidType.union;
