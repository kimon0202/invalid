import { parse, boolean } from '../src';
import { ArraySchema } from '../src/schema/ArraySchema';
import { InvalidTypes } from '../src/types';

describe('Boolean Schema API', () => {
  it('should parse a boolean schema', async () => {
    const schema = boolean();

    await expect(parse(schema, true)).resolves.not.toThrow();
    await expect(parse(schema, false)).resolves.not.toThrow();
    await expect(parse(schema, null)).rejects.toThrow();
    await expect(parse(schema, undefined)).rejects.toThrow();
  });

  it('should check if value is valid', () => {
    const schema = boolean();

    expect(schema.check(true)).toBe(true);
    expect(schema.check(false)).toBe(true);
    expect(schema.check('string')).toBe(false);
    expect(schema.check(95839)).toBe(false);
    expect(schema.check([])).toBe(false);
    expect(schema.check({ is: 'object' })).toBe(false);
  });

  it('should create a boolean[] schema', () => {
    const arr = boolean().array();

    expect(arr).toBeInstanceOf(ArraySchema);
    expect(arr.elementType).toBe(InvalidTypes.boolean);
  });
});
