import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

export const lessThanFactory = (
  lessThan: number,
  message?: string,
): IProperty => ({
  name: 'lessThan',
  test: (value: number) => {
    const isValid = value < lessThan;
    const error = isValid
      ? null
      : new ValidationError(
          message || defaultMessages.number.lessThan(lessThan),
        );

    return [isValid, error];
  },
});
