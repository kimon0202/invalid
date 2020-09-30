import { IProperty, defaultNames } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const minFactory = (min: number, message?: string): IProperty => ({
  name: defaultNames.minArray,
  test: (value, context) => {
    const isValid = (value as Array<any>).length >= min;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.array.min(min),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const maxFactory = (max: number, message?: string): IProperty => ({
  name: defaultNames.maxArray,
  test: (value, context) => {
    const isValid = (value as Array<any>).length <= max;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.array.max(max),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const lengthFactory = (length: number, message?: string): IProperty => ({
  name: defaultNames.length,
  test: (value, context) => {
    const isValid = (value as Array<any>).length === length;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.array.length(length),
          context.path || '',
        );

    return [isValid, error];
  },
});
