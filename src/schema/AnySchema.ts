/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationOptions, IValidationResult, Schema } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';

/**
 * Any Schema
 */
class AnySchema extends Schema<any> {
  /**
   * Creates a new Any Schema
   */
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

/**
 * Creates a new any schema object
 */
export const any = (): AnySchema => new AnySchema();
