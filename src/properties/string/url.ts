import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { urlRegex } from '../../regexes';
import { defaultMessages } from '../../errors/defaultMessages';

export const urlFactory = (message?: string): IProperty => ({
  test: (value: string) => {
    const isValid = urlRegex.test(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.url);

    return [isValid, error];
  },
});
