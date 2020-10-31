import { parse, boolean } from '../src';

describe('Boolean Schema API', () => {
  it('should parse a boolean schema', async () => {
    const schema = boolean();

    await expect(parse(schema, true)).resolves.not.toThrow();
    await expect(parse(schema, false)).resolves.not.toThrow();
    await expect(parse(schema, null)).rejects.toThrow();
    await expect(parse(schema, undefined)).rejects.toThrow();
  });
});
