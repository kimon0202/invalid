/* eslint-disable import/no-cycle */
import { Schema, InvalidType } from '../types';

export class UndefinedSchema extends Schema<undefined> {
  public constructor() {
    super(InvalidType.undefined);
  }

  public check(value: unknown): boolean {
    return value === undefined;
  }
}
