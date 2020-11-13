import { InvalidMessage } from '../types';

// add context
export const getMessage = (message: InvalidMessage, fallback: string): string =>
  (typeof message === 'function' ? message() : message) || fallback;
