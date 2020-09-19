import { Schema, IValidationResult } from './Schema';
import { ValidationError } from '../errors/ValidationError';

class BooleanSchema extends Schema<boolean> {
  public constructor() {
    super('This must be a boolean');
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

export const boolean = (): BooleanSchema => new BooleanSchema();
