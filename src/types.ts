/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/first */
/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */
import { ValidationError } from './errors/ValidationError';

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

export type TestFunction = (value: unknown) => ValidationError | null;

export type InvalidMessage = string | (() => string);

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

  protected readonly _properties: Map<string, TestFunction>;

  public constructor(invalidType: InvalidType) {
    this.invalidType = invalidType;
    this._properties = new Map();
  }

  public optional(): UnionSchema<[Schema<SchemaType>, UndefinedSchema]> {
    return new UnionSchema([this, new UndefinedSchema()]);
  }

  public nullable(): UnionSchema<[Schema<SchemaType>, NullSchema]> {
    return new UnionSchema([this, new NullSchema()]);
  }

  public get properties(): TestFunction[] {
    return [...this._properties.values()];
  }

  // parse
  public async parse(value: unknown): Promise<SchemaType> {
    const errors: ValidationError[] = [];

    // change errors message
    if (!this.check(value)) {
      errors.push(new ValidationError('Incorrect type'));
    }

    this.properties.forEach(prop => {
      const error = prop(value);

      if (error) errors.push(error);
    });

    // change this to better error throwing

    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    return value as SchemaType;
  }

  // check
  public abstract check(value: unknown): boolean;
}

import { NullSchema } from './schemas/Null';
import { UndefinedSchema } from './schemas/Undefined';
import { UnionSchema } from './schemas/Union';
