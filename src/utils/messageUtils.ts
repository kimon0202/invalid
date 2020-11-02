import { InvalidMessage, IValidationContext } from '../types';

export const getMessage = (
  message: InvalidMessage,

  context: IValidationContext,
): string => (typeof message === 'function' ? message(context) : message);
