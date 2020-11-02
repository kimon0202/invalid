import { InvalidMessage, IProperty } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';
import { getMessage } from '../utils/messageUtils';

export const requiredFactory = (message?: InvalidMessage): IProperty => ({
  name: defaultNames.required,
  test: (value: unknown, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.mixed.required;

    const error =
      value !== null && value !== undefined
        ? null
        : new ValidationError(errorMessage, context.property);

    return error;
  },
});

export const notRequiredFactory = (
  allowNull: boolean,
  message?: InvalidMessage,
): IProperty => ({
  name: defaultNames.notRequired,
  test: (value: any, context) => {
    const errorMessage =
      getMessage(message, context) || defaultMessages.mixed.notRquiredNull;

    return !allowNull && value === null
      ? new ValidationError(errorMessage, context.property)
      : null;
  },
});
