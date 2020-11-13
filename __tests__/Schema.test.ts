import { string } from '../src';

describe('Schema API', () => {
  describe('Optional', () => {
    const schema = string().optional();

    it('should throw an error', async () =>
      expect(schema.parse(null)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse('string')).resolves.not.toThrow());

    it('should not throw an error (undefined)', async () =>
      expect(schema.parse(undefined)).resolves.not.toThrow());
  });

  describe('Nullable', () => {
    const schema = string().nullable();

    it('should throw an error', async () =>
      expect(schema.parse(undefined)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse('string')).resolves.not.toThrow());

    it('should not throw an error (null)', async () =>
      expect(schema.parse(null)).resolves.not.toThrow());
  });
});
