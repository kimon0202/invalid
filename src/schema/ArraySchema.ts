import { minFactory, maxFactory } from 'src/properties/array';

import { Schema, IValidationResult, IValidationOptions } from './Schema';
import { defaultMessages } from '../errors/defaultMessages';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';

// TODO: add tests
// TODO: add type validation
// TODO: add docs

class ArraySchema<ArrayType> extends Schema<ArrayType[]> {
  public constructor() {
    super(defaultMessages.array.type);
  }

  public min(min: number, message?: string) {
    this._properties.add(minFactory(min, message));
  }

  public max(max: number, message?: string) {
    this._properties.add(maxFactory(max, message));
  }

  public async validate(
    value: any,
    options?: IValidationOptions,
  ): Promise<IValidationResult> {
    options = {
      ...options,
      path: '',
    };
    return this._validate(value, options);
  }

  public validateSync(
    value: any,
    options?: IValidationOptions,
  ): IValidationResult {
    options = {
      ...options,
      path: '',
    };
    return this._validate(value, options);
  }

  public cast(value: any): ArrayType[] {
    if (!Array.isArray(value)) return value;

    return [...value] as ArrayType[];
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

export const array = <ArrayType>(): ArraySchema<ArrayType> =>
  new ArraySchema<ArrayType>();
