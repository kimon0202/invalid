import { IProperty } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';

export const greaterThanFactory = (
  greaterThan: number,
  message?: string,
): IProperty => ({
  name: defaultNames.greaterThan,
  test: (value: number, context) => {
    const error =
      value > greaterThan
        ? null
        : new ValidationError(
            message || defaultMessages.number.greaterThan(greaterThan),
            context.property,
          );

    return error;
  },
});

export const lessThanFactory = (
  lessThan: number,
  message?: string,
): IProperty => ({
  name: defaultNames.lessThan,
  test: (value: number, context) => {
    const error =
      value < lessThan
        ? null
        : new ValidationError(
            message || defaultMessages.number.lessThan(lessThan),
            context.property,
          );

    return error;
  },
});

export const minFactory = (min: number, message?: string): IProperty => ({
  name: defaultNames.min,
  test: (value: number, context) => {
    const error =
      value >= min
        ? null
        : new ValidationError(
            message || defaultMessages.number.min(min),
            context.property,
          );

    return error;
  },
});

export const maxFactory = (max: number, message?: string): IProperty => ({
  name: defaultNames.max,
  test: (value: number, context) => {
    const error =
      value <= max
        ? null
        : new ValidationError(
            message || defaultMessages.number.max(max),
            context.property,
          );

    return error;
  },
});

export const integerFactory = (message?: string): IProperty => ({
  name: defaultNames.integer,
  test: (value: number, context) => {
    const error = Number.isInteger(value)
      ? null
      : new ValidationError(
          message || defaultMessages.number.integer,
          context.property,
        );

    return error;
  },
});

export const positiveFactory = (message?: string): IProperty => ({
  ...greaterThanFactory(0, message || defaultMessages.number.positive),
  name: defaultNames.positive,
});

export const negativeFactory = (message?: string): IProperty => ({
  ...lessThanFactory(0, message || defaultMessages.number.negative),
  name: defaultNames.negative,
});
