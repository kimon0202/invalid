import { IProperty } from './interfaces/IProperty';
import { ISchema } from './interfaces/ISchema';

// eslint-disable-next-line no-shadow
export enum InvalidType {
  string = 'string',
  number = 'number',
  nan = 'nan',
  boolean = 'boolean',
  object = 'object',
  array = 'array',
  date = 'date',
  bigint = 'bigint',
  symbol = 'symbol',

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

export interface Schema<SchemaType> {
  check(value: unknown): boolean;
  parse(value: unknown): SchemaType | null; // TODO: use somthing else instead of null

  schema(): ISchema<SchemaType>;
  properties(): IProperty[];

  addProperty(property: IProperty): void;
}

// export type Infer<T extends Schema> = T['type'];
// export type Union<T extends Schema[]> = Infer<T[number]>;
// export type Identity<T> = T;

// export type Shape = { [key: string]: Schema };
// export type InferShape<S extends Shape> = {
//   [i in keyof S]: S[i] extends Shape
//     ? {
//         [j in keyof S[i]]: S[i][j];
//       }
//     : Infer<S[i]>;
// };

// export type Flatten<T extends object> = Identity<{ [key in keyof T]: T[key] }>;

// export type OptionalKeys<T extends object> = {
//   [k in keyof T]: undefined extends T[k] ? k : never;
// }[keyof T];

// export type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>;
// export type BuildObject<T extends object> = {
//   [key in OptionalKeys<T>]?: T[key];
// } &
//   { [key in RequiredKeys<T>]: T[key] };
