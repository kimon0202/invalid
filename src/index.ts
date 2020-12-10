/* eslint-disable max-classes-per-file */
import { InvalidError } from './errors/ValidationError';
import { InvalidType } from './types';
import { errorMap } from './errors/errorMap';

type Either<Left, Right> = Left | Right;
type TestFunction = (value: unknown) => Either<InvalidError, boolean>;

type Infer<T extends Schema<unknown>> = T['$$'];
type Result<Type extends Schema<unknown>> = [
  InvalidError[],
  Either<Infer<Type>, undefined>,
];

export class Schema<Type> {
  public readonly $$: Type = {} as Type;
  public readonly $invalidType: InvalidType;

  protected readonly _properties: Set<TestFunction>;

  public constructor(type: InvalidType = InvalidType.Any) {
    this.$invalidType = type;
    this._properties = new Set<TestFunction>();
  }

  public async validate(value: unknown): Promise<Result<this>> {
    return [[], value as Type];
  }

  protected get properties(): TestFunction[] {
    return [...this._properties];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySchema = Schema<any>;
export const any = (): AnySchema => new Schema();

export class StringSchema extends Schema<string> {
  public constructor() {
    super(InvalidType.String);
  }

  public min(min: number): this {
    this._properties.add(value => {
      if (String(value).length >= min) return true;
      return InvalidError.validationError(errorMap.string.min(min));
    });
    return this;
  }

  public max(max: number): this {
    this._properties.add(value => {
      if (String(value).length <= max) return true;
      return InvalidError.validationError(errorMap.string.max(max));
    });
    return this;
  }

  public async validate(value: unknown): Promise<Result<this>> {
    const results = this.properties.map(testFunc => testFunc(value));
    const errors = results.filter(
      res => res instanceof InvalidError,
    ) as InvalidError[];

    return [errors, errors.length > 0 ? undefined : (value as string)];
  }
}

export const string = (): StringSchema => new StringSchema();
