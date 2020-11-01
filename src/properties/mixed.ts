import {
  InvalidPropertyFactory,
  defaultNames,
  IValidationContext,
} from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const requiredFactory: InvalidPropertyFactory = message => ({
  name: defaultNames.required,
  test: (value: any, context: IValidationContext) => {
    const isValid = value !== null && value !== undefined;
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.mixed.required;

    const error = isValid
      ? null
      : new ValidationError(errorMessage, context.path || '');

    return [isValid, error];
  },
});

export const notRequiredFactory: InvalidPropertyFactory = (
  message,
  allowNull: boolean,
) => ({
  name: defaultNames.notRequired,
  test: (value: any, context: IValidationContext) => {
    const errorMessage =
      (typeof message === 'function' ? message(context) : message) ||
      defaultMessages.mixed.notRquiredNull;

    if (!allowNull && value === null)
      return [false, new ValidationError(errorMessage, context.path || '')];

    return [true, null];
  },
});
