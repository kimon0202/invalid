export interface ISchema<Type> {
  readonly type: Type;
}

export type ExtractType<Schema extends ISchema<unknown>> = Schema['type'];
