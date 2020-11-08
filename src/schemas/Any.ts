import { Schema, InvalidType } from '../types';

export class AnySchema extends Schema<any> {
  public constructor() {
    super(InvalidType.any);
  }
}
