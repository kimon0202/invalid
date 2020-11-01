import {
  defaultNames,
  IValidationContext,
  InvalidPropertyFactory,
} from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const greaterThanFactory: InvalidPropertyFactory = (
  message,
  greaterThan: number,
) => ({
  name: defaultNames.greaterThan,
  test: (value: number, context: IValidationContext) => {
    const isValid = value > greaterThan;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.number.greaterThan(greaterThan);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const lessThanFactory: InvalidPropertyFactory = (
  message,
  lessThan: number,
) => ({
  name: defaultNames.lessThan,
  test: (value: number, context: IValidationContext) => {
    const isValid = value < lessThan;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.number.lessThan(lessThan);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const minFactory: InvalidPropertyFactory = (message, min: number) => ({
  name: defaultNames.min,
  test: (value: number, context: IValidationContext) => {
    const isValid = value >= min;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.number.min(min);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const maxFactory: InvalidPropertyFactory = (message, max: number) => ({
  name: defaultNames.max,
  test: (value: number, context: IValidationContext) => {
    const isValid = value <= max;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.number.max(max);

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const integerFactory: InvalidPropertyFactory = message => ({
  name: defaultNames.integer,
  test: (value: number, context: IValidationContext) => {
    const isValid = Number.isInteger(value);
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.number.integer;

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const positiveFactory: InvalidPropertyFactory = message => ({
  ...greaterThanFactory(message || defaultMessages.number.positive, 0),
  name: defaultNames.positive,
});

export const negativeFactory: InvalidPropertyFactory = message => ({
  ...lessThanFactory(message || defaultMessages.number.negative, 0),
  name: defaultNames.negative,
});
