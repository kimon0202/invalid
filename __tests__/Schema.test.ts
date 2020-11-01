import { any } from '../src';

describe('Schema API', () => {
  it('should validate an any value schema', async () => {
    const schema = any();

    const [valid, errors] = await schema.validate('hello');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [valid2, errors2] = await schema.validate(10.5);
    expect(valid2).toBe(true);
    expect(errors2).toHaveLength(0);

    const [valid3, errors3] = await schema.validate(true);
    expect(valid3).toBe(true);
    expect(errors3).toHaveLength(0);

    const [valid4, errors4] = await schema.validate([]);
    expect(valid4).toBe(true);
    expect(errors4).toHaveLength(0);

    const [valid5, errors5] = await schema.validate({});
    expect(valid5).toBe(true);
    expect(errors5).toHaveLength(0);

    const [valid6, errors6] = await schema.validate(false);
    expect(valid6).toBe(true);
    expect(errors6).toHaveLength(0);

    const [valid7, errors7] = await schema.validate(['h', 9, true, {}]);
    expect(valid7).toBe(true);
    expect(errors7).toHaveLength(0);

    const [valid8, errors8] = await schema.validate({ hello: 'world' });
    expect(valid8).toBe(true);
    expect(errors8).toHaveLength(0);

    const [valid9, errors9] = await schema.validate(new Date());
    expect(valid9).toBe(true);
    expect(errors9).toHaveLength(0);

    const [nil, errors10] = await schema.validate(null);
    expect(nil).toBe(true);
    expect(errors10).toHaveLength(0);

    const [undef, errors11] = await schema.validate(undefined);
    expect(undef).toBe(true);
    expect(errors11).toHaveLength(0);
  });

  it('should validate a required schema', async () => {
    const schema = any().required();

    const [valid, errors] = await schema.validate('hello');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [valid2, errors2] = await schema.validate(10.5);
    expect(valid2).toBe(true);
    expect(errors2).toHaveLength(0);

    const [valid3, errors3] = await schema.validate(true);
    expect(valid3).toBe(true);
    expect(errors3).toHaveLength(0);

    const [valid4, errors4] = await schema.validate([]);
    expect(valid4).toBe(true);
    expect(errors4).toHaveLength(0);

    const [valid5, errors5] = await schema.validate({});
    expect(valid5).toBe(true);
    expect(errors5).toHaveLength(0);

    const [valid6, errors6] = await schema.validate(false);
    expect(valid6).toBe(true);
    expect(errors6).toHaveLength(0);

    const [valid7, errors7] = await schema.validate(['h', 9, true, {}]);
    expect(valid7).toBe(true);
    expect(errors7).toHaveLength(0);

    const [valid8, errors8] = await schema.validate({ hello: 'world' });
    expect(valid8).toBe(true);
    expect(errors8).toHaveLength(0);

    const [valid9, errors9] = await schema.validate(new Date());
    expect(valid9).toBe(true);
    expect(errors9).toHaveLength(0);

    const [nil, errors10] = await schema.validate(null);
    expect(nil).toBe(false);
    expect(errors10).toHaveLength(1);

    const [undef, errors11] = await schema.validate(undefined);
    expect(undef).toBe(false);
    expect(errors11).toHaveLength(1);
  });

  it('should validate a not required schema (allowNull = false)', async () => {
    const schema = any().notRequired(false);

    const [valid, errors] = await schema.validate('hello');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [valid2, errors2] = await schema.validate(10.5);
    expect(valid2).toBe(true);
    expect(errors2).toHaveLength(0);

    const [valid3, errors3] = await schema.validate(true);
    expect(valid3).toBe(true);
    expect(errors3).toHaveLength(0);

    const [valid4, errors4] = await schema.validate([]);
    expect(valid4).toBe(true);
    expect(errors4).toHaveLength(0);

    const [valid5, errors5] = await schema.validate({});
    expect(valid5).toBe(true);
    expect(errors5).toHaveLength(0);

    const [valid6, errors6] = await schema.validate(false);
    expect(valid6).toBe(true);
    expect(errors6).toHaveLength(0);

    const [valid7, errors7] = await schema.validate(['h', 9, true, {}]);
    expect(valid7).toBe(true);
    expect(errors7).toHaveLength(0);

    const [valid8, errors8] = await schema.validate({ hello: 'world' });
    expect(valid8).toBe(true);
    expect(errors8).toHaveLength(0);

    const [valid9, errors9] = await schema.validate(new Date());
    expect(valid9).toBe(true);
    expect(errors9).toHaveLength(0);

    const [nil, errors10] = await schema.validate(null);
    expect(nil).toBe(false);
    expect(errors10).toHaveLength(1);

    const [undef, errors11] = await schema.validate(undefined);
    expect(undef).toBe(true);
    expect(errors11).toHaveLength(0);
  });

  it('should validate a not required schema (allowNull = true)', async () => {
    const schema = any().notRequired(true);

    const [valid, errors] = await schema.validate('hello');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [valid2, errors2] = await schema.validate(10.5);
    expect(valid2).toBe(true);
    expect(errors2).toHaveLength(0);

    const [valid3, errors3] = await schema.validate(true);
    expect(valid3).toBe(true);
    expect(errors3).toHaveLength(0);

    const [valid4, errors4] = await schema.validate([]);
    expect(valid4).toBe(true);
    expect(errors4).toHaveLength(0);

    const [valid5, errors5] = await schema.validate({});
    expect(valid5).toBe(true);
    expect(errors5).toHaveLength(0);

    const [valid6, errors6] = await schema.validate(false);
    expect(valid6).toBe(true);
    expect(errors6).toHaveLength(0);

    const [valid7, errors7] = await schema.validate(['h', 9, true, {}]);
    expect(valid7).toBe(true);
    expect(errors7).toHaveLength(0);

    const [valid8, errors8] = await schema.validate({ hello: 'world' });
    expect(valid8).toBe(true);
    expect(errors8).toHaveLength(0);

    const [valid9, errors9] = await schema.validate(new Date());
    expect(valid9).toBe(true);
    expect(errors9).toHaveLength(0);

    const [nil, errors10] = await schema.validate(null);
    expect(nil).toBe(true);
    expect(errors10).toHaveLength(0);

    const [undef, errors11] = await schema.validate(undefined);
    expect(undef).toBe(true);
    expect(errors11).toHaveLength(0);
  });

  it('should use a function as message', async () => {
    const schema = any().notRequired(
      false,
      context => `Path: ${context.path} - ${JSON.stringify(context.property)}`,
    );
    const [isValid, errors] = await schema.validate(null);

    expect(isValid).toBe(false);
    expect(errors[0].message).toBe('Path:  - {"name":"notRequired"}');
  });
});
