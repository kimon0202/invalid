import { any } from '../src';
import { InvalidType } from '../src/types';

describe('Schema', () => {
  describe('Validation', () => {
    const s = any();

    it('should not return any errors if a string is passed', async () => {
      const [errors] = await s.validate('hello');

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if a number is passed', async () => {
      const [errors] = await s.validate(-2.8);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if a boolean is passed', async () => {
      const [errors] = await s.validate(true);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if an object is passed', async () => {
      const [errors] = await s.validate({ message: 'hello world' });

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if an array is passed', async () => {
      const [errors] = await s.validate([2, 3, 4, { hello: 'world' }]);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if null is passed', async () => {
      const [errors] = await s.validate(null);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if undefined is passed', async () => {
      const [errors] = await s.validate(undefined);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if a function is passed', async () => {
      const [errors] = await s.validate(() => true);

      expect(errors).toHaveLength(0);
    });

    it('should not return any errors if a promise is passed', async () => {
      const [errors] = await s.validate(async () => ({}));

      expect(errors).toHaveLength(0);
    });
  });
  describe('Type', () => {
    const s = any();

    it('should have the correct InvalidJS type', () =>
      expect(s.$invalidType).toBe(InvalidType.Any));
  });
});
