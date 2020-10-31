import { parse, string, number } from '../src';
import { defaultMessages } from '../src/defaultMaps';

// TODO: add more strict mode tests

describe('Strict Mode', () => {
  const strSchema = string();
  const numSchema = number();
  const arraySchema = string().array();

  it('should throw an error (not string)', async () =>
    expect(parse(strSchema, 134)).rejects.toThrow(defaultMessages.string.type));

  it('should throw an error (not number)', async () =>
    expect(parse(numSchema, 'hello')).rejects.toThrow(
      defaultMessages.number.type,
    ));

  it('should throw an error (not string element)', async () =>
    expect(
      parse(arraySchema, ['hello', 14, true, { w: 'w' }, ['hi']]),
    ).rejects.toThrow(defaultMessages.array.type(arraySchema.elementType)));
});
