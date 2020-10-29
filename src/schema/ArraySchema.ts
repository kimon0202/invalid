import { Schema, Infer } from './Schema';
import { minFactory, maxFactory, lengthFactory } from '../properties/array';
import { InvalidTypes } from '../types';

// TODO: add tests
// TODO: add type validation
// TODO: add docs

export interface IArrayTransformable<Type> {
  array(): ArraySchema<Schema<Type>>;
}

/**
 * Array Schema
 * @template ArrayType Type of the schema array
 */
export class ArraySchema<ArrayType extends Schema> extends Schema<
  Infer<ArrayType>[]
> {
  private readonly elementSchema: ArrayType;

  /**
   * Creates a new Array Schema
   */
  public constructor(element: ArrayType) {
    super(InvalidTypes.array);
    this.elementSchema = element;
  }

  public check(value: unknown): boolean {
    return (
      Array.isArray(value) &&
      value.every(item => this.elementSchema.check(item))
    );
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

  public get elementType(): string {
    return this.elementSchema.type;
  }
}

/**
 * Creates a array schema object
 * @template ArrayType The array's schema type
 */
export const array = <ArrayType extends Schema>(
  element: ArrayType,
): ArraySchema<ArrayType> => new ArraySchema<ArrayType>(element);
