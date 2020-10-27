import { Schema } from './Schema';
import { InvalidTypes } from '../types';
import {
  greaterThanFactory,
  integerFactory,
  lessThanFactory,
  maxFactory,
  minFactory,
  negativeFactory,
  positiveFactory,
} from '../properties/number';

/**
 * Number Schema
 */
class NumberSchema extends Schema<number> {
  /**
   * Creates a new Number Schema
   */
  public constructor() {
    super(InvalidTypes.number);
  }

  public check(value: unknown): boolean {
    return typeof value === 'number';
  }

  /**
   * Sets a minimum value that a number must have
   * @param min Minimum value
   * @param message Message to throw when min value validation failures
   */
  public min(min: number, message?: string): NumberSchema {
    this._properties.add(minFactory(min, message));
    return this;
  }

  /**
   * Sets a maximum value that a number must have
   * @param max Maximum value
   * @param message Message to throw when max value validation failures
   */
  public max(max: number, message?: string): NumberSchema {
    this._properties.add(maxFactory(max, message));
    return this;
  }

  /**
   * Ensures a number is less than a value
   * @param value Value that the number must be less than
   * @param message Message to throw when less than validation fails
   */
  public lessThan(value: number, message?: string): NumberSchema {
    this._properties.add(lessThanFactory(value, message));
    return this;
  }

  /**
   * Ensures a number is greater than a value
   * @param value Value that the number must be greater than
   * @param message Message to throw when greater than validation fails
   */
  public greaterThan(value: number, message?: string): NumberSchema {
    this._properties.add(greaterThanFactory(value, message));
    return this;
  }

  /**
   * Ensures that a number is positve
   * @param message Message to throw when positive validation fails
   */
  public positive(message = 'This must be a positive number'): NumberSchema {
    this._properties.add(positiveFactory(message));
    return this;
  }

  /**
   * Ensures that a number is negative
   * @param message Message to throw when negative validation fails
   */
  public negative(message = 'This must be a negative number'): NumberSchema {
    this._properties.add(negativeFactory(message));
    return this;
  }

  /**
   * Ensures that a number is an integer
   * @param message Message to throw when integer validation fails
   */
  public integer(message?: string): NumberSchema {
    this._properties.add(integerFactory(message));
    return this;
  }
}

/**
 * Creates a new numbe schema object
 */
export const number = (): NumberSchema => new NumberSchema();
