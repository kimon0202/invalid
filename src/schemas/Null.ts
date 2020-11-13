/* eslint-disable import/no-cycle */
import { Schema, InvalidType } from '../types';

export class NullSchema extends Schema<null> {
  public constructor() {
    super(InvalidType.null);
  }

  public check(value: unknown): boolean {
    return value === null;
  }
}
