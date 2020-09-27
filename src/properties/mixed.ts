import { IProperty, defaultNames, IValidationContext } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const requiredFactory = (message?: string): IProperty => ({
  name: defaultNames.required,
  test: (value: any, context: IValidationContext) => {
    const isValid = value !== null && value !== undefined;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.mixed.required,
          context.path || '',
        );

    return [isValid, error];
  },
});

export const notRequiredFactory = (
  allowNull: boolean,
  message?: string,
): IProperty => ({
  name: defaultNames.notRequired,
  test: (value: any, context: IValidationContext) => {
    if (!allowNull && value === null)
      return [
        false,
        new ValidationError(
          message || defaultMessages.mixed.notRquiredNull,
          context.path || '',
        ),
      ];

    return [true, null];
  },
});
