/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationResult, Schema } from './Schema';
import { ValidationError } from '../errors/ValidationError';

type IShape<ShapeType extends object> = {
  [key in keyof ShapeType]: Schema<ShapeType[key]>;
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
      console.log(`${shapeKey}: ${JSON.stringify(schemaErrors, null, 2)}`);

      if (schemaErrors.length > 0) errors.push(...schemaErrors);
    });

    return [errors.length === 0, errors];
  }

  public cast(value: any): ObjectType {
    return value as ObjectType;
  }
}

export const object = <ObjectType extends object>(): ObjectSchema<ObjectType> =>
  new ObjectSchema<ObjectType>();
