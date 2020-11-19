import { Schema, InvalidType, InvalidMessage } from '../types';
import {
  min,
  max,
  greater,
  less,
  positive,
  negative,
  integer,
} from './properties/number';

export class NumberSchema extends Schema<number> {
  public constructor() {
    super(InvalidType.number);
  }

  public check(value: unknown): boolean {
    return typeof value === 'number';
  }

  public min(minValue: number, message: InvalidMessage = ''): this {
    this._properties.set('min', min(minValue, message));
    return this;
  }

  public max(maxValue: number, message: InvalidMessage = ''): this {
    this._properties.set('max', max(maxValue, message));
    return this;
  }

  public greater(minValue: number, message: InvalidMessage = ''): this {
    this._properties.set('greater', greater(minValue, message));
    return this;
  }

  public less(maxValue: number, message: InvalidMessage = ''): this {
    this._properties.set('less', less(maxValue, message));
    return this;
  }

  public positive(message: InvalidMessage = ''): this {
    this._properties.set('positive', positive(message));
    return this;
  }

  public negative(message: InvalidMessage = ''): this {
    this._properties.set('negative', negative(message));
    return this;
  }

  public integer(message: InvalidMessage = ''): this {
    this._properties.set('integer', integer(message));
    return this;
  }
}
