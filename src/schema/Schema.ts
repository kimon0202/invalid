/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IProperty } from '../types';
import { requiredFactory, notRequiredFactory } from '../properties/mixed';

/**
 * Base Schema type
 * @template SchemaType The type of the schema
 */
export abstract class Schema<SchemaType> {
  protected readonly _typeMessage: string;
  protected readonly _type: SchemaType; // remove later

  protected readonly _properties: Set<IProperty>;

  /**
   * Creates a new Schema of the given SchemaType
   * @param message The message to throw when type validation fails
   */
  public constructor(message: string) {
    this._properties = new Set();
    this._typeMessage = message;
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
   * Gets all properties a schema has
   */
  public get properties(): Set<IProperty> {
    return this._properties;
  }
}
