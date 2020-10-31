import { InvalidTypes } from '../types';
import { Schema } from './Schema';
import { IArrayTransformable, ArraySchema } from './ArraySchema';

class BooleanSchema
  extends Schema<boolean>
  implements IArrayTransformable<boolean> {
  public constructor() {
    super(InvalidTypes.boolean);
  }

  public array(): ArraySchema<Schema<boolean>> {
    return new ArraySchema(this);
  }

  public check(value: unknown): boolean {
    return typeof value === 'boolean';
  }
}

export const boolean = (): BooleanSchema => new BooleanSchema();
