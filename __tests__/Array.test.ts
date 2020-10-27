import { array, parse } from '../src';

describe('Array Schema API', () => {
  describe('Minimum Length', () => {
    const schema = array<string>().min(5);

    it('should throw an error', async () =>
      expect(parse(schema, ['hello', 'world'])).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(
        parse(schema, ['hello', 'world', '1', '1', '1']),
      ).resolves.not.toThrow());
  });
});
