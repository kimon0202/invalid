import { IValidationResult, Schema, IValidationOptions } from './Schema';
import { IValidationContext, InvalidMessage } from '../properties/IProperty';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';
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
  public constructor(message?: string) {
    super(message || defaultMessages.number.type);
  }

  /**
   * Sets a minimum value that a number must have
   * @param min Minimum value
   * @param message Message to throw when min value validation failures
   */
  public min(min: number, message?: InvalidMessage): NumberSchema {
    this._properties.add(minFactory(message, min));
    return this;
  }

  /**
   * Sets a maximum value that a number must have
   * @param max Maximum value
   * @param message Message to throw when max value validation failures
   */
  public max(max: number, message?: InvalidMessage): NumberSchema {
    this._properties.add(maxFactory(message, max));
    return this;
  }

  /**
   * Ensures a number is less than a value
   * @param value Value that the number must be less than
   * @param message Message to throw when less than validation fails
   */
  public lessThan(value: number, message?: InvalidMessage): NumberSchema {
    this._properties.add(lessThanFactory(message, value));
    return this;
  }

  /**
   * Ensures a number is greater than a value
   * @param value Value that the number must be greater than
   * @param message Message to throw when greater than validation fails
   */
  public greaterThan(value: number, message?: InvalidMessage): NumberSchema {
    this._properties.add(greaterThanFactory(message, value));
    return this;
  }

  /**
   * Ensures that a number is positve
   * @param message Message to throw when positive validation fails
   */
  public positive(
    message: InvalidMessage = 'This must be a positive number',
  ): NumberSchema {
    this._properties.add(positiveFactory(message));
    return this;
  }

  /**
   * Ensures that a number is negative
   * @param message Message to throw when negative validation fails
   */
  public negative(
    message: InvalidMessage = 'This must be a negative number',
  ): NumberSchema {
    this._properties.add(negativeFactory(message));
    return this;
  }

  /**
   * Ensures that a number is an integer
   * @param message Message to throw when integer validation fails
   */
  public integer(message?: InvalidMessage): NumberSchema {
    this._properties.add(integerFactory(message));
    return this;
  }

  public async validate(
    value: any,
    options: IValidationOptions = { path: '' },
  ): Promise<IValidationResult> {
    options = {
      ...options,
      path: '',
    };
    return this._validate(value, options);
  }

  public validateSync(
    value: any,
    options: IValidationOptions = { path: '' },
  ): IValidationResult {
    options = {
      ...options,
      path: '',
    };
    return this._validate(value, options);
  }

  public cast(value: any): number {
    return Number(value);
  }

  private _validate(
    value: any,
    options?: IValidationOptions,
  ): IValidationResult {
    const errors: ValidationError[] = [];

    this._properties.forEach(property => {
      const validationContext: IValidationContext = {
        property,
        path: options.path || '',
      };

      const [, testError] = property.test(value, validationContext);
      if (testError) errors.push(testError);
    });

    return [errors.length === 0, errors];
  }
}

/**
 * Creates a new numbe schema object
 * @param message Message to throw when type validation fails
 */
export const number = (message?: string): NumberSchema =>
  new NumberSchema(message);
