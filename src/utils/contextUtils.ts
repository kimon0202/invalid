import { InvalidTypes } from '../types';

export const type = (value: unknown): InvalidTypes => {
  if (value === null) return InvalidTypes.null;
  if (value === undefined) return InvalidTypes.undefined;

  switch (typeof value) {
    case 'string':
      return InvalidTypes.string;
    case 'number':
      if (Number.isNaN(value)) return InvalidTypes.nan;
      return InvalidTypes.number;
    case 'bigint':
      return InvalidTypes.bigint;
    case 'boolean':
      return InvalidTypes.boolean;
    case 'function':
      return InvalidTypes.function;
    case 'symbol':
      return InvalidTypes.symbol;
    case 'object':
      if (Array.isArray(value)) return InvalidTypes.array;
      if (
        (value as any).then &&
        typeof (value as any).then === 'function' &&
        (value as any).catch &&
        typeof (value as any).catch === 'function'
      )
        return InvalidTypes.promise;

      return InvalidTypes.object;
    case 'undefined':
      return InvalidTypes.undefined;
    default:
      if (value instanceof Date) return InvalidTypes.date;
      return InvalidTypes.unknown;
  }
};
