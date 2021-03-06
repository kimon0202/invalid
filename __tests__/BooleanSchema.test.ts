import { boolean } from '../src';

describe('Boolean Schema API', () => {
  it('should cast the given values', () => {
    const schema = boolean();

    const bool = schema.cast(true);
    expect(bool).toBe(true);

    const notTrue = schema.cast(false);
    expect(notTrue).toBe(false);

    const emptyString = schema.cast('');
    expect(emptyString).toBe(false);

    const emptyArray = schema.cast([]);
    expect(emptyArray).toBe(true);

    const emptyObject = schema.cast({});
    expect(emptyObject).toBe(true);

    const zero = schema.cast(0);
    expect(zero).toBe(false);

    const notZero = schema.cast(9481);
    expect(notZero).toBe(true);

    const negative = schema.cast(-89028);
    expect(negative).toBe(true);

    const string = schema.cast('not empty');
    expect(string).toBe(true);

    const array = schema.cast([9, 0.4]);
    expect(array).toBe(true);

    const object = schema.cast({ hello: 'world' });
    expect(object).toBe(true);

    const undef = schema.cast(undefined);
    expect(undef).toBe(false);

    const nil = schema.cast(null);
    expect(nil).toBe(false);
  });

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
