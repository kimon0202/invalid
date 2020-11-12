/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line no-shadow
export enum InvalidType {
  string = 'string',
  number = 'number',
  nan = 'nan',
  boolean = 'boolean',
  object = 'object',
  array = 'array',
  date = 'date',

  union = 'union',
  intersection = 'intersection',
  tuple = 'tuple',

  undefined = 'undefined',
  null = 'null',
  any = 'any',
  unknown = 'unknown',

  function = 'function',
  promise = 'promise',

  custom = 'custom',
}

export type Infer<T extends Schema> = T['type'];
export type Union<T extends Schema[]> = Infer<T[number]>;
export type Identity<T> = T;

export type Shape = { [key: string]: Schema };
export type InferShape<S extends Shape> = {
  [i in keyof S]: S[i] extends Shape
    ? {
        [j in keyof S[i]]: S[i][j];
      }
    : Infer<S[i]>;
};

export type Flatten<T extends object> = Identity<{ [key in keyof T]: T[key] }>;

export type OptionalKeys<T extends object> = {
  [k in keyof T]: undefined extends T[k] ? k : never;
}[keyof T];

export type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;
export type BuildObject<T extends object> = {
  [key in OptionalKeys<T>]?: T[key];
} &
  { [key in RequiredKeys<T>]: T[key] };

export abstract class Schema<SchemaType = any> {
  public readonly type: SchemaType = {} as SchemaType;
  public readonly invalidType: InvalidType;

  public constructor(invalidType: InvalidType) {
    this.invalidType = invalidType;
  }

  public optional(): UnionSchema<[Schema<SchemaType>, UndefinedSchema]> {
    return new UnionSchema([this, new UndefinedSchema()]);
  }

  public nullable(): UnionSchema<[Schema<SchemaType>, NullSchema]> {
    return new UnionSchema([this, new NullSchema()]);
  }

  // parse
  // check
}

declare class UnionSchema<UnionType extends Schema[]> extends Schema<
  Union<UnionType>
> {
  public constructor(schemas: UnionType);
}

declare class UndefinedSchema extends Schema<undefined> {
  public constructor();
}

declare class NullSchema extends Schema<null> {
  public constructor();
}
