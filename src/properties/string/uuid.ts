import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { uuidRegex } from '../../regexes';
import { defaultMessages } from '../../errors/defaultMessages';

export const uuidFactory = (message?: string): IProperty => ({
  test: (value: string) => {
    const isValid = uuidRegex.test(value);
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.uuid);

    return [isValid, error];
  },
});
