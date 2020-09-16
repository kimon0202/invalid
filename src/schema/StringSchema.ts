import { Schema, IValidationResult } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';
import { defaultMessages } from '../errors/defaultMessages';
import {
  minLengthFactory,
  maxLengthFactory,
  emailFactory,
  matchesFactory,
  uuidFactory,
  urlFactory,
} from '../properties/string';

// TODO: add function to check if _ptoperties already have an property instance

/**
 * String Schema
 */
class StringSchema extends Schema<string> {
  /**
   * Creates a new String Schema
   */
  public constructor() {
    super(defaultMessages.string.type);
  }

  /**
   * Sets a minimum value that a tring must have
   * @param min Minimum value length
   * @param message Message to throw when min length validation fails
   */
  public min(min: number, message?: string): StringSchema {
    this._properties.push(minLengthFactory(min, message));
    return this;
  }

  /**
   * Sets a maximum value that a tring must have
   * @param max Maximum value length
   * @param message Message to throw when max length validation fails
   */
  public max(max: number, message?: string): StringSchema {
    this._properties.push(maxLengthFactory(max, message));
    return this;
  }

  /**
   * Ensures that the string must be a valid email address
   * @param message Message to throw when email validation failures
   */
  public email(message?: string): StringSchema {
    this._properties.push(emailFactory(message));
    return this;
  }

  /**
   * Ensures that the string must be an valid UUID
   * @param message Message to throw when UUID validation fails
   */
  public uuid(message?: string): StringSchema {
    this._properties.push(uuidFactory(message));
    return this;
  }

  /**
   * Ensures that the string must be an valid URL address
   * @param message Message to throw when URL validation fails
   */
  public url(message?: string): StringSchema {
    this._properties.push(urlFactory(message));
    return this;
  }

  /**
   * Ensures that a string matches a given egex
   * @param regex Regex to test string against
   * @param message Message to throw when regex matches validation fails
   */
  public matches(regex: RegExp, message?: string): StringSchema {
    this._properties.push(matchesFactory(regex, message));
    return this;
  }

  public async cast(value: any): Promise<string> {
    const casted =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    return casted;
  }

  public castSync(value: any): string {
    const casted =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    return casted;
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
}

/**
 * Creates a string schema object
 */
export const string = (): StringSchema => new StringSchema();
