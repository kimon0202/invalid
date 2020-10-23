import { IProperty } from '../types';
import { ValidationError } from '../ValidationError';
import { defaultNames, defaultMessages } from '../defaultMaps';

export const requiredFactory = (message?: string): IProperty => ({
  name: defaultNames.required,
  test: (value: unknown, context) => {
    const error =
      value !== null && value !== undefined
        ? null
        : new ValidationError(
            message || defaultMessages.mixed.required,
            context.property || '',
          );

    return error;
  },
});

export const notRequiredFactory = (
  allowNull: boolean,
  message?: string,
): IProperty => ({
  name: defaultNames.notRequired,
  test: (value: any, context) => {
    return !allowNull && value === null
      ? new ValidationError(
          message || defaultMessages.mixed.notRquiredNull,
          context.property || '',
        )
      : null;
  },
});
