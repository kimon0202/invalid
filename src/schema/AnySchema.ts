/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationResult, Schema } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';

class AnySchema extends Schema<any> {
  public constructor() {
    super('');
  }

  public async validate(value: any): Promise<IValidationResult> {
    return this._validate(value);
  }

  public validateSync(value: any): IValidationResult {
    return this._validate(value);
  }

  public cast(value: any): any {
    return value;
  }

  private _validate(value: any): IValidationResult {
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

export const any = (): AnySchema => new AnySchema();
