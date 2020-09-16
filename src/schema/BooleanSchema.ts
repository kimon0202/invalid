import { Schema, IValidationResult } from './Schema';
import { ValidationError } from '../errors/ValidationError';

class BooleanSchema extends Schema<boolean> {
  public constructor() {
    super('This must be a boolean');
  }

  private _cast(value: any): boolean {
    if (value === null) return false;

    return !!value;
  }

  public async validate(value: any): Promise<IValidationResult> {
    const isValid = typeof value === 'boolean';

    return [isValid, isValid ? [] : [new ValidationError(this._message)]];
  }

  public async cast(value: any): Promise<boolean> {
    return this._cast(value);
  }

  public castSync(value: any): boolean {
    return this._cast(value);
  }
}

export const boolean = (): BooleanSchema => new BooleanSchema();
