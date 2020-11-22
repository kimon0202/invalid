import { ISchema } from '../interfaces/ISchema';
import { IProperty } from '../interfaces/IProperty';
import { Schema } from '../types';

export const BaseSchema = <SchemaType>(): Schema<SchemaType> => {
  const schema: ISchema<SchemaType> = {} as ISchema<SchemaType>;
  const properties: IProperty[] = [];

  return {
    check: () => true,
    parse: value => {
      const valid = properties.map(prop => prop(value)).every(val => val);

      if (valid) return value as SchemaType;
      return null;
    },

    schema: () => schema,
    properties: () => properties,

    addProperty: property => properties.push(property),
  };
};
