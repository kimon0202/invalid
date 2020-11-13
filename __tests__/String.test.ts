import { string } from '../src';
import { messages } from '../src/defaultMaps';

describe('String Schema API', () => {
  describe('Minimum Length', () => {
    const schema = string().min(3);

    it('should not throw an error', async () =>
      expect(schema.parse('helllo')).resolves.not.toThrow());

    it('should not throw an error (exact length)', async () =>
      expect(schema.parse('hhh')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('h')).rejects.toThrow(messages.string.min(3)));

    it('should throw an error with custom message', async () =>
      expect(string().min(3, '3 please!').parse('f')).rejects.toThrow(
        '3 please!',
      ));
  });

  describe('Maximum Length', () => {
    const schema = string().max(3);

    it('should not throw an error', async () =>
      expect(schema.parse('h')).resolves.not.toThrow());

    it('should not throw an error (exact length)', async () =>
      expect(schema.parse('hhh')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('heyaaa')).rejects.toThrow(messages.string.min(3)));

    it('should throw an error with custom message', async () =>
      expect(string().max(3, '3 please!').parse('fffff')).rejects.toThrow(
        '3 please!',
      ));
  });

  describe('Regex', () => {
    const schema = string().regex(/[a-z0-9]/);

    it('should not throw an error', async () =>
      expect(schema.parse('h0')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('HYT')).rejects.toThrow(
        messages.string.regex(/[a-z0-9]/),
      ));
  });

  describe('Email', () => {
    const schema = string().email();

    it('should not throw an error', async () =>
      expect(schema.parse('example@email.com')).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('HYT')).rejects.toThrow(messages.string.email));
  });

  describe('UUID', () => {
    const schema = string().uuid();

    it('should not throw an error', async () =>
      expect(
        schema.parse('9399ec47-3a5a-484c-b859-a5a808afdc4f'),
      ).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('HYT')).rejects.toThrow(messages.string.uuid));
  });

  describe('URL', () => {
    const schema = string().url();

    it('should not throw an error', async () =>
      expect(
        schema.parse('https://github.com/kimon0202/invalid'),
      ).resolves.not.toThrow());

    it('should throw an error', async () =>
      expect(schema.parse('HYT')).rejects.toThrow(messages.string.url));
  });
});
