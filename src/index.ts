import { StringSchema } from './schemas/String';
import { NumberSchema } from './schemas/Number';
import { BooleanSchema } from './schemas/Boolean';
import { AnySchema } from './schemas/Any';
import { UndefinedSchema } from './schemas/Undefined';
import { NullSchema } from './schemas/Null';
import { UnknownSchema } from './schemas/Unknown';
import { DateSchema } from './schemas/Date';
import { ObjectSchema } from './schemas/Object';
import { ArraySchema } from './schemas/Array';
import { UnionSchema } from './schemas/Union';
// tuple schema
// map schema
// set schema
// enum schema
// record schema
// intersection schema
import {
  Schema,
  InvalidType,
  Identity,
  Union,
  Infer,
  BuildObject,
  Flatten,
  InferShape,
  OptionalKeys,
  RequiredKeys,
  Shape,
} from './types';

export {
  Schema,
  InvalidType,
  Identity,
  Union,
  Infer,
  BuildObject,
  Flatten,
  InferShape,
  OptionalKeys,
  RequiredKeys,
  Shape,
};

export const string = (): StringSchema => new StringSchema();
export const number = (): NumberSchema => new NumberSchema();
export const boolean = (): BooleanSchema => new BooleanSchema();
export const any = (): AnySchema => new AnySchema();
export const undef = (): UndefinedSchema => new UndefinedSchema();
export const unknown = (): UnknownSchema => new UnknownSchema();
export const nil = (): NullSchema => new NullSchema();
export const date = (): DateSchema => new DateSchema();

export const object = <ShapeType extends Shape>(
  shape: ShapeType,
): ObjectSchema<ShapeType> => new ObjectSchema(shape);

export const array = <ElementSchema extends Schema>(
  elementSchema: ElementSchema,
): ArraySchema<ElementSchema> => new ArraySchema(elementSchema);

export const union = <UnionType extends Schema[]>(
  types: UnionType,
): UnionSchema<UnionType> => new UnionSchema(types);

export { errors } from './functions/errors';
