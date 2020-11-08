import { Schema, InvalidType } from '../types';

export class BooleanSchema extends Schema<boolean> {
  public constructor() {
    super(InvalidType.boolean);
  }
}
