import { string, parse } from '../src';

describe('String Schema API', () => {
  describe('Minimum length', () => {
    const schema = string().min(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 'hello world')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'hi')).rejects.toThrow());
  });

  describe('Maximum length', () => {
    const schema = string().max(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 'hello')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'hello world!')).rejects.toThrow());
  });

  describe('Email', () => {
    const schema = string().email();

    it('should not throw an error', async () =>
      expect(parse(schema, 'hello@world.com')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'hello world!')).rejects.toThrow());
  });

  describe('UUID', () => {
    const schema = string().uuid();

    it('should not throw an error', async () =>
      expect(
        parse(schema, '9399ec47-3a5a-484c-b859-a5a808afdc4f'),
      ).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'not an uuid')).rejects.toThrow());
  });

  describe('Matches', () => {
    const schema = string().matches(/[aA]+b/);

    it('should not throw an error', async () =>
      expect(parse(schema, 'aaAAb')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'not valid')).rejects.toThrow());
  });
});
