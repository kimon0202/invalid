/* eslint-disable @typescript-eslint/ban-types */
import { Schema } from './Schema';
import { InvalidTypes } from '../types';
import { ArraySchema, IArrayTransformable } from './ArraySchema';

type IShape<ShapeType extends object> = {
  [key in keyof ShapeType]: Schema<ShapeType[key]>;
};

export class ObjectSchema<ObjectType extends object>
  extends Schema<ObjectType>
  implements IArrayTransformable<ObjectType> {
  private _shape: IShape<ObjectType> = {} as IShape<ObjectType>;

  public constructor() {
    super(InvalidTypes.object);
  }

  public array(): ArraySchema<Schema<ObjectType>> {
    return new ArraySchema(this);
  }

  public check(value: unknown): boolean {
    const shapeKeys = Object.keys(this._shape);
    return (
      typeof value === 'object' &&
      Object.keys(value).every(key => shapeKeys.indexOf(key) > -1)
    );
  }

  public get shape(): IShape<Object> {
    return this._shape;
  }

  public setShape(shape: IShape<ObjectType>): ObjectSchema<ObjectType> {
    this._shape = shape;
    return this;
  }
}

/**
 * Creates a new object schema object
 * @template ObjectType Type of the object to use as schema
 */
export const object = <ObjectType extends object>(
  shape: IShape<ObjectType>,
): ObjectSchema<ObjectType> => new ObjectSchema<ObjectType>().setShape(shape);
