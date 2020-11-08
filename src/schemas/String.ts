import { Schema, InvalidType } from '../types';

export class StringSchema extends Schema<string> {
  public constructor() {
    super(InvalidType.string);
  }
}
