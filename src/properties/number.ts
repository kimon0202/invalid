import { IProperty, InvalidMessage } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';
import { getMessage } from '../utils/messageUtils';

export const greaterThanFactory = (
  greaterThan: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.greaterThan,
  test: (value: number, context) => {
    const errorMessage =
      getMessage(message, context) ||
      defaultMessages.number.greaterThan(greaterThan);

    const error =
      value > greaterThan
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const lessThanFactory = (
  lessThan: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.lessThan,
  test: (value: number, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.number.lessThan(lessThan);

    const error =
      value < lessThan
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const minFactory = (
  min: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.min,
  test: (value: number, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.number.min(min);

    const error =
      value >= min ? null : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const maxFactory = (
  max: number,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.max,
  test: (value: number, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.number.max(max);

    const error =
      value <= max ? null : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const integerFactory = (message?: InvalidMessage): IProperty => ({
  name: defaultNames.integer,
  test: (value: number, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.number.integer;

    const error = Number.isInteger(value)
      ? null
      : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const positiveFactory = (message?: InvalidMessage): IProperty => ({
  ...greaterThanFactory(0, message || defaultMessages.number.positive),
  name: defaultNames.positive,
});

export const negativeFactory = (message?: InvalidMessage): IProperty => ({
  ...lessThanFactory(0, message || defaultMessages.number.negative),
  name: defaultNames.negative,
});
