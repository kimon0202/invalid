import { Schema, InvalidType } from '../types';

export class UndefinedSchema extends Schema<undefined> {
  public constructor() {
    super(InvalidType.undefined);
  }
}
