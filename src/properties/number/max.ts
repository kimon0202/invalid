import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const maxFactory = (max: number, message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = value <= max;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.max(max));

    return [isValid, error];
  },
});
