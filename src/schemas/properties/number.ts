import { TestFunction, InvalidMessage } from '../../types';
import { messages } from '../../defaultMaps';
import { getMessage } from '../../utils/schemaUtils';
import { ValidationError } from '../../errors/ValidationError';

export const min = (
  minValue: number,
  message: InvalidMessage,
): TestFunction => {
  return value => {
    const isValid = (value as number) >= minValue;
    const errorMessage = getMessage(message, messages.number.min(minValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const max = (
  maxValue: number,
  message: InvalidMessage,
): TestFunction => {
  return value => {
    const isValid = (value as number) <= maxValue;
    const errorMessage = getMessage(message, messages.number.max(maxValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const greater = (
  minValue: number,
  message: InvalidMessage,
): TestFunction => {
  return value => {
    const isValid = (value as number) > minValue;
    const errorMessage = getMessage(message, messages.number.greater(minValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const less = (
  maxValue: number,
  message: InvalidMessage,
): TestFunction => {
  return value => {
    const isValid = (value as number) < maxValue;
    const errorMessage = getMessage(message, messages.number.less(maxValue));

    return isValid ? null : new ValidationError(errorMessage);
  };
};

export const positive = (message: InvalidMessage): TestFunction => {
  const errorMessage = getMessage(message, messages.number.positive);
  return greater(0, errorMessage);
};

export const negative = (message: InvalidMessage): TestFunction => {
  const errorMessage = getMessage(message, messages.number.negative);
  return less(0, errorMessage);
};

export const integer = (message: InvalidMessage): TestFunction => {
  return value => {
    const isValid = Number.isInteger(value);
    const errorMessage = getMessage(message, messages.number.integer);

    return isValid ? null : new ValidationError(errorMessage);
  };
};
