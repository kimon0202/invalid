import { Schema, InvalidType } from '../types';

export class NumberSchema extends Schema<number> {
  public constructor() {
    super(InvalidType.number);
  }

  public check(value: unknown): boolean {
    return typeof value === 'number';
  }
}
