import { any, parse } from '../src';
import { ArraySchema } from '../src/schema/ArraySchema';
import { InvalidTypes } from '../src/types';

describe('Any Schema API', () => {
  const schema = any();

  it('should not throw an error', async () => {
    await expect(parse(schema, { hello: 'world' })).resolves.not.toThrow();
    await expect(parse(schema, -0.65)).resolves.not.toThrow();
    await expect(parse(schema, '-0.65')).resolves.not.toThrow();
    await expect(parse(schema, false)).resolves.not.toThrow();
    await expect(parse(schema, [])).resolves.not.toThrow();
    await expect(parse(schema, {})).resolves.not.toThrow();
    await expect(parse(schema, undefined)).resolves.not.toThrow();
    await expect(parse(schema, null)).resolves.not.toThrow();
  });

  it('should check if value is valid', () => {
    expect(schema.check()).toBe(true);
  });

  it('should create a any[] schema', () => {
    const arr = any().array();

    expect(arr).toBeInstanceOf(ArraySchema);
    expect(arr.elementType).toBe(InvalidTypes.any);
  });
});