/* eslint-disable no-shadow */
export enum InvalidType {
  String = 'string',
  Number = 'number',
  NaN = 'nan',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
  Date = 'date',
  BigInt = 'bigint',
  Symbol = 'symbol',

  Union = 'union',
  Intersection = 'intersection',
  Tuple = 'tuple',

  Undefined = 'undefined',
  Null = 'null',
  Any = 'any',
  Unknown = 'unknown',

  Function = 'function',
  Promise = 'promise',

  Custom = 'custom',
}

export enum ErrorType {
  Validation = 'ValidationError',
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
