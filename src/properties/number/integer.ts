import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const integerFactory = (message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = Number.isInteger(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.integer);

    return [isValid, error];
  },
});
