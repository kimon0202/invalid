/* eslint-disable @typescript-eslint/ban-types */
import { Schema } from './Schema';
import { InvalidTypes } from '../types';

type IShape<ShapeType extends object> = {
  [key in keyof ShapeType]?: Schema<ShapeType[key]>;
};

// TODO: add path to validation message

export class ObjectSchema<ObjectType extends object> extends Schema<
  ObjectType
> {
  private _shape: IShape<ObjectType> = {} as IShape<ObjectType>;

  public constructor() {
    super(InvalidTypes.object);
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

  // public async validate(
  //   value: any,
  //   options: IValidationOptions = { path: '' },
  // ): Promise<ObjectType> {
  //   options = {
  //     ...options,
  //     path: '',
  //   };
  //   // TODO: Change to test the properties inside shape variable
  //   const errors: ValidationError[] = [];

  //   await Object.keys(this._shape).forEach(async shapeKey => {
  //     // console.log(`Validating ${shapeKey}...`);
  //     const schema = this._shape[shapeKey] as Schema<any>;
  //     const [, schemaErrors] = await schema.validate(value[shapeKey], {
  //       ...options,
  //       path: options.path ? `${options.path}.${shapeKey}` : shapeKey,
  //     });

  //     if (schemaErrors.length > 0) errors.push(...schemaErrors);
  //   });

  //   return [errors.length === 0, errors];
  // }
}

/**
 * Creates a new object schema object
 * @param message Message to throw when type validation fails
 * @template ObjectType Type of the object to use as schema
 */
export const object = <ObjectType extends object>(
  shape: IShape<ObjectType>,
): ObjectSchema<ObjectType> => new ObjectSchema<ObjectType>().setShape(shape);
