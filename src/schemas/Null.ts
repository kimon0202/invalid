import { Schema, InvalidType } from '../types';

export class NullSchema extends Schema<null> {
  public constructor() {
    super(InvalidType.null);
  }
}
