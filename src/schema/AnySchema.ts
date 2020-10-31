import { InvalidTypes } from '../types';
import { Schema } from './Schema';
import { ArraySchema, IArrayTransformable } from './ArraySchema';

export class AnySchema extends Schema<any> implements IArrayTransformable<any> {
  public constructor() {
    super(InvalidTypes.any);
  }

  public array(): ArraySchema<Schema<any>> {
    return new ArraySchema(this);
  }

  public check(): boolean {
    return true;
  }
}

export const any = (): AnySchema => new AnySchema();
