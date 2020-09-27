/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationOptions, IValidationResult, Schema } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';

class AnySchema extends Schema<any> {
  public constructor() {
    super('');
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

  public cast(value: any): any {
    return value;
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

export const any = (): AnySchema => new AnySchema();
