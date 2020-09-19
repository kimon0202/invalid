import { Schema, IValidationResult } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

/**
 * Boolean Schema
 */
class BooleanSchema extends Schema<boolean> {
  /**
   * Creates a new Boolean Schema
   */
  public constructor(message?: string) {
    super(message || defaultMessages.boolean.type);
  }

  public async validate(value: any): Promise<IValidationResult> {
    const isValid = typeof value === 'boolean';

    return [isValid, isValid ? [] : [new ValidationError(this._message)]];
  }

  public cast(value: any): boolean {
    if (value === null) return false;

    return Boolean(value);
  }
}

/**
 * Creates a new boolean schema object
 * @param message Message to throw when type validation fails
 */
export const boolean = (message?: string): BooleanSchema =>
  new BooleanSchema(message);
