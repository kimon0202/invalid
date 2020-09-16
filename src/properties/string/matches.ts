import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const matchesFactory = (regex: RegExp, message?: string): IProperty => ({
  name: 'matches',
  test: (value: string) => {
    const isValid = regex.test(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.matches(regex));

    return [isValid, error];
  },
});
