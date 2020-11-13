import {
  Schema,
  Shape,
  Flatten,
  BuildObject,
  InferShape,
  Identity,
  InvalidType,
} from '../types';

export class ObjectSchema<ShapeType extends Shape> extends Schema<
  Identity<Flatten<BuildObject<InferShape<ShapeType>>>>
> {
  private readonly _shape: ShapeType;

  public constructor(shape: ShapeType) {
    super(InvalidType.object);
    this._shape = shape;
  }

  public check(value: unknown): boolean {
    return (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(this._shape).every(key =>
        this._shape[key].check((value as any)[key]),
      )
    );
  }
}
