import { AnySchema } from '../schema/AnySchema';

export const isArray = (schema: AnySchema): boolean => schema.type === 'array';

export const isObject = (schema: AnySchema): boolean =>
  schema.type === 'object';
