import { boolean, number, string, union } from '../src';

describe('Union Schema API', () => {
  it('should create a union schema', async () => {
    const s = union([string(), number(), boolean()]);
    expect(s.type).toBe('string | number | boolean');
  });
});
