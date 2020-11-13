import { Schema, InvalidType } from '../types';

export class UnknownSchema extends Schema<unknown> {
  public constructor() {
    super(InvalidType.unknown);
  }

  public check(): boolean {
    return true;
  }
}
