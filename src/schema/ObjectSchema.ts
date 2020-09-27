/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IValidationResult, Schema, IValidationOptions } from './Schema';
import { ValidationError } from '../errors/ValidationError';
import { defaultMessages } from '../errors/defaultMessages';

type IShape<ShapeType extends object> = {
  [key in keyof ShapeType]?: Schema<ShapeType[key]>;
};

// TODO: add path to validation message

class ObjectSchema<ObjectType extends object> extends Schema<ObjectType> {
  private _shape: IShape<ObjectType> = {} as IShape<ObjectType>;

  public constructor(message?: string) {
    super(message || defaultMessages.object.type);
  }

  public shape(shape: IShape<ObjectType>): ObjectSchema<ObjectType> {
    this._shape = shape;
    return this;
  }

  public async validate(
    value: any,
    options: IValidationOptions = { path: '' },
  ): Promise<IValidationResult> {
    options = {
      ...options,
      path: '',
    };
    // TODO: Change to test the properties inside shape variable
    const errors: ValidationError[] = [];

    await Object.keys(this._shape).forEach(async shapeKey => {
      // console.log(`Validating ${shapeKey}...`);
      const schema = this._shape[shapeKey] as Schema<any>;
      const [, schemaErrors] = await schema.validate(value[shapeKey], {
        ...options,
        path: options.path ? `${options.path}.${shapeKey}` : shapeKey,
      });

      if (schemaErrors.length > 0) errors.push(...schemaErrors);
    });

    return [errors.length === 0, errors];
  }

  public validateSync(
    value: any,
    options: IValidationOptions = { path: '' },
  ): IValidationResult {
    options = {
      ...options,
      path: '',
    };
    // TODO: Change to test the properties inside shape variable
    const errors: ValidationError[] = [];

    Object.keys(this._shape).forEach(shapeKey => {
      const schema = this._shape[shapeKey] as Schema<any>;
      const [, schemaErrors] = schema.validateSync(value[shapeKey], {
        ...options,
        path: options.path ? `${options.path}.${shapeKey}` : shapeKey,
      });

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

/**
 * Creates a new object schema object
 * @param message Message to throw when type validation fails
 * @template ObjectType Type of the object to use as schema
 */
export const object = <ObjectType extends object>(
  message?: string,
): ObjectSchema<ObjectType> => new ObjectSchema<ObjectType>(message);
