import { BaseSchema } from './Schema';
import { Schema } from '../types';

export interface StringSchema {
  definition(): Schema<string>;
  parse(value: unknown): string | null; // TODO: change later to use something else instead of null

  min(minValue: number): StringSchema;
  max(maxValue: number): StringSchema;
  regex?(regex: RegExp): StringSchema;
  email?(): StringSchema;
  uuid?(): StringSchema;
  url?(): StringSchema;
}

export const string = (): StringSchema => {
  const base = BaseSchema<string>();
  const { addProperty } = base;

  return {
    definition: () => base,
    parse: value => base.parse(value),

    min(minValue: number) {
      addProperty(value => (value as string).length >= minValue);
      return this;
    },
    max(maxValue: number) {
      addProperty(value => (value as string).length <= maxValue);
      return this;
    },
  };
};
