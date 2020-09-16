import { IValidationResult, Schema } from './Schema';
import { IValidationContext } from '../properties/IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';
import {
  greaterThanFactory,
  integerFactory,
  lessThanFactory,
  maxFactory,
  minFactory,
} from '../properties/number';

/**
 * Number Schema
 */
class NumberSchema extends Schema<number> {
  /**
   * Creates a new Number Schema
   */
  public constructor() {
    super(defaultMessages.number.type);
  }

  /**
   * Sets a minimum value that a number must have
   * @param min Minimum value
   * @param message Message to throw when min value validation failures
   */
  public min(min: number, message?: string): NumberSchema {
    this._properties.push(minFactory(min, message));
    return this;
  }

  /**
   * Sets a maximum value that a number must have
   * @param max Maximum value
   * @param message Message to throw when max value validation failures
   */
  public max(max: number, message?: string): NumberSchema {
    this._properties.push(maxFactory(max, message));
    return this;
  }

  /**
   * Ensures a number is less than a value
   * @param value Value that the number must be less than
   * @param message Message to throw when less than validation fails
   */
  public lessThan(value: number, message?: string): NumberSchema {
    this._properties.push(lessThanFactory(value, message));
    return this;
  }

  /**
   * Ensures a number is greater than a value
   * @param value Value that the number must be greater than
   * @param message Message to throw when greater than validation fails
   */
  public greaterThan(value: number, message?: string): NumberSchema {
    this._properties.push(greaterThanFactory(value, message));
    return this;
  }

  /**
   * Ensures that a number is positve
   * @param message Message to throw when positive validation fails
   */
  public positive(message = 'This must be a positive number'): NumberSchema {
    this._properties.push(greaterThanFactory(0, message));
    return this;
  }

  /**
   * Ensures that a number is negative
   * @param message Message to throw when negative validation fails
   */
  public negative(message = 'This must be a negative number'): NumberSchema {
    this._properties.push(lessThanFactory(0, message));
    return this;
  }

  /**
   * Ensures that a number is an integer
   * @param message Message to throw when integer validation fails
   */
  public integer(message?: string): NumberSchema {
    this._properties.push(integerFactory(message));
    return this;
  }

  public async validate(value: any): Promise<IValidationResult> {
    const errors: ValidationError[] = [];

    this._properties.forEach(property => {
      const validationContext: IValidationContext = {
        property,
      };

      const [, testError] = property.test(value, validationContext);
      if (testError) errors.push(testError);
    });

    return [errors.length === 0, errors];
  }

  public async cast(value: any): Promise<number> {
    return Number(value);
  }

  public castSync(value: any): number {
    return Number(value);
  }
}

export const number = (): NumberSchema => new NumberSchema();
