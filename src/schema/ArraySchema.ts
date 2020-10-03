import { minFactory, maxFactory, lengthFactory } from '../properties/array';
import { Schema, IValidationResult, IValidationOptions } from './Schema';
import { defaultMessages } from '../errors/defaultMessages';
import { ValidationError } from '../errors/ValidationError';
import { IValidationContext } from '../properties/IProperty';

// TODO: add tests
// TODO: add type validation
// TODO: add docs

/**
 * Array Schema
 * @template ArrayType Type of the schema array
 */
class ArraySchema<ArrayType = any> extends Schema<ArrayType[]> {
  /**
   * Creates a new Array Schema
   */
  public constructor() {
    super(defaultMessages.array.type);
  }

  /**
   * Sets a minimum value for an array
   * @param min Minimum array length
   * @param message Message to throw when min length validation fails
   */
  public min(min: number, message?: string): this {
    this._properties.add(minFactory(min, message));
    return this;
  }

  /**
   * Sets a maximum value for an array
   * @param max Maximum array length
   * @param message Message to throw when max length validation fails
   */
  public max(max: number, message?: string): this {
    this._properties.add(maxFactory(max, message));
    return this;
  }

  /**
   * Sets a exact length for an array
   * @param value Array's length value
   * @param message Message to throw when length validation fails
   */
  public length(value: number, message?: string): this {
    this._properties.add(lengthFactory(value, message));
    return this;
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

  public cast(value: any): ArrayType[] | any[][] {
    if (value && typeof value === 'object')
      return Object.keys(value).map(key => [key, value[key]]);

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

/**
 * Creates a array schema object
 * @template ArrayType The array's schema type
 */
export const array = <ArrayType>(): ArraySchema<ArrayType> =>
  new ArraySchema<ArrayType>();
