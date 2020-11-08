import { Schema, Infer, InvalidType } from '../types';

export class ArraySchema<ElementSchema extends Schema> extends Schema<
  Infer<ElementSchema>[]
> {
  private readonly _elementSchema: ElementSchema;

  public constructor(elementSchema: ElementSchema) {
    super(InvalidType.array);
    this._elementSchema = elementSchema;
  }
}
