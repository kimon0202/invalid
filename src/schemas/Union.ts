// eslint-disable-next-line import/no-cycle
import { Schema, Union, InvalidType } from '../types';

export class UnionSchema<Type extends Schema[]> extends Schema<Union<Type>> {
  private readonly _schemas: Type;

  public constructor(types: Type) {
    super(InvalidType.union);
    this._schemas = types;
  }

  public check(value: unknown): boolean {
    return this._schemas.some(schema => schema.check(value));
  }
}
