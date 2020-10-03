/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IProperty } from '../properties/IProperty';
import { ValidationError } from '../errors/ValidationError';
import { requiredFactory, notRequiredFactory } from '../properties/mixed';

export type IValidationResult = [boolean, ValidationError[]];

// TODO: add validation options
// TODO: add errors paths (validateContext)

export interface IValidationOptions {
  path?: string;
}

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
   * Marks a schema as not required
   * @param allowNull Allows the value to be null
   * @param message Message to throw if not required validation fails (this validation can only fail if allowNull is true)
   */
  public notRequired(allowNull: boolean, message?: string): this {
    this._properties.add(notRequiredFactory(allowNull, message));
    return this;
  }

  /**
   * Validates asynchronously a value using this schema
   * @param value Value to validate with this schema
   */
  public abstract async validate(
    value: any,
    options?: IValidationOptions,
  ): Promise<IValidationResult>;

  /**
   * Validates synchronously a value using this schema
   * @param value Value to validate with this schema
   */
  public abstract validateSync(
    value: any,
    options?: IValidationOptions,
  ): IValidationResult;

  /**
   * Casts synchronously a value to this schema SchemaType
   * @param value Value to be casted
   */
  public abstract cast(value: any): any;
}
