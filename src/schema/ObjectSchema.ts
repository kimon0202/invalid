/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationResult, Schema, ISchema } from './Schema';
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

  public get schema(): ISchema<ObjectType> {
    const result = { shape: {} } as ISchema<ObjectType>;

    Object.keys(this._shape).forEach(key => {
      result.shape[key] = (this._shape[key] as Schema<any>).schema.shape;
    });

    return result;
  }

  private _cast(value: any): ObjectType {
    return value as ObjectType;
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

  public async cast(value: any): Promise<ObjectType> {
    return this._cast(value);
  }

  public castSync(value: any): ObjectType {
    return this._cast(value);
  }
}

export const object = <ObjectType extends object>(): ObjectSchema<ObjectType> =>
  new ObjectSchema<ObjectType>();
