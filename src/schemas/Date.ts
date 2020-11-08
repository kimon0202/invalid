import { Schema, InvalidType } from '../types';

export class DateSchema extends Schema<Date> {
  public constructor() {
    super(InvalidType.date);
  }
}
