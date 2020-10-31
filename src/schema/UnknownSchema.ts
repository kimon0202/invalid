import { InvalidTypes } from '../types';
import { Schema } from './Schema';
import { ArraySchema, IArrayTransformable } from './ArraySchema';

export class UnknownSchema
  extends Schema<unknown>
  implements IArrayTransformable<unknown> {
  public constructor() {
    super(InvalidTypes.unknown);
  }

  public array(): ArraySchema<Schema<unknown>> {
    return new ArraySchema(this);
  }

  public check(): boolean {
    return true;
  }
}

export const unknown = (): UnknownSchema => new UnknownSchema();
