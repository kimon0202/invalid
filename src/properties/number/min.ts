import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const minFactory = (min: number, message?: string): IProperty => ({
  test: (value: number) => {
    const isValid = value >= min;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.number.min(min));

    return [isValid, error];
  },
});
