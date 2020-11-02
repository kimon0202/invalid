import { InvalidMessage, IProperty } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';
import { getMessage } from '../utils/messageUtils';

export const minFactory = (
  min: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.minArray,
  test: (value, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.array.min(min);

    const error =
      (value as Array<any>).length >= min
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const maxFactory = (
  max: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.maxArray,
  test: (value, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.array.max(max);

    const error =
      (value as Array<any>).length <= max
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const lengthFactory = (
  length: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.length,
  test: (value, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.array.length(length);

    const error =
      (value as Array<any>).length === length
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});
