import { IProperty, defaultNames, IValidationContext } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const greaterThanFactory = (
  greaterThan: number,
  message?: string,
): IProperty => ({
  name: defaultNames.greaterThan,
  test: (value: number, context: IValidationContext) => {
    const isValid = value > greaterThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.greaterThan(greaterThan),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const lessThanFactory = (
  lessThan: number,
  message?: string,
): IProperty => ({
  name: defaultNames.lessThan,
  test: (value: number, context: IValidationContext) => {
    const isValid = value < lessThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.lessThan(lessThan),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const minFactory = (min: number, message?: string): IProperty => ({
  name: defaultNames.min,
  test: (value: number, context: IValidationContext) => {
    const isValid = value >= min;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.min(min),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const maxFactory = (max: number, message?: string): IProperty => ({
  name: defaultNames.max,
  test: (value: number, context: IValidationContext) => {
    const isValid = value <= max;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.max(max),
          context.path || '',
        );

    return [isValid, error];
  },
});

export const integerFactory = (message?: string): IProperty => ({
  name: defaultNames.integer,
  test: (value: number, context: IValidationContext) => {
    const isValid = Number.isInteger(value);
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.integer,
          context.path || '',
        );

    return [isValid, error];
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
