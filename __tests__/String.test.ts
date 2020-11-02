import { string, parse, validate } from '../src';

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

  describe('URL', () => {
    const schema = string().url();

    it('should not throw an error', async () =>
      expect(
        parse(schema, 'https://github.com/kimon0202/invalid'),
      ).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'not an url')).rejects.toThrow());
  });

  describe('Matches', () => {
    const schema = string().matches(/[aA]+b/);

    it('should not throw an error', async () =>
      expect(parse(schema, 'aaAAb')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 'not valid')).rejects.toThrow());
  });

  describe('Validate and get errors', () => {
    const schema = string().min(
      5,
      context => `Custom Message: ${context.property}`,
    );

    it('should return no errors', async () => {
      const [value, errors] = await validate(schema, 'hellooo');

      expect(value).toBe('hellooo');
      expect(errors).toHaveLength(0);
    });

    it('should return an error with a custom message', async () => {
      const [value, errors] = await validate(schema, 'not');

      expect(value).toBeNull();
      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe('Custom Message: ');
    });
  });
});
