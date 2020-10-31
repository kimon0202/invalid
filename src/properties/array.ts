import { IProperty } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';

export const minFactory = (min: number, message?: string): IProperty => ({
  name: defaultNames.minArray,
  test: (value, context) => {
    const error =
      (value as Array<any>).length >= min
        ? null
        : new ValidationError(
            message || defaultMessages.array.min(min),
            context.property,
          );

    return error;
  },
});

export const maxFactory = (max: number, message?: string): IProperty => ({
  name: defaultNames.maxArray,
  test: (value, context) => {
    const error =
      (value as Array<any>).length <= max
        ? null
        : new ValidationError(
            message || defaultMessages.array.max(max),
            context.property,
          );

    return error;
  },
});

export const lengthFactory = (length: number, message?: string): IProperty => ({
  name: defaultNames.length,
  test: (value, context) => {
    const error =
      (value as Array<any>).length === length
        ? null
        : new ValidationError(
            message || defaultMessages.array.length(length),
            context.property,
          );

    return error;
  },
});
