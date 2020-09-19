import { IProperty } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const greaterThanFactory = (
  greaterThan: number,
  message?: string,
): IProperty => ({
  test: (value: number) => {
    const isValid = value > greaterThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.greaterThan(greaterThan),
        );

    return [isValid, error];
  },
});

export const lessThanFactory = (
  lessThan: number,
  message?: string,
): IProperty => ({
  test: (value: number) => {
    const isValid = value < lessThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.lessThan(lessThan),
        );

    return [isValid, error];
  },
});

export const minFactory = (min: number, message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = value >= min;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.min(min));

    return [isValid, error];
  },
});

export const maxFactory = (max: number, message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = value <= max;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.max(max));

    return [isValid, error];
  },
});

export const integerFactory = (message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = Number.isInteger(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.integer);

    return [isValid, error];
  },
});
