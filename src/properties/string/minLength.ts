import { IProperty } from '../IProperty';
import { ValidationError } from '../../errors/ValidationError';
import { defaultMessages } from '../../errors/defaultMessages';

// export const minLength: IProperty = {
//   name: 'minLength',
//   test: ()
// };

export const minLengthFactory = (
  minValue: number,
  message?: string,
): IProperty => ({
  name: 'minLength',
  test: (value: string) => {
    const isValid = value.length >= minValue;
    const error = isValid
      ? null
      : new ValidationError(message || defaultMessages.string.min(minValue));

    return [isValid, error];
  },
});
