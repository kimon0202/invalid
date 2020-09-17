import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { emailRegex } from '../../regexes';
import { defaultMessages } from '../../errors/defaultMessages';

export const emailFactory = (message?: string): IProperty => ({
  test: (value: string) => {
    const isValid = emailRegex.test(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.email);

    return [isValid, error];
  },
});
