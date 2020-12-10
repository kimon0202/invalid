import { string } from '../src';
import { InvalidType, ErrorType } from '../src/types';
import { errorMap } from '../src/errors/errorMap';

describe('String Schema', () => {
  describe('Type', () => {
    const s = string();

    it('should have the correct InvalidJS type', () =>
      expect(s.$invalidType).toBe(InvalidType.String));
  });

  describe('Length', () => {
    it('should return an error if length is less than the specified length', async () => {
      const schema = string().min(5);
      const [errors] = await schema.validate('not');

      expect(errors).toHaveLength(1);
      expect(errors[0].asJSON()).toStrictEqual({
        type: ErrorType.Validation,
        message: errorMap.string.min(5),
        path: '',
      });
    });

    it('should not return an error if length is gretaer or equal than the specified length', async () => {
      const schema = string().min(5);
      const [errors, result] = await schema.validate('this is valid');

      expect(errors).toHaveLength(0);
      expect(result).toBe('this is valid');
    });

    it('should return an error if length is greater than the specified length', async () => {
      const schema = string().max(5);
      const [errors] = await schema.validate('not valid');

      expect(errors).toHaveLength(1);
      expect(errors[0].asJSON()).toStrictEqual({
        type: ErrorType.Validation,
        message: errorMap.string.max(5),
        path: '',
      });
    });

    it('should not return an error if length is less or equal than the specified length', async () => {
      const schema = string().max(5);
      const [errors, result] = await schema.validate('there');

      expect(errors).toHaveLength(0);
      expect(result).toBe('there');
    });
  });
});
