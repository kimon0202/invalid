import { boolean } from '../src';

describe('Boolean Schema API', () => {
  describe('Validation', () => {
    it('should validate (async)', async () => {
      const schema = boolean().required();

      const [valid, errors] = await schema.validate(true);
      expect(valid).toBe(true);
      expect(errors).toHaveLength(0);

      const [nil, error2] = await schema.validate(null);
      expect(nil).toBe(false);
      expect(error2).not.toHaveLength(0);
    });

    it('should validate (sync)', () => {
      const schema = boolean().required();

      const [valid, errors] = schema.validateSync(true);
      expect(valid).toBe(true);
      expect(errors).toHaveLength(0);

      const [nil, error2] = schema.validateSync(null);
      expect(nil).toBe(false);
      expect(error2).not.toHaveLength(0);
    });
  });
});
