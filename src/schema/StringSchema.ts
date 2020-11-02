import { Schema } from './Schema';
import { InvalidTypes, InvalidMessage } from '../types';
import { ArraySchema, IArrayTransformable } from './ArraySchema';
import {
  minLengthFactory,
  maxLengthFactory,
  emailFactory,
  matchesFactory,
  uuidFactory,
  urlFactory,
} from '../properties/string';

class StringSchema
  extends Schema<string>
  implements IArrayTransformable<string> {
  public constructor() {
    super(InvalidTypes.string);
  }

  public check(value: unknown): boolean {
    return typeof value === 'string';
  }

  array(): ArraySchema<Schema<string>> {
    return new ArraySchema(this);
  }

  /**
   * Sets a minimum value that a string must have
   * @param min Minimum value length
   * @param message Message to throw when min length validation fails
   */
  public min(min: number, message?: InvalidMessage): StringSchema {
    this._properties.add(minLengthFactory(min, message));
    return this;
  }

  /**
   * Sets a maximum value that a tring must have
   * @param max Maximum value length
   * @param message Message to throw when max length validation fails
   */
  public max(max: number, message?: InvalidMessage): StringSchema {
    this._properties.add(maxLengthFactory(max, message));
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
    this._properties.add(matchesFactory(regex, message));
    return this;
  }
}

export const string = (): StringSchema => new StringSchema();
