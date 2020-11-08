import { Schema, InvalidType } from '../types';

export class UnknownSchema extends Schema<unknown> {
  public constructor() {
    super(InvalidType.unknown);
  }
}
