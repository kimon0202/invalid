import { Schema, IValidationResult, IValidationOptions } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext, InvalidMessage } from '../properties/IProperty';
import { defaultMessages } from '../errors/defaultMessages';
import {
  minLengthFactory,
  maxLengthFactory,
  emailFactory,
  matchesFactory,
  uuidFactory,
  urlFactory,
} from '../properties/string';

/**
 * String Schema
 */
class StringSchema extends Schema<string> {
  /**
   * Creates a new String Schema
   */
  public constructor(message?: string) {
    super(message || defaultMessages.string.type);
  }

  /**
   * Sets a minimum value that a string must have
   * @param min Minimum value length
   * @param message Message to throw when min length validation fails
   */
  public min(min: number, message?: InvalidMessage): StringSchema {
    this._properties.add(minLengthFactory(message, min));
    return this;
  }

  /**
   * Sets a maximum value that a tring must have
   * @param max Maximum value length
   * @param message Message to throw when max length validation fails
   */
  public max(max: number, message?: InvalidMessage): StringSchema {
    this._properties.add(maxLengthFactory(message, max));
    return this;
  }

  /**
   * Ensures that the string must be a valid email address
   * @param message Message to throw when email validation failures
   */
  public email(message?: InvalidMessage): StringSchema {
    this._properties.add(emailFactory(message));
    return this;
  }

  /**
   * Ensures that the string must be an valid UUID
   * @param message Message to throw when UUID validation fails
   */
  public uuid(message?: InvalidMessage): StringSchema {
    this._properties.add(uuidFactory(message));
    return this;
  }

  /**
   * Ensures that the string must be an valid URL address
   * @param message Message to throw when URL validation fails
   */
  public url(message?: InvalidMessage): StringSchema {
    this._properties.add(urlFactory(message));
    return this;
  }

  /**
   * Ensures that a string matches a given egex
   * @param regex Regex to test string against
   * @param message Message to throw when regex matches validation fails
   */
  public matches(regex: RegExp, message?: InvalidMessage): StringSchema {
    this._properties.add(matchesFactory(message, regex));
    return this;
  }

  public cast(value: any): string {
    const casted =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    return casted;
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
 * Creates a string schema object
 * @param message Message to throw when type validation fails
 */
export const string = (message?: string): StringSchema =>
  new StringSchema(message);
