import { InvalidPropertyFactory, defaultNames } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const minFactory: InvalidPropertyFactory = (message, min: number) => ({
  name: defaultNames.minArray,
  test: (value, context) => {
    const isValid = (value as Array<any>).length >= min;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.array.min(min);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const maxFactory: InvalidPropertyFactory = (message, max: number) => ({
  name: defaultNames.maxArray,
  test: (value, context) => {
    const isValid = (value as Array<any>).length <= max;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.array.max(max);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const lengthFactory: InvalidPropertyFactory = (
  message,
  length: number,
) => ({
  name: defaultNames.length,
  test: (value, context) => {
    const isValid = (value as Array<any>).length === length;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.array.length(length);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});
