/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IProperty } from '../properties/IProperty';
import { ValidationError } from '../errors/ValidationError';
import { requiredFactory } from '../properties/mixed/required';

// export interface IValidationOptions {
//   abortEarly?: boolean;
//   castResult?: boolean;
// }

// TODO: add tests for ISchema creation

export type IValidationResult = [boolean, ValidationError[]];

// TODO: add self validation
// TODO: add property transofrms
// TODO: add validateSync method

/**
 * Base Schema type
 * @template SchemaType The type of the schema
 */
export abstract class Schema<SchemaType> {
  protected readonly _schemaType: SchemaType;
  protected readonly _message: string;

  // protected _transforms: ITransform[];
  protected _properties: Set<IProperty>;

  /**
   * Creates a new Schema of the given SchemaType
   * @param message The message to throw when type validation fails
   */
  public constructor(message: string) {
    this._properties = new Set();
    this._message = message;
  }

  /**
   * Marks the schema as required (null and undefined values fail)
   * @param message Message to throw when required validation fails
   */
  public required(message?: string): this {
    this._properties.add(requiredFactory(message));
    return this;
  }

  /**
   * Validates asynchronously a value using this schema
   * @param value Value to validate with this schema
   */
  public abstract async validate(value: any): Promise<IValidationResult>;

  /**
   * Validates synchronously a value using this schema
   * @param value Value to validate with this schema
   */
  public abstract validateSync(value: any): IValidationResult;

  /**
   * Casts synchronously a value to this schema SchemaType
   * @param value Value to be casted
   */
  public abstract cast(value: any): SchemaType;

  //   public abstract validateSync(
  //     value: any,
  //     options?: IValidationOptions,
  //   ): ITestResult;
}
