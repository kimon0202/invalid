import { InvalidTypes } from '../types';
import { Schema, Infer } from './Schema';

type Union<T extends [Schema, Schema, ...Schema[]]> = Infer<T[number]>;

class UnionSchema<
  First extends Schema,
  Second extends Schema,
  T extends Schema[]
> extends Schema<Union<[First, Second, ...T]>> {
  private first: First;
  private second: Second;
  private rest?: T;

  public constructor([first, second, ...rest]: [First, Second, ...T]) {
    super(InvalidTypes.union);

    this.first = first;
    this.second = second;
    this.rest = rest;
  }

  public check(value: unknown): boolean {
    return (
      this.first.check(value) ||
      this.second.check(value) ||
      (this.rest && this.rest.some(schema => schema.check(value)))
    );
  }

  public get type(): string {
    return [
      this.first.type,
      this.second.type,
      ...(this.rest && this.rest.map(schema => schema.type)),
    ].join(' | ');
  }
}

export const union = <
  First extends Schema,
  Second extends Schema,
  T extends Schema[]
>(
  types: [First, Second, ...T],
): UnionSchema<First, Second, T> => new UnionSchema(types);
