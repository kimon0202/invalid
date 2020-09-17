import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const greaterThanFactory = (
  greaterThan: number,
  message?: string,
): IProperty => ({
  test: (value: number) => {
    const isValid = value > greaterThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.greaterThan(greaterThan),
        );

    return [isValid, error];
  },
});
