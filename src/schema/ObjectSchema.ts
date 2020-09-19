/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationResult, Schema } from './Schema';
import { ValidationError } from '../errors/ValidationError';

type IShape<ShapeType extends object> = {
  [key in keyof ShapeType]?: Schema<ShapeType[key]>;
};

// TODO: add path to validation message

class ObjectSchema<ObjectType extends object> extends Schema<ObjectType> {
  private _shape: IShape<ObjectType> = {} as IShape<ObjectType>;

  public constructor() {
    super(`This must be an object`);
  }

  public shape(shape: IShape<ObjectType>): ObjectSchema<ObjectType> {
    this._shape = shape;
    return this;
  }

  public async validate(value: any): Promise<IValidationResult> {
    // TODO: Change to test the properties inside shape variable
    const errors: ValidationError[] = [];

    await Object.keys(this._shape).forEach(async shapeKey => {
      const schema = this._shape[shapeKey] as Schema<any>;
      const [, schemaErrors] = await schema.validate(value[shapeKey]);

      if (schemaErrors.length > 0) errors.push(...schemaErrors);
    });

    return [errors.length === 0, errors];
  }

  /**
   * WIP
   */
  public cast(value: any): ObjectType {
    if (value === null) return null;
    if (value === undefined) return undefined;
    if (typeof value !== 'object') return value as any;

    const casted = {};

    Object.keys(this._shape).forEach(key => {
      casted[key] = (this._shape[key] as Schema<any>).cast(value[key]);
    });

    return casted as ObjectType;
  }
}

export const object = <ObjectType extends object>(): ObjectSchema<ObjectType> =>
  new ObjectSchema<ObjectType>();
