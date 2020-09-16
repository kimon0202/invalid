import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

// export const minLength: IProperty = {
//   name: 'minLength',
//   test: ()
// };

export const maxLengthFactory = (
  maxValue: number,
  message?: string,
): IProperty => ({
  name: 'maxLength',
  test: (value: string) => {
    const isValid = value.length <= maxValue;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.max(maxValue));

    return [isValid, error];
  },
});
