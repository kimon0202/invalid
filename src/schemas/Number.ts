import { Schema, InvalidType } from '../types';

export class NumberSchema extends Schema<number> {
  public constructor() {
    super(InvalidType.number);
  }
}
