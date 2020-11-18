import { InvalidType } from '../types';

/**
 * Gets the runtime type of a value
 *
 * It is important to note that this function does not check for unions,
 * intersections, tuples, any or unknown types from Typescript
 * @param value Value to get the type of
 */
export const getType = (value: unknown): string => {
  if (value === null) return InvalidType.null;
  if (value === undefined) return InvalidType.undefined;
  if (value instanceof Date) return InvalidType.date;

  const type = typeof value;
  switch (type) {
    case 'string':
      return InvalidType.string;
    case 'number':
      if (Number.isNaN(value)) return InvalidType.nan;

      return InvalidType.number;
    case 'boolean':
      return InvalidType.boolean;
    case 'bigint':
      return InvalidType.bigint;
    case 'symbol':
      return InvalidType.symbol;
    case 'function':
      return InvalidType.function;
    case 'object':
      if (Array.isArray(value)) return InvalidType.array;
      if (Object.prototype.toString.call(value) === '[object Promise]')
        return InvalidType.promise;

      return InvalidType.object;
    default:
      return InvalidType.custom;
  }
};
