import { number, parse } from '../src';

describe('String Schema API', () => {
  describe('Minimum value', () => {
    const schema = number().min(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 78)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, -Math.PI)).rejects.toThrow());
  });

  describe('Maximum value', () => {
    const schema = number().max(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 2)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 89.5)).rejects.toThrow());
  });

  describe('Less than', () => {
    const schema = number().lessThan(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 2)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 5)).rejects.toThrow());
  });

  describe('Greater than', () => {
    const schema = number().greaterThan(5);

    it('should not throw an error', async () =>
      expect(parse(schema, 89)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, -4)).rejects.toThrow());
  });

  describe('Positive', () => {
    const schema = number().positive();

    it('should not throw an error', async () =>
      expect(parse(schema, 89)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, -4)).rejects.toThrow());
  });

  describe('Negative', () => {
    const schema = number().negative();

    it('should not throw an error', async () =>
      expect(parse(schema, -89)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, 4)).rejects.toThrow());
  });

  describe('Integer', () => {
    const schema = number().integer();

    it('should not throw an error', async () =>
      expect(parse(schema, 89)).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(parse(schema, -4.56)).rejects.toThrow());
  });
});
