import { array, number, parse, string } from '../src';

describe('Array Schema API', () => {
  describe('Minimum Length', () => {
    const schema = array(string()).min(5);

    it('should throw an error', async () =>
      expect(parse(schema, ['hello', 'world'])).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(
        parse(schema, ['hello', 'world', '1', '1', '1']),
      ).resolves.not.toThrow());
  });

  describe('Maximum Length', () => {
    const schema = string().array().max(5);

    it('should throw an error', async () =>
      expect(
        parse(schema, ['hello', 'world', '1', '1', '1', '333']),
      ).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(parse(schema, ['hello', 'world'])).resolves.not.toThrow());
  });

  describe('Length', () => {
    const schema = number().array().length(2);

    it('should throw an error', async () =>
      expect(parse(schema, [0, 1, 2, 3, 4, 5])).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(parse(schema, [0, 1])).resolves.not.toThrow());
  });
});
