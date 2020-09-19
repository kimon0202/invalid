import { IProperty } from './IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

export const requiredFactory = (message?: string): IProperty => ({
  test: value => {
    const isValid = value !== null && value !== undefined;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.mixed.required);

    return [isValid, error];
  },
});
