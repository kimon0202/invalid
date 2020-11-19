import { number } from '../src';

describe('Number Schema API', () => {
  describe('Minimum Value', () => {
    const schema = number().min(-45);

    it('should throw an error', async () =>
      expect(schema.parse(-3894)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(84923)).resolves.not.toThrow());
  });

  describe('Maximum Value', () => {
    const schema = number().max(-45);

    it('should throw an error', async () =>
      expect(schema.parse(3894)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(-84923)).resolves.not.toThrow());
  });

  describe('Greater than', () => {
    const schema = number().greater(94.6675);

    it('should throw an error', async () =>
      expect(schema.parse(34.6675)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(97)).resolves.not.toThrow());
  });

  describe('Less than', () => {
    const schema = number().less(94.6675);

    it('should throw an error', async () =>
      expect(schema.parse(134.6675)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(-97)).resolves.not.toThrow());
  });

  describe('Positive', () => {
    const schema = number().positive();

    it('should throw an error', async () =>
      expect(schema.parse(-34.6675)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(97)).resolves.not.toThrow());
  });

  describe('Negative', () => {
    const schema = number().negative();

    it('should throw an error', async () =>
      expect(schema.parse(34.6675)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(-97)).resolves.not.toThrow());
  });

  describe('Integer', () => {
    const schema = number().integer();

    it('should throw an error', async () =>
      expect(schema.parse(-34.6675)).rejects.toThrow());

    it('should not throw an error', async () =>
      expect(schema.parse(97)).resolves.not.toThrow());
  });
});
