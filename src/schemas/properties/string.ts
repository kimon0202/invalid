import { TestFunction, InvalidMessage } from '../../types';
import { messages } from '../../defaultMaps';
import { getMessage } from '../../utils/schemaUtils';
import { ValidationError } from '../../errors/ValidationError';

export const min = (
  minValue: number,
  message: InvalidMessage = '',
): TestFunction => {
  return value => {
    const isValid = (value as string).length >= minValue;
    const errorMessage = getMessage(message, messages.string.min(minValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const max = (
  maxValue: number,
  message: InvalidMessage = '',
): TestFunction => {
  return value => {
    const isValid = (value as string).length <= maxValue;
    const errorMessage = getMessage(message, messages.string.max(maxValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const regex = (
  regexValue: RegExp,
  message: InvalidMessage = '',
): TestFunction => {
  return value => {
    const isValid = regexValue.test(value as string);
    const errorMessage = getMessage(message, messages.string.regex(regexValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};
